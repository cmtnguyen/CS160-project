import { Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate, Link } from "react-router-dom";
import {
  getAllReservations,
  checkIntoReservation,
  cancelReservation,
} from "../../../Services/reservationServices.js";
import styles from "./ViewPage.module.css";

const Reservation = ({ reservation, onCancel, onCheckIn }) => {
  // formatting date and time
  const weekday = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const resDate = new Date(reservation.reservationDate);
  const justDate = weekday[resDate.getDay()] + " " + resDate.toLocaleDateString();
  const justTime = militaryToStandardTime(reservation.time) + " - " + militaryToStandardTime(reservation.time + 1);
  return (
    <div>
      <p>Reservation Number: {reservation.reservationId}</p>
      <p>Parking Spot: {reservation.parkingSpotId}</p>
      <p>License Plate: {reservation.licensePlate}</p>
      <p>Reservation Date: {justDate}</p>
      <p>Reservation Time: {justTime}</p>
      {reservation.isCheckedIn && <h3>YOU'RE CHECKED-IN!</h3>}
      {!reservation.isCheckedIn && (
        <Row className={styles.contains}>
          <Col>
            <button
              value={reservation.id}
              className={styles.checkBtn}
              onClick={() => onCheckIn(reservation.reservationId)}
            >
              Check-In
            </button>
          </Col>
          <Col>
            <button
              className={styles.checkBtn}
              onClick={() => onCancel(reservation.reservationId)}
            >
              Cancel
            </button>
          </Col>
        </Row>
      )}
    </div>
  );
};

const militaryToStandardTime = (time) => {
  if (time === 0) {
    return "12:00 AM";
  } else if (time > 0 && time < 13) {
    return time + ":00 AM";
  } else {
    return time - 12 + ":00 PM";
  }
};
const ViewPage = () => {
  const [user, loading] = useAuthState(auth);
  const [reservations, setReservations] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading, navigate]);

  useEffect(() => {
    const fetchReservations = async () => {
      const fetchedReservations = await getAllReservations();
      setReservations(fetchedReservations);
    };
    fetchReservations();
  }, [user]);
  if (reservations === undefined) {
    return (
      <div className="d-flex justify-content-md-center">
        <Link to="/reserve">
          <button className={styles.reserveBtn}>Make a Reservation</button>
        </Link>
      </div>
    );
  }

  const checkInHandler = (id) => {
    const newReservations = [...reservations];
    newReservations.find(
      (reservation) => reservation.reservationId === id
    ).isCheckedIn = true;
    try {
      checkIntoReservation(id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setReservations(newReservations);
  };

  const cancelHandler = (id) => {
    const newList = reservations.filter(
      (reservation) => reservation.reservationId !== id
    );
    console.log(id);
    try {
      cancelReservation(id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setReservations(newList);
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-md-center">
        <Link to="/reserve">
          <button className={styles.reserveBtn}>Make a Reservation</button>
        </Link>
      </div>
      {user && (
        <Container className={styles.checkAlign}>
          <div>
            {reservations.map((reservation) => (
              <Reservation
                key={reservation.reservationId}
                reservation={reservation}
                onCancel={cancelHandler}
                onCheckIn={checkInHandler}
              />
            ))}
          </div>
        </Container>
      )}
    </Fragment>
  );
};
export default ViewPage;
