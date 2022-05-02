import logo from "../Assets/logo.svg";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "./Navbar.module.css";
import { logout, auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const Navibar = () => {
  const [user] = useAuthState(auth);
  return (
    <Navbar expand="lg" className={styles.navColor}>
      <Container fluid>
        <Link to="/" className={styles.navLogo}>
          <img src={logo} className={styles.logo} alt="logo" />
          Car-eservation
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Link to="/reservations" className={styles.navBtn}>
              View Reservations
            </Link>
            <span className={styles.dots}>&bull;</span>
            <Link to="/reserve" className={styles.navBtn}>
              Reserve a Spot
            </Link>
            {user && (
              <p className={styles.navBtn} onClick={logout}>
                Logout
              </p>
            )}
            {!user && (
              <Link to="/login" className={styles.navBtn}>
                Login
              </Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
export default Navibar;
