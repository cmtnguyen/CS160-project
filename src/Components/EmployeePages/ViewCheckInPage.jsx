import { Row, Col, Container } from "react-bootstrap";
import styles from "./ViewCheckInPage.module.css";

const DUMMY_CHECKED_IN = [
  {
    parkingSpotId: "A",
    userId: "urmom",
    reservationId: "fas000",
    licensePlate: "sadfsafas333",
    reservationDate: "1/22/22",
    time: "3:00 - 4:00",
  },
  {
    parkingSpotId: "B",
    userId: "urdad",
    reservationId: "123kk",
    licensePlate: "6969wow",
    reservationDate: "1/22/22",
    time: "3:00 - 4:00",
  },
];

const ViewCheckInPage = () => {
  return (
    <Container>
      <Row>
        <Col className={styles.rowBorder}>
          <h2>Reservation ID</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>Parking Spot</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>User</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>License Plate</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>Reservation Date</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>Reservation Time</h2>
        </Col>
      </Row>
      {DUMMY_CHECKED_IN.map((reservation) => (
        <Row>
          <Col className={styles.rowBorder}>
            <p>{reservation.reservationId}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{reservation.parkingSpotId}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{reservation.userId}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{reservation.licensePlate}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{reservation.reservationDate}</p>
          </Col>
          <Col className={styles.rowBorder}>
            <p>{reservation.time}</p>
          </Col>
        </Row>
      ))}
    </Container>
  );
};
export default ViewCheckInPage;
