import { Button, Paper, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleLogin } from "../../allApis";
import errorToast from "../../Components/globalFunctions/errorToast";
import successToast from "../../Components/globalFunctions/successToast";
import "./Login.scss";

const LoginPage = () => {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await handleLogin(form);

      if (response.token) { 
        successToast("Login success");
        localStorage.setItem('token', response.token)
        navigate("/")
      }else{
        errorToast(response.message || "Login failed")
      }
      

    } catch (error) {
      console.error("API error:", error.response?.data?.message || error.message);
    }
  };


  return (
    <div className="login-container">
      <Paper elevation={3} className="login-card">
        <h2 className="login-title">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="login-form">
          <TextField
            label="Username"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
          />

          <TextField
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
          />

          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </form>
      </Paper>
    </div>
  );
};

export default LoginPage;
