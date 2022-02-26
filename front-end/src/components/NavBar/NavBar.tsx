import React from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../../store/slices/authSlice";
import "./NavBar.css";

function NavBar() {
  const { user } = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Todo</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
            </Nav>
            {user ? (
              <Button variant="danger" onClick={() => dispatch(signOut())}>
                Sign Out
              </Button>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}

export default NavBar;
