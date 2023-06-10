import LoginHeader from "../components/LoginHeader";
import ProjectList from "../components/ProjectList";
import "../styles/header.css";

function LoginPage({ onLogout }) {
  return (
    <>
      <LoginHeader onLogout={onLogout} />
      <ProjectList />
    </>
  );
}

export default LoginPage;
