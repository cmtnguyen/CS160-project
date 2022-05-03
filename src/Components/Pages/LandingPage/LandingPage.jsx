import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, getUser } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import styles from "./LandingPage.module.css";
import { Row, Col, Button, Container } from "react-bootstrap";
import Lot from "../../Assets/Lot.svg";
import Phone from "../../Assets/phone.svg";

const LandingPage = () => {
  const [user, loading] = useAuthState(auth);
  const [isEmployeeWorker, setIsEmployeeWorker] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let cancel = false;

    const fetchEmployeeStatus = async () => {
      const customer = await getUser(user.uid);
      setIsEmployeeWorker(customer.isEmployee);
      if (isEmployeeWorker) {
        navigate("/employee/viewcheckin");
      }
    };
    if (loading) {
      return;
    }
    if (user) {
      if (cancel) return;
      fetchEmployeeStatus();
    }

    return () => {
      cancel = true;
    };
  }, [isEmployeeWorker, loading, navigate, user]);

  return (
    <Fragment>
      <Container fluid className="m-0 p-0">
        <section className={styles.header}>
          <Row className="m-0">
            <Col className="text-center">
              <p className={styles.landingHeader}>
                The parking spot you want —
              </p>
              <p className={styles.landingHeader}>without the wait time</p>
            </Col>
            <Col>
              <img className={styles.landingImg} src={Lot} alt="parking lot" />
            </Col>
          </Row>
        </section>

        <section className={styles.mid}>
          <Row className="m-0">
            <Col className="col-6">
              <img
                className={`${styles.landingImg} ${styles.phoneImg}`}
                src={Phone}
                alt="phone"
              />
            </Col>
            <Col className="text-center">
              <p className={styles.landingSub}>
                Reserve a parking spot today with Car-eservation.
              </p>
              <p className={styles.landingSub}>Easy as 1, 2, 3!</p>
              <Link to="/reserve">
                <Button className={styles.reserve}>
                  Click Here to Get Started
                </Button>
              </Link>
            </Col>
          </Row>
        </section>

        <footer className={styles.footer}>
          <p>Already Reserved a Spot?</p>
          <Link to="/reservations">
            <Button variant="danger" className={styles.cancel}>
              Cancel Reservation
            </Button>
          </Link>
          <Link to="/reservations">
            <Button variant="success" className={styles.checkIn}>
              Check-In
            </Button>
          </Link>
        </footer>
      </Container>
    </Fragment>
  );
};
export default LandingPage;
