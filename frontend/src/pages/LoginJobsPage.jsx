import LoginHeader from "../components/LoginHeader";
import Jobs from "../components/JobsList";
import "../styles/header.css";

function LoginPage({ onLogout }) {
  return (
    <>
      <LoginHeader onLogout={onLogout} />
      <Jobs />
    </>
  );
}

export default LoginPage;
