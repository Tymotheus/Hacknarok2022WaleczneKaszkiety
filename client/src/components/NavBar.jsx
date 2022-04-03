import React from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { getAllLocations } from "../reducers/authSlice";
import logo from "../Logo.PNG";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getAllLocations(1));
  }, []);
  const { locations } = useSelector((state) => state.auth);

  return (
    <Navbar bg="white" variant="light" expand="lg" className="border-bottom">
      <Container fluid>
        <Navbar.Brand href="/locations">
          <img src={logo} style={{height: '50px'}} alt="bla" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/locations">Home</Nav.Link>
            <NavDropdown title="Lokalizacje" id="basic-nav-dropdown">
              {locations.map((location, idx) => (
                <NavDropdown.Item onClick={() => navigate(`/issue/${idx + 1}`)}>
                  {location.name}
                </NavDropdown.Item>
              ))}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
