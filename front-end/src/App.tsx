import "./App.css";
import React, { Fragment } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import TodoTask from "./pages/TodoTask/TodoTask";
import SignIn from "./pages/SignIn/SignIn";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";

import { useSelector } from "react-redux";

function UnAuthApp() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
    </Routes>
  );
}

function AuthApp() {
  return (
    <Routes>
      <Route path="/" element={<TodoTask />} />
    </Routes>
  );
}

function App() {
  const { user } = useSelector((state: any) => state.auth);

  return (
    <div>
      <Fragment>
        <NavBar />
        <div className="App">
          <Container>{!user ? <UnAuthApp /> : <AuthApp />}</Container>
        </div>
      </Fragment>
    </div>
  );
}

export default App;
