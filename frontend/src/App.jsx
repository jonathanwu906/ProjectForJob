import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useCookies } from "react-cookie";
import LoginPage from "./pages/LoginPage";
import Jobs from "./pages/JobsPage";
import LoginJobsPage from "./pages/LoginJobsPage";
import HomePage from "./pages/HomePage";
import UserProfilePage from "./pages/UserProfilePage";
import LoginUserNewSubmissionPage from "./pages/LoginUserNewSubmissionPage";
import HealthCheckPage from "./pages/HealthCheckPage";

function App() {
  const [cookies] = useCookies(["jwt"]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setIsAuthenticated(cookies.jwt ? true : false);
  }, [cookies]);

  return (
    <Routes>
      <Route
        path="/"
        element={isAuthenticated ? <LoginPage /> : <HomePage />}
      />
      <Route path="/healthcheck" element={<HealthCheckPage />} />
      <Route
        path="/jobs"
        element={isAuthenticated ? <LoginJobsPage /> : <Jobs />}
      />
      <Route path="/profile" element={<UserProfilePage />} />
      <Route
        path="/posts/new/submission"
        element={<LoginUserNewSubmissionPage />}
      />
    </Routes>
  );
}

export default App;
