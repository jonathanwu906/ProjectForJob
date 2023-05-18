const express = require("express");
const app = express();
const port = process.env.PORT;
const cors = require("cors");

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
const userRoutes = require("./routes/userRoutes");

app.use("/api/v1.0/user", userRoutes);

app.get("/healthcheck", async (req, res) => {
  return res.send("Healthcheck page");
});

// Start server
app.listen(port, () => {
  console.log(`Stylish app listening on port ${port}`);
});
