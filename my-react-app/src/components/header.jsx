import { Button, Input, Modal } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import "../styles/header.css";

function Header() {
  const [signInOpen, setSignInOpen] = useState(false);
  const [signUpOpen, setSignUpOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emptyFieldError, setEmptyFieldError] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);
  const signInModalRef = useRef(null); // Reference to the sign-in modal
  const signUpModalRef = useRef(null); // Reference to the sign-up modal

  useEffect(() => {
    // Add event listener when the component mounts
    window.addEventListener("click", handleWindowClick);

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener("click", handleWindowClick);
    };
  });

  const handleWindowClick = (event) => {
    if (
      signUpModalRef.current &&
      !signUpModalRef.current.contains(event.target) &&
      !confirmLoading
    ) {
      handleCancel();
    }

    if (
      signInModalRef.current &&
      !signInModalRef.current.contains(event.target) &&
      !confirmLoading
    ) {
      handleCancel();
    }
  };

  const onSearch = (value) => console.log(value);

  const showSignInModal = () => {
    setSignInOpen(true);
  };

  const showSignUpModal = () => {
    setSignUpOpen(true);
  };

  const handleSignInOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      if (!email || !password) {
        setEmptyFieldError(true);
        setConfirmLoading(false);
      } else {
        setSignInOpen(false);
        setConfirmLoading(false);
        handleSignInSubmit(); // Call the submit function here
      }
    }, 5000);
  };

  const handleSignUpOk = () => {
    setConfirmLoading(true);
    setTimeout(() => {
      if (!name || !email || !password || !confirmPassword) {
        setEmptyFieldError(true);
        setConfirmLoading(false);
      } else {
        setSignUpOpen(false);
        setConfirmLoading(false);
        handleSignUpSubmit(); // Call the submit function here
      }
    }, 5000);
  };

  const handleCancel = () => {
    setSignInOpen(false);
    setSignUpOpen(false);
    setPasswordMatchError(false);
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setEmptyFieldError(false); // Clear the empty field error
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setEmptyFieldError(false); // Clear the empty field error
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmptyFieldError(false); // Clear the empty field error
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordMatchError(false); // Reset password match error on password change
    setEmptyFieldError(false); // Clear the empty field error
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setPasswordMatchError(e.target.value !== password); // Check if passwords match
    setEmptyFieldError(false); // Clear the empty field error
  };

  const handleSignInSubmit = () => {
    // Validate if any field is empty
    if (!email || !password) {
      setEmptyFieldError(true);
      return; // Exit the function if there's an empty field
    }

    // Handle sign-in form submission here
    console.log("Email:", email);
    console.log("Password:", password);

    // For now, let's log a success message
    console.log("Form submitted successfully!");
  };

  const handleSignUpSubmit = () => {
    // Validate if any field is empty
    if (!name || !email || !password || !confirmPassword) {
      setEmptyFieldError(true);
      return; // Exit the function if there's an empty field
    }

    // Handle sign-up form submission here
    console.log("Name:", name);
    console.log("Email:", email);
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);

    if (password !== confirmPassword) {
      setPasswordMatchError(true);
    } else {
      // Password and confirm password match
      // Submit the form or perform further actions
      // For now, let's log a success message
      console.log("Form submitted successfully!");
    }
  };

  return (
    <>
      <div className="flex justify-between py-5 px-8">
        <div className="font-sans items-center inline-flex flex-grow">
          <Input
            className="border border-gray-300 h-10 w-56 rounded-md text-gray-600"
            placeholder="Search for projects or jobs"
            prefix={<SearchOutlined />}
            onSearch={onSearch}
          />
          <div className="ml-8 items-center flex text-gray-600 text-base box-border">
            <div>
              <a className="font-normal cursor-pointer hover:text-red-500">
                Projects
              </a>
            </div>
            <div>
              <a className="font-normal ml-8 cursor-pointer hover:text-red-500">
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
              onClick={showSignInModal}
            >
              Sign in
            </div>
          </div>
          <div>
            <Button
              className="header-signup-button bg-red-600 rounded-md text-white text-sm font-semibold px-4 relative cursor-pointer font-sans ml-8 hover:bg-red-500"
              onClick={showSignUpModal}
            >
              <div>Sign up</div>
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Sign In"
        open={signInOpen}
        onOk={handleSignInOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okButtonProps={{
          style: { background: "#ff0000" },
        }}
        ref={signInModalRef}
        footer={null}
        closable={!confirmLoading}
        maskClosable={!confirmLoading}
        className="disable-hover"
      >
        <div>
          <Input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="mb-4"
          />
        </div>
        <div>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="mb-4"
          />
        </div>
        <div className="flex items-center">
          {emptyFieldError && (
            <div style={{ color: "red", marginRight: "8px" }}>
              Please fill in all fields!
            </div>
          )}
          <div style={{ marginLeft: "auto" }}>
            <Button onClick={handleCancel} disabled={confirmLoading}>
              Cancel
            </Button>
          </div>
          <div style={{ marginLeft: "8px" }}>
            <Button
              className="header-signup-button bg-red-600 rounded-md text-white text-sm font-semibold relative cursor-pointer font-sans hover:bg-red-500"
              onClick={handleSignInOk}
              disabled={emptyFieldError || confirmLoading}
              loading={confirmLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
      <Modal
        title="Please sign up:"
        open={signUpOpen}
        onOk={handleSignUpOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        okText="Confirm"
        okButtonProps={{
          style: { background: "#ff0000" },
          disabled: password !== confirmPassword, // Disable the button if passwords don't match
        }}
        ref={signUpModalRef}
        footer={null}
        closable={!confirmLoading} // Disable the close button during confirm process
        maskClosable={!confirmLoading} // Disable clicking elsewhere to close the modal during confirm process
        className="disable-hover"
      >
        <div>
          <Input
            placeholder="Name"
            value={name}
            onChange={handleNameChange}
            className="mb-4"
          />
        </div>
        <div>
          <Input
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="mb-4"
          />
        </div>
        <div>
          <Input.Password
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="mb-4"
          />
        </div>
        <div>
          <Input.Password
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            className="mb-4"
          />
        </div>
        <div className="flex items-center">
          {passwordMatchError && (
            <div style={{ color: "red", marginRight: "8px" }}>
              Password doesn&apos;t match!
            </div>
          )}
          {emptyFieldError && (
            <div style={{ color: "red", marginRight: "8px" }}>
              Please fill in all fields!
            </div>
          )}
          <div style={{ marginLeft: "auto" }}>
            <Button onClick={handleCancel} disabled={confirmLoading}>
              Cancel
            </Button>
          </div>
          <div style={{ marginLeft: "8px" }}>
            <Button
              className="header-signup-button bg-red-600 rounded-md text-white text-sm font-semibold relative cursor-pointer font-sans hover:bg-red-500"
              onClick={handleSignUpOk}
              disabled={
                password !== confirmPassword ||
                emptyFieldError ||
                confirmLoading
              }
              loading={confirmLoading}
            >
              Confirm
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Header;
