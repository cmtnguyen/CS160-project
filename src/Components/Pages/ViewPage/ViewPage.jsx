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
import {
  getJustDate,
  getTimeRange,
} from "../../../Services/dateTimeServices.js";
import styles from "./ViewPage.module.css";
import useSWR, { mutate } from "swr";

const Reservation = ({ reservation, onCancel, onCheckIn, onCheckOut }) => {
  const [show, setShow] = useState(true);
  const justDate = getJustDate(reservation);
  const timeRange = getTimeRange(reservation);
  return (
    <div>
      {reservation.isCheckedIn && !reservation.isCheckedOut && show && (
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
      {reservation.invalidCheckIn && !reservation.isCheckedIn && (
        <Alert className="mt-2" variant="danger">
          Sorry! The person before you has not checked out yet. Please try again
          later.
        </Alert>
      )}
      {!reservation.isCheckedOut && (
        <Fragment>
          <p>Reservation ID: {reservation.reservationId}</p>
          <p>Parking Spot: {reservation.parkingSpotId}</p>
          <p>License Plate: {reservation.licensePlate}</p>
          <p>Reservation Date: {justDate}</p>
          <p>Reservation Time: {timeRange}</p>
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
        </Fragment>
      )}
    </div>
  );
};

const ViewPage = () => {
  const [user] = useAuthState(auth);
  const {data: reservations} = useSWR(["getAllReservationsEndpoint"], getAllReservations);

  //update reservations when new user
  useEffect(() => {
    mutate(["getAllReservationsEndpoint"]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  // filtering reservations to exclude those past departure date
  const filteredReservations = (reservation) => {
    const currentDate = new Date();
    const departureTime = new Date(reservation.reservationDate);
    departureTime.setTime(
      departureTime.getTime() + reservation.time * 60 * 60 * 1000
    ); // adds however many hours they reserved to get departure time
    return departureTime.getTime() > currentDate.getTime();
  };

  const checkInHandler = async (id) => {
    const newReservations = [...reservations];

    try {
      const prevReservation = await getPrevReservation(id);
      if (prevReservation && prevReservation.isCheckedIn) {
        newReservations.find(
          (reservation) => reservation.reservationId === id
        ).invalidCheckIn = true;
      } else {
        await checkIntoReservation(id);
        newReservations.find(
          (reservation) => reservation.reservationId === id
        ).isCheckedIn = true;
      }
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    mutate(["getAllReservationsEndpoint"])
  };

  const [showCheckedOut, setShowCheckedOut] = useState(false);
  const checkOutHandler = (id) => {
    const newReservations = [...reservations];
    newReservations.find(
      (reservation) => reservation.reservationId === id
    ).isCheckedOut = true;
    try {
      checkOutReservation(id);
      cancelReservation(id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    setShowCheckedOut(true);
    mutate(["getAllReservationsEndpoint"])
  };

  const cancelHandler = (id) => {
    try {
      cancelReservation(id);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
    mutate(["getAllReservationsEndpoint"])
  };

  return (
    <Fragment>
      <div className="d-flex justify-content-center">
        <Link to="/reserve">
          <button className={styles.reserveBtn}>Make a Reservation</button>
        </Link>
      </div>
      {showCheckedOut && (
        <Alert
          className="mt-2 ms-5 me-5"
          variant="success"
          onClose={() => setShowCheckedOut(false)}
          dismissible
        >
          You have successfully checked-out!
        </Alert>
      )}
      {reservations && (
        <Container className={styles.checkAlign}>
          <div>
            {reservations.filter(filteredReservations).map((reservation) => (
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
