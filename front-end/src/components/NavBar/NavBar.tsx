import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { signOut } from "../../store/slices/authSlice";
import "./NavBar.css";

function NavBar() {
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const onSignOut = () => {
    try {
      dispatch(signOut());
      localStorage.removeItem("token");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar expand="lg" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand>Todo</Navbar.Brand>
          <Nav>
            {user ? (
              <Button variant="danger" onClick={onSignOut}>
                Sign Out
              </Button>
            ) : null}
          </Nav>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
