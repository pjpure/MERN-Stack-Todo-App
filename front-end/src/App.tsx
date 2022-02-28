import "./App.css";
import { Fragment, useEffect, useState } from "react";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import TodoTask from "./pages/TodoTask/TodoTask";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import { Container } from "react-bootstrap";
import NavBar from "./components/NavBar/NavBar";
import { validateUser } from "./api/AuthApi";
import { useAppDispatch } from "./store/store";
import { setUser } from "./store/slices/authSlice";
import { User } from "./types";
import Loading from "./components/Loading/Loading";

function App() {
  const dispatch = useAppDispatch();
  const token = localStorage.token;
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (token) {
      validateUser(token)
        .then((res) => {
          const currentUser: User = {
            id: res.data.id,
            username: res.data.username,
            token: token,
          };
          dispatch(setUser(currentUser));
          setIsLoading(false);
          navigate("/task");
        })
        .catch((err) => {
          if (err.response) {
            alert(err.response.data);
          } else {
            alert(err.message);
          }
          localStorage.removeItem("token");
          setIsLoading(false);
          navigate("/signin");
        });
    } else if (!token && location.pathname !== "/signup") {
      setIsLoading(false);
      navigate("/signin");
    } else {
      setIsLoading(false);
    }
  }, [dispatch, navigate, token]);

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
