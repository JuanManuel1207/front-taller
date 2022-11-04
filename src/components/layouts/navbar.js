import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, Outlet } from 'react-router-dom';

function NavMenu() {
  return (
    <>
    <Navbar bg="ligth" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to='/'>Taller API RestFull</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/'>Inicio</Nav.Link>
            <Nav.Link as={Link} to='rooms'>Rooms</Nav.Link>
            <Nav.Link as={Link} to='meets'>Meets</Nav.Link>
            <Nav.Link as={Link} to='acts'>Acts</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <section>
        <Outlet></Outlet>
    </section>
    </>

  );
}

export default NavMenu;