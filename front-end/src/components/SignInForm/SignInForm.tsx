import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import "./SignInForm.css";
import { signInAsync } from "../../store/slices/authSlice";

function SignInForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const { loading, error } = useSelector((state: any) => state.auth);

  return (
    <div className="signin-form">
      <form>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={() => dispatch(signInAsync({ username, password }))}>
          {loading ? "Loading..." : "Submit"}
        </Button>
        {error && <p style={{ color: "red", fontSize: "12px" }}>{error}</p>}
      </form>
    </div>
  );
}

export default SignInForm;
