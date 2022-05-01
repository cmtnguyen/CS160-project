import { Row, Col, Container } from "react-bootstrap";
import styles from "./ViewCheckInPage.module.css";
import { useEffect, useState } from "react";
import { auth, getUser } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { getCheckedInReservations } from "../../Services/reservationServices.js";

// get user name instead of id, show just date (toLocaleDateString)
const ViewCheckInPage = () => {
  const [user] = useAuthState(auth);
  //const [name, setName] = useState();
  const [reservations, setReservations] = useState();

  useEffect(() => {
    const fetchReservations = async () => {
      const checkedInReservations = await getCheckedInReservations();
      setReservations(checkedInReservations);
    };
    fetchReservations();
  }, [user]);

  // move to reservationServices once working
  const getName = async (userId) => {
    try {
      const resUser = await getUser(userId);
      return resUser.name;
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };
  /*
  useEffect(() => {
    const getName = async (userId) => {
      try {
        const resUser = await getUser(userId);
        setName(resUser.name);
        //return resUser.name;
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    };
  }, [name]);
  */

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
              <p>{getName(reservation.userId)}</p>
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
