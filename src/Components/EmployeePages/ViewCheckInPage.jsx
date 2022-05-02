import { Row, Col, Container } from "react-bootstrap";
import styles from "./ViewCheckInPage.module.css";
import { useEffect, useState } from "react";
import { auth, getUser } from "../../firebase";
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
  const [isEmployeeWorker, setIsEmployeeWorker] = useState(false);

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
      if (user) {
        const customer = await getUser(user.uid);
        const employeeOrUser = customer.isEmployee;
        setIsEmployeeWorker(employeeOrUser);
      }

      const checkedInReservations = await getCheckedInReservations();
      setReservations(checkedInReservations);
      processReservations(checkedInReservations);
    };
    fetchReservations();
  }, [user, isEmployeeWorker]);

  return (
    <Container>
      <Row>
        <Col className={styles.rowBorder}>
          <h2 className={styles.title}>Reservation ID</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2 className={styles.title}>Parking Spot</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2 className={styles.title}>Name</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2>License Plate</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2 className={styles.title}>Reservation Date</h2>
        </Col>
        <Col className={styles.rowBorder}>
          <h2 className={styles.title}>Reservation Time</h2>
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
