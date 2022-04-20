import { Row, Col, Container } from "react-bootstrap";
import styles from "./ViewViolationPage.module.css";

const DUMMY_VIOLATIONS = [
  {
    parkingSpotId: "dfasdf4",
    userId: "urmom",
    offenderId: "urdad",
    offenderLicensePlate: "sdfads33",
  },
  {
    parkingSpotId: "dasdf",
    userId: "urdad",
    offenderId: "uraunt",
    offenderLicensePlate: "666gof",
  },
];

const ViewViolationPage = () => {
  return (
    <Container>
      <Row>
        <Col className={styles.rowBorder}>
          <h2>Parking Spot</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>Reporter</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>Violator</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>Violating License Plate</h2>
        </Col>
      </Row>
      {DUMMY_VIOLATIONS.map((violation) => (
        <Row>
          <Col className={styles.rowBorder}>
            <p>{violation.parkingSpotId}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{violation.userId}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{violation.offenderId}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{violation.offenderLicensePlate}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
export default ViewViolationPage;
