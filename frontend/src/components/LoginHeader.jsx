import { useNavigate } from "react-router-dom";
import { Avatar, Input, Menu, Popover } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import Cookies from "js-cookie";
import Logo from "../assets/logo.png";
import "../styles/header.css";
import { useState } from "react";

const items = [
  {
    label: "Profile",
    key: "profile",
  },
  {
    label: "Logout",
    key: "logout",
  },
];

function LoginHeader() {
  const [current, setCurrent] = useState();
  const navigate = useNavigate();
  const onClick = ({ key }) => {
    if (key === "logout") {
      logout();
    } else if (key === "profile") {
      navigate("/profile");
    } 
    else {
      setCurrent(key);
    }
  };

  const logout = () => {
    axios
      .post("http://18.180.45.13:3000/api/logout", {}, { withCredentials: true })
      .then(() => {
        window.location.assign("/");
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  const content = (
    <Menu onClick={onClick} items={items} selectedKeys={[current]} />
  );

  const userName = Cookies.get("userName");

  return (
    <>
      <div className="fixed-header flex justify-between py-2.5 px-8 bg-white">
        <div className="font-sans items-center inline-flex flex-grow">
          <a href="http://18.180.45.13">
            <img src={Logo} alt="ProjectForJob" />
          </a>
          <Input
            className="ml-8 border border-gray-300 h-10 w-56 rounded-md text-gray-600"
            placeholder="Search for projects or jobs"
            prefix={<SearchOutlined />}
          />
          <div className="ml-8 items-center flex text-gray-600 text-base box-border">
            <div>
              <a
                href="http://18.180.45.13"
                className="font-normal cursor-pointer hover:text-red-500"
              >
                Projects
              </a>
            </div>
            <div>
              <a
                href="http://18.180.45.13/jobs"
                className="font-normal ml-8 cursor-pointer hover:text-red-500"
              >
                Jobs
              </a>
            </div>
            <div>
              <a className="font-normal ml-8 cursor-pointer hover:text-red-500">
                About
              </a>
            </div>
          </div>
        </div>

        <div className="items-center flex box-border font-sans">
          <div>
            <a
              href="http://18.180.45.13/posts/new/submission"
              className="font-normal text-base line-height-24 text-gray-600 block ml-8 cursor-pointer hover:text-red-500"
            >
              Submit a project
            </a>
          </div>
          <Popover
            className="ml-8"
            content={content}
            placement="bottomRight"
            trigger="hover"
          >
            <Avatar
              className="cursor-pointer"
              size={40}
              src={<img src={`https://github.com/${userName}.png`} />}
            />
          </Popover>
        </div>
      </div>
    </>
  );
}

export default LoginHeader;
