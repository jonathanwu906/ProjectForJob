import { useState } from "react";
import { Button, Input, Modal } from "antd";
import { SearchOutlined, GithubOutlined } from "@ant-design/icons";
import Logo from "../assets/logo.png";
import "../styles/header.css";

function Header() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const CustomModalTitle = () => (
    <div className="text-center">
      <h3 className="text-xl">Sign Up on ProjectForJob</h3>
    </div>
  );

  const handleGithubSignIn = async () => {
    window.location.href =
      "https://github.com/login/oauth/authorize?client_id=67b1c88e47149ca869f3&redirect_uri=http://localhost:3000/api/redirect";
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="fixed-header flex justify-between py-2.5 px-8 bg-white">
        <div className="font-sans items-center inline-flex flex-grow">
          <a href="http://localhost:4173">
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
                href="http://localhost:4173"
                className="font-normal cursor-pointer hover:text-red-500"
              >
                Projects
              </a>
            </div>
            <div>
              <a
                href="http://localhost:4173/jobs"
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
            <div
              className="font-normal text-base line-height-24 text-gray-600 block ml-8 cursor-pointer hover:text-red-500"
              onClick={showModal}
            >
              Sign in
            </div>
          </div>
          <div>
            <Button
              className="header-signup-button bg-red-600 rounded-md text-white text-sm font-semibold px-4 cursor-pointer font-sans ml-8 hover:bg-red-500"
              onClick={showModal}
            >
              Sign up
            </Button>

            <Modal
              title={<CustomModalTitle />}
              open={isModalVisible} // Changed `open` to `visible`
              onCancel={handleCancel}
              width={400}
              footer={null}
            >
              <div className="flex justify-center">
                <Button
                  icon={<GithubOutlined />}
                  size="large"
                  onClick={handleGithubSignIn}
                  className="flex items-center "
                >
                  Sign in with GitHub
                </Button>
              </div>
            </Modal>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
