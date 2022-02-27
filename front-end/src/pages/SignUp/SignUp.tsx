import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./SignUp.css";
import { signUp } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password2, setPassword2] = useState<string>("");
  const navigate = useNavigate();
  const onSubmit: any = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (password !== password2) {
      alert("Passwords do not match");
    } else if (username.length < 1 || password.length < 1) {
      alert("Username and password must be at least 1 characters long");
    } else {
      signUp(username, password)
        .then((data) => {
          alert("Sign up successful");
          navigate("/signin");
        })
        .catch((error) => {
          alert(error.response.data);
        });
    }
  };
  return (
    <div className="signup-form">
      <Form onSubmit={onSubmit}>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            placeholder="Enter username"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword2">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            name="password2"
            placeholder="Enter Confirm Password"
            value={password2}
            onChange={(e) => setPassword2(e.target.value)}
          />
        </Form.Group>

        <Button style={{ width: "100%" }} type="submit">
          Sign Up
        </Button>
        <br />
        <br />
        <p style={{ textAlign: "center" }}>
          {" "}
          Already a member?{" "}
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/signin")}
          >
            {" "}
            Sign in
          </span>
        </p>
      </Form>
    </div>
  );
}

export default SignUp;
