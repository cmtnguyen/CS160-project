import { Fragment } from "react";
import { Row, Col, Container, Alert } from "react-bootstrap";
import { useEffect, useState } from "react";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import {
  getAllReservations,
  getPrevReservation,
  checkIntoReservation,
  checkOutReservation,
  cancelReservation,
} from "../../../Services/reservationServices.js";
import styles from "./ViewPage.module.css";

const Reservation = ({ reservation, onCancel, onCheckIn, onCheckOut }) => {
  const [show, setShow] = useState(true);
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
  const justDate =
    weekday[resDate.getDay()] + " " + resDate.toLocaleDateString();
  const justTime =
    militaryToStandardTime(resDate.getHours()) +
    " - " +
    militaryToStandardTime(resDate.getHours() + reservation.time);
  return (
    <div>
      {reservation.isCheckedIn && show && (
        <Alert
          className="mt-2"
          variant="warning"
          onClose={() => setShow(false)}
          dismissible
        >
          Remember to check-out at least 10 minutes before the end of your
          duration!
        </Alert>
      )}
      <p>Reservation Number: {reservation.reservationId}</p>
      <p>Parking Spot: {reservation.parkingSpotId}</p>
      <p>License Plate: {reservation.licensePlate}</p>
      <p>Reservation Date: {justDate}</p>
      <p>Reservation Time: {justTime}</p>
      {reservation.isCheckedOut && (
        <p className="text-center">SUCCESSFULLY CHECKED OUT</p>
      )}
      {reservation.isCheckedIn && !reservation.isCheckedOut && (
        <div className="d-flex justify-content-center">
          <button
            className={styles.checkOutBtn}
            onClick={() => onCheckOut(reservation.reservationId)}
          >
            Check-Out
          </button>
        </div>
      )}
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
  if (time >= 24) {
    time -= 24;
  }
  if (time === 0) {
    return "12:00 AM";
  } else if (time > 0 && time < 12) {
    return time + ":00 AM";
  } else if (time === 12) {
    return time + ":00 PM";
  } else {
    return time - 12 + ":00 PM";
  }
};
const ViewPage = () => {
  const [user] = useAuthState(auth);
  const [reservations, setReservations] = useState();

  useEffect(() => {
    const fetchReservations = async () => {
      const fetchedReservations = await getAllReservations();
      const currentDate = new Date();
      // filtering reservations to exclude those past departure date
      const filteredReservations = (fetchedReservations || []).filter(function (
        reservation
      ) {
        const departureTime = new Date(reservation.reservationDate);
        departureTime.setTime(
          departureTime.getTime() + reservation.time * 60 * 60 * 1000
        ); // adds however many hours they reserved to get departure time
        return departureTime.getTime() > currentDate.getTime();
      });
      setReservations(filteredReservations);
    };
    fetchReservations();
  }, [user]);

  const checkInHandler = async (id) => {
    const newReservations = [...reservations];
    try {
      const prevReservation = await getPrevReservation(id);
      if (prevReservation && prevReservation.isCheckedIn) {
        console.log("spot taken");
        // msg that someone's there, so can't check in until they leave or something
        return;
      } else {
        checkIntoReservation(id);
        newReservations.find(
          (reservation) => reservation.reservationId === id
        ).isCheckedIn = true;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setReservations(newReservations);
  };

  const checkOutHandler = (id) => {
    const newReservations = [...reservations];
    newReservations.find(
      (reservation) => reservation.reservationId === id
    ).isCheckedOut = true;
    try {
      checkOutReservation(id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    // make reservation disappear from frontend with a success msg
    setReservations(newReservations);
  };

  const cancelHandler = (id) => {
    const newList = reservations.filter(
      (reservation) => reservation.reservationId !== id
    );
    //console.log(id);
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
      <div className="d-flex justify-content-center">
        <Link to="/reserve">
          <button className={styles.reserveBtn}>Make a Reservation</button>
        </Link>
      </div>
      {reservations && (
        <Container className={styles.checkAlign}>
          <div>
            {reservations.map((reservation) => (
              <Reservation
                key={reservation.reservationId}
                reservation={reservation}
                onCancel={cancelHandler}
                onCheckIn={checkInHandler}
                onCheckOut={checkOutHandler}
              />
            ))}
          </div>
        </Container>
      )}
    </Fragment>
  );
};
export default ViewPage;
