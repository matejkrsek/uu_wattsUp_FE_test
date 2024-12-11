import React, { useEffect, useState } from "react";
import "../App.css";
import LoginForm from "../bricks/LoginForm";
import { useNavigate } from "react-router";

function LoginR() {
  const [loggedUser, setLoggedUser] = useState({
    userId: localStorage.getItem("userId"),
    role: localStorage.getItem("role"),
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser.userId) {
      navigate("/overview");
    }
  }, [loggedUser.userId, navigate]);

  return loggedUser.userId ? (
    <div style={{ marginTop: "100px" }}>
      <LoginForm />
    </div>
  ) : null;
}

export default LoginR;
