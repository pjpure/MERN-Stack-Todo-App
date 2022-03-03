import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import TodoTask from "./pages/TodoTask/TodoTask";
import TodoDone from "./pages/TodoDone/TodoDone";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
//import { validateUser } from "./api/AuthApi";
import { useAppDispatch, useAppSelector } from "./store/store";
import { setUser } from "./store/slices/authSlice";
import { User } from "./types";
import Loading from "./components/Loading/Loading";
import { useValidateUserQuery } from "./services/authApi";

function App() {
  const dispatch = useAppDispatch();
  const token: string = localStorage.token;
  const navigate = useNavigate();

  const location = useLocation();
  const { data: validateUser, isLoading, error } = useValidateUserQuery(token);

  useEffect(() => {
    if (validateUser) {
      dispatch(setUser({ ...validateUser, token }));
      navigate("/task");
    }
  }, [validateUser]);
  //const { data: validateUser, isLoading, error } = useValidateUserQuery(token);

  // useEffect(() => {
  //   if (token) {
  //     validateUser(token).then((res) => {
  //       if (res) {
  //         console.log(res);
  //         //dispatch(setUser(res.data));
  //       } else {
  //         console.log("no data");
  //       }
  //     });
  //   }
  // }, []);
  // useEffect(() => {
  //   if (token) {
  //     validateUser(token)
  //       .then((res) => {
  //         const currentUser: User = {
  //           id: res.data.id,
  //           username: res.data.username,
  //           token: token,
  //         };
  //         dispatch(setUser(currentUser));
  //         setIsLoading(false);
  //         if (location.pathname !== "/done") {
  //           navigate("/task");
  //         }
  //       })
  //       .catch((err) => {
  //         if (err.response) {
  //           alert(err.response.data);
  //         } else {
  //           alert(err.message);
  //         }
  //         localStorage.removeItem("token");
  //         setIsLoading(false);
  //         navigate("/signin");
  //       });
  //   } else if (!token && location.pathname !== "/signup") {
  //     setIsLoading(false);
  //     navigate("/signin");
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [dispatch, navigate, token]);

  return (
    <div className="App">
      <Fragment>
        <NavBar />
        {!isLoading ? (
          <div className="content">
            <Container>
              <Routes>
                <Route path="/signin" element={<SignIn />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/task" element={<TodoTask />} />
                <Route path="/done" element={<TodoDone />} />
              </Routes>
            </Container>
          </div>
        ) : (
          <Loading />
        )}
      </Fragment>
    </div>
  );
}

export default App;
