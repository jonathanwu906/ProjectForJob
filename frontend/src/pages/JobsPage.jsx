import Header from "../components/Header";
import Jobs from "../components/JobsList";
import "../styles/header.css";

function LoginPage({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} />
      <Jobs />
    </>
  );
}

export default LoginPage;
