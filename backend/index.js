const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const s3 = require("./config/s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const crypto = require("crypto");
const sharp = require("sharp");
const { PutObjectCommand, GetObjectCommand } = require("@aws-sdk/client-s3");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { Octokit } = require("octokit");
const bucketName = process.env.BUCKET_NAME;
const SECRET = process.env.SECRET;
const pool = require("./config/db");

dotenv.config({ path: path.join(__dirname, "./.env") });

// Middleware
app.use(
  cors({
    origin: "http://18.180.45.13",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let languageStore = {};

// Routes
app.get("/api/healthcheck", async (req, res) => {
  return res.send("This page is for healthcheck");
});

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post("/api/posts", upload.single("logo"), async (req, res) => {
  const data = req.body;
  const file = req.file;

  const fileBuffer = await sharp(file.buffer)
    .resize({ height: 240, width: 240, fit: "contain" })
    .toBuffer();

  const generateFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  // Configure the upload details to send to S3
  const fileName = generateFileName();
  const uploadParams = {
    Bucket: bucketName,
    Body: fileBuffer,
    Key: fileName,
    ContentType: file.mimetype,
  };

  // Send the upload to S3
  await s3.send(new PutObjectCommand(uploadParams));

  const getObjectCommand = new GetObjectCommand(uploadParams);

  const signedUrl = await getSignedUrl(s3, getObjectCommand);

  const finalImageUrl = signedUrl.split("?")[0];

  const projectData = {
    logoURL: finalImageUrl,
    name: data.name,
    link: data.URL,
    description: data.description,
    keyword: data.keyword,
  };

  await pool
    .promise()
    .query(
      `INSERT INTO project (name, logoURL, link, description, keyword) VALUES (?, ?, ?, ?, ?)`,
      [
        projectData.name,
        projectData.logoURL,
        projectData.link,
        projectData.description,
        projectData.keyword,
      ]
    )
    .then((response) => {
      console.log("Successfully inserted a project");
    })
    .catch((error) => {
      console.log(error);
    });

  // ...
});

app.get("/api/redirect", async (req, res) => {
  const requestToken = req.query.code;

  const accessToken = await axios({
    method: "post",
    url: `https://github.com/login/oauth/access_token?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${requestToken}`,
    headers: {
      accept: "application/json",
    },
  }).then((response) => {
    const accessToken = response.data.access_token;
    return accessToken;
  });

  const token = jwt.sign(
    {
      accessToken: accessToken,
    },
    SECRET,
    { expiresIn: "1 min" }
  );

  const octokit = new Octokit({
    auth: accessToken,
  });

  const userData = await octokit
    .request("GET /user", {
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    })
    .then((response) => {
      return response.data;
    });

  const userName = userData.login;

  const repoData = await octokit.request("GET /repos/{owner}/{repo}", {
    owner: userName,
    repo: "secrets",
    headers: {
      "X-GitHub-Api-Version": "2022-11-28",
    },
  });

  // console.log(repoData);

  res.cookie("jwt", token);
  res.cookie("userName", userName);
  // res.cookie("languages", result);

  res.redirect("http://18.180.45.13:4173");

  const calculateLanguageCounts = async (userName) => {
    const repos = await octokit.request("GET /users/{owner}/repos", {
      owner: userName,
      headers: {
        "X-GitHub-Api-Version": "2022-11-28",
      },
    });

    const repoNames = repos.data.map((repo) => repo.name);

    const repoLanguagesArray = [];

    for (let i = 0; i < repoNames.length; i++) {
      const languages = await octokit.request(
        "GET /repos/{owner}/{repo}/languages",
        {
          owner: userName,
          repo: repoNames[i],
          headers: {
            "X-GitHub-Api-Version": "2022-11-28",
          },
        }
      );

      repoLanguagesArray.push(languages.data);
    }

    let languageCounts = {};

    repoLanguagesArray.forEach((item) => {
      Object.entries(item).forEach(([language, count]) => {
        if (languageCounts.hasOwnProperty(language)) {
          languageCounts[language] += count;
        } else {
          languageCounts[language] = count;
        }
      });
    });

    const sortedCounts = Object.entries(languageCounts).sort(
      (a, b) => b[1] - a[1]
    );

    languageCounts = Object.fromEntries(sortedCounts);

    return languageCounts;
  };

  const languages = await calculateLanguageCounts(userName);

  languageStore[userName] = languages;
});

app.get("/api/languages/:userName", (req, res) => {
  const userName = req.params.userName;
  const languages = languageStore[userName];

  // Write the 推薦 algorithm here
});

app.get("/api/projects", async (req, res) => {
  const [projects, fields] = await pool
    .promise()
    .query(`SELECT * FROM project`);
  return res.send(projects);
});

app.post("/api/logout", async (req, res) => {
  // Clear the JWT token cookie
  res.clearCookie("jwt", { domain: "18.180.45.13", path: "/" });
  res.clearCookie("userName", { domain: "18.180.45.13", path: "/" });
  res.clearCookie("languages", { domain: "18.180.45.13", path: "/" });

  // Send a response indicating successful logout
  return res.send({ message: "Logout successful" });
});

// app.post("userjobs", async (req, res) => {
//   console.log(req);
// });

app.get("/api/userjobs", async (req, res) => {
  const [jobs, fields] = await pool
    .promise()
    .query(`SELECT companyLogo, title, postlink, company, location FROM job`);

  return res.send(jobs);
});

app.get("/api/alljobs", async (req, res) => {
  const [allJobs, fields] = await pool
    .promise()
    .query(`SELECT companyLogo, company, title, location, postlink FROM job`);

  return res.send(allJobs);
});

// Start server
app.listen(process.env.PORT, () => {
  console.log(`ProjectForJob app listening on port ${process.env.PORT}`);
});
