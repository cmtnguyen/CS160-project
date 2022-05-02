import { Row, Col, Container } from "react-bootstrap";
import styles from "./ViewCheckInPage.module.css";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getCheckedInReservations,
  getName,
} from "../../Services/reservationServices.js";
import { getJustDate, getTimeRange } from "../../Services/dateTimeServices.js";

// get user name instead of id, show just date (toLocaleDateString)
const ViewCheckInPage = () => {
  const [user] = useAuthState(auth);
  const [reservations, setReservations] = useState();

  const processReservations = async (unprocessedReservations) => {
    const newReservations = [...unprocessedReservations];
    for (let res in unprocessedReservations) {
      let currentRes = unprocessedReservations[res];
      let name = await getName(currentRes.userId);
      let date = getJustDate(currentRes);
      let time = getTimeRange(currentRes);

      newReservations[res].userId = name;
      newReservations[res].reservationDate = date;
      newReservations[res].time = time;
    }
    setReservations(newReservations);
  };

  useEffect(() => {
    const fetchReservations = async () => {
      const checkedInReservations = await getCheckedInReservations();
      setReservations(checkedInReservations);
      processReservations(checkedInReservations);
    };
    fetchReservations();
  }, [user]);

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
          <h2>Name</h2>
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
      {reservations &&
        reservations.map((reservation) => (
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
