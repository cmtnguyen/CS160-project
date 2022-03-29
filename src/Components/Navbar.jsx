import logo from "./Assets/logo.svg";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "./Navbar.module.css";

const Navibar = () => {
  return (
    <Navbar expand="lg" className={styles.navColor}>
      <Container fluid>
        <Link to="/" className={styles.navLogo}>
          <img src={logo} className={styles.logo} alt="logo" />
          Car-Servation
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <a href="/cancel" className={styles.navBtn}>
              Cancel Reservation
            </a>
            <span className={styles.dots}>&bull;</span>
            <a href="/report" className={styles.navBtn}>
              Report
            </a>
            <span className={styles.dots}>&bull;</span>
            <a href="/checkIn" className={styles.navBtn}>
              Check-In
            </a>
            <a href="/reserve" className={styles.navBtn}>
              Reserve a Spot
            </a>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navibar;
