import "./App.css";
import React, { Fragment, useEffect } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import TodoTask from "./pages/TodoTask/TodoTask";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
import { validateUser } from "./api/AuthApi";

import { useAppSelector, useAppDispatch } from "./store/store";
import { setUser } from "./store/slices/authSlice";

function App() {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const token = localStorage.token;
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (token) {
      validateUser(token)
        .then((res) => {
          dispatch(setUser(res.data));
        })
        .catch((err) => {
          console.log(err.response.data);
          localStorage.removeItem("token");
          navigate("/signin");
        });
    }
  }, [dispatch, navigate, token]);

  useEffect(() => {
    if (!user && location.pathname === "/") {
      navigate("/signin");
    } else if (user) {
      navigate("/");
    }
  }, [user, location.pathname, navigate]);

  return (
    <div className="App">
      <Fragment>
        <NavBar />
        <div className="content">
          <Container>
            <Routes>
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/" element={<TodoTask />} />
            </Routes>
          </Container>
        </div>
      </Fragment>
    </div>
  );
}

export default App;
