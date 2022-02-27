import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import "./SignIn.css";
import { useAppDispatch } from "../../store/store";
import { setUser } from "../../store/slices/authSlice";
import { signIn } from "../../api/AuthApi";
import { useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";

function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onSubmit: any = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsLoading(true);
    signIn(username, password)
      .then((data) => {
        dispatch(setUser(data));
        localStorage.setItem("token", data.token);
        setIsLoading(false);
        navigate("/task");
      })
      .catch((error) => {
        setIsLoading(false);
        alert(error.response.data);
      });
  };

  return (
    <div className="signin-form">
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

        <Button style={{ width: "100%" }} type="submit">
          {isLoading ? (
            <Spinner size="sm" animation="border" variant="light" />
          ) : (
            "Sign In"
          )}
        </Button>
        <br />
        <br />
        <p style={{ textAlign: "center" }}>
          {" "}
          Not a member?{" "}
          <span
            style={{
              cursor: "pointer",
              color: "blue",
              textDecoration: "underline",
            }}
            onClick={() => navigate("/signup")}
          >
            {" "}
            Sign up
          </span>
        </p>
      </Form>
    </div>
  );
}

export default SignIn;
