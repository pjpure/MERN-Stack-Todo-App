import React, { useState } from "react";
import { Button, Navbar, Nav, Container } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../../store/store";
import { signOut } from "../../store/slices/authSlice";
import "./NavBar.css";
import { useNavigate, useLocation } from "react-router-dom";

function NavBar() {
  const { user } = useAppSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const [isOpen, setIsOpen] = useState(false);

  const onSignOut = () => {
    try {
      dispatch(signOut());
      localStorage.removeItem("token");
      navigate("/signin");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar expanded={isOpen} expand="sm" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand className="brand" href="/task">
            TODO
          </Navbar.Brand>
          <Navbar.Toggle onClick={() => setIsOpen(!isOpen)} />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto item">
              <Nav.Link
                onClick={() => {
                  setIsOpen(!isOpen);
                  navigate("/task");
                }}
              >
                Task
              </Nav.Link>
              <Nav.Link
                onClick={() => {
                  setIsOpen(!isOpen);
                  navigate("/done");
                }}
              >
                Done
              </Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <Button
                  className="signout"
                  variant="danger"
                  onClick={onSignOut}
                >
                  Sign Out
                </Button>
              ) : null}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      {/* <Navbar collapseOnSelect expand="sm" bg="primary" variant="dark">
        <Container>
          <Navbar.Brand className="brand" href="/task">
            TODO
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">Features</Nav.Link>
              <Nav.Link href="#">Pricing</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </div>
  );
}

export default NavBar;
