import { Row, Col, Container } from "react-bootstrap";
import styles from "./ViewCheckInPage.module.css";
import { Fragment, useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  getCheckedInReservations,
  getName,
} from "../../Services/reservationServices.js";
import { getJustDate, getTimeRange } from "../../Services/dateTimeServices.js";

// get user name instead of id, show just date (toLocaleDateString)
const ViewCheckInPage = (props) => {
  const [user] = useAuthState(auth);
  const [reservations, setReservations] = useState();
  const [isEmployee, setIsEmployee] = useState(null);

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
      if (props.isAnEmployee) {
        setIsEmployee(props.isAnEmployee);
      }
      const checkedInReservations = await getCheckedInReservations();
      setReservations(checkedInReservations);
      processReservations(checkedInReservations);
    };
    fetchReservations();
  }, [user, isEmployee, props.isAnEmployee]);

  return (
    <Fragment>
      {isEmployee && (
        <Container>
          <Row>
            <Col className={styles.rowBorder}>
              <h2 className={styles.title}>RID</h2>
            </Col>
            <Col className={styles.rowBorder}>
              <h2 className={styles.title}>Spot</h2>
            </Col>
            <Col className={styles.rowBorder}>
              <h2 className={styles.title}>Name</h2>
            </Col>
            <Col className={styles.rowBorder}>
              <h2 className={styles.title}>Plate</h2>
            </Col>
            <Col className={styles.rowBorder}>
              <h2 className={styles.title}>Date</h2>
            </Col>
            <Col className={styles.rowBorder}>
              <h2 className={styles.title}>Time</h2>
            </Col>
          </Row>
          {reservations &&
            reservations.map((reservation) => (
              <Row key={reservation.reservationId}>
                <Col className={styles.rowBorder}>
                  <p className={styles.content}>{reservation.reservationId}</p>
                </Col>
                <Col className={styles.rowBorder}>
                  <p className={styles.content}>{reservation.parkingSpotId}</p>
                </Col>
                <Col className={styles.rowBorder}>
                  <p className={styles.content}>{reservation.userId}</p>
                </Col>
                <Col className={styles.rowBorder}>
                  <p className={styles.content}>{reservation.licensePlate}</p>
                </Col>
                <Col className={styles.rowBorder}>
                  <p className={styles.content}>
                    {reservation.reservationDate}
                  </p>
                </Col>
                <Col className={styles.rowBorder}>
                  <p className={styles.content}>{reservation.time}</p>
                </Col>
              </Row>
            ))}
        </Container>
      )}
    </Fragment>
  );
};
export default ViewCheckInPage;
