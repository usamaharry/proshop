import { Navbar, Nav, Container, Badge } from "react-bootstrap";
import { FaShoppingCart, FaUser } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";

import logo from "../assets/logo.png";
const Header = () => {
  const { cartItems } = useSelector((state) => state.cart);

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img src={logo} alt="proshop-logo" />
              ProShop
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <LinkContainer to="/cart">
                <Nav.Link className="d-flex flex-row justify-content-center align-items-center">
                  {cartItems.length > 0 && (
                    <Badge
                      pill
                      bg="success"
                      style={{
                        position: "relative",
                        bottom: "10px",
                        left: "5px",
                      }}
                    >
                      {cartItems.length}
                    </Badge>
                  )}
                  <FaShoppingCart className="me-1" /> Cart
                </Nav.Link>
              </LinkContainer>

              <LinkContainer to="/login">
                <Nav.Link className="d-flex flex-row justify-content-center align-items-center">
                  <FaUser className="me-1" /> Sign In
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
