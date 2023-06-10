import { Card, Avatar, Typography, List, Button, Image, Tag } from "antd";
import LoginHeader from "../components/LoginHeader";
import axios from "axios";
import Cookies from "js-cookie";
import "../styles/UserProfilePage.css";

const { Title, Paragraph } = Typography;

const jobs = await axios
  .get("http://18.180.45.13:3000/api/userjobs") // Replace this with your actual API endpoint
  .then((response) => {
    return response.data;
  })
  .catch((error) => {
    console.error("Fetch jobs error:", error);
  });

const UserProfilePage = () => {
  const userName = Cookies.get("userName");


  return (
    <>
      <LoginHeader />

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 64px)",
          marginTop: "220px",
        }}
      >
        <Card style={{ width: 500, marginTop: 16 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "24px",
            }}
          >
            <Avatar
              className="cursor-pointer"
              size={100}
              src={<img src={`https://github.com/${userName}.png`} />}
              onClick={() =>
                window.open(`https://github.com/${userName}`, "_blank")
              }
            ></Avatar>
            <Title level={2} style={{ marginLeft: "16px" }}>
              {userName}
            </Title>
          </div>
          <Title level={4}>Most used languages on GitHub:</Title>
          <Paragraph>
            <Tag>JavaScript</Tag>
            <Tag>EJS</Tag>
            <Tag>HTML</Tag>
          </Paragraph>
          <Title level={4}>Recommended jobs for you:</Title>
          <List
            className="custom-list"
            size="small"
            dataSource={jobs.slice(0, 5)}
            renderItem={(job) => (
              <List.Item>
                <Image height={50} width={50} src={job.companyLogo} />
                <List.Item.Meta
                  className="ml-4"
                  title={job.company}
                  description={
                    <>
                      <div>{job.title}</div>
                      <div>{job.location}</div>
                    </>
                  }
                />
                <div>
                  <Button target="_blank" href={job.postlink}>
                    Apply
                  </Button>
                </div>
              </List.Item>
            )}
          />
        </Card>
      </div>
    </>
  );
};

export default UserProfilePage;
