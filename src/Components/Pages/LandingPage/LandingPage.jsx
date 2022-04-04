import { Fragment } from "react";
import Navbar from "../../Navbar";
import styles from "./LandingPage.module.css";
import { Row, Col, Button, Container } from "react-bootstrap";
import Lot from "../../Assets/Lot.svg";
import Phone from "../../Assets/phone.svg";

const LandingPage = () => {
  return (
    <Fragment>
      <Navbar />
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
              <img className={styles.landingImg} src={Phone} alt="phone" />
            </Col>
            <Col className="text-center">
              <p className={styles.landingSub}>
                Reserve a parking spot today with Car-eservation.
              </p>
              <p className={styles.landingSub}>Easy as 1, 2, 3!</p>
              <Button href="/reserve" className={styles.reserve}>
                Click Here to Get Started
              </Button>
            </Col>
          </Row>
        </section>

        <footer className={styles.footer}>
          <p>Already Reserved a Spot?</p>
          <Button href="/cancel" variant="danger" className={styles.cancel}>
            Cancel Reservation
          </Button>
          <Button href="/checkIn" variant="success" className={styles.checkIn}>
            Check-In
          </Button>
        </footer>
      </Container>
    </Fragment>
  );
};
export default LandingPage;
