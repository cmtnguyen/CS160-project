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

/*
const DUMMY_RESERVATIONS = [
  {
    reservationId: "1a",
    parkingSpotId: "A",
    userId: "Your mom",
    licensePlate: "123EyesO",
    reservationDate: "10-10-1000",
    time: "07:10",
    isCheckedIn: false,
  },
  {
    reservationId: "2b",
    parkingSpotId: "A",
    userId: "Your mom",
    licensePlate: "123EyesO",
    reservationDate: "10-11-1000",
    time: "09:10",
    isCheckedIn: true,
  },
];
*/
const Reservation = ({ reservation, onCancel, onCheckIn }) => {
  return (
    <div>
      <p>Reservation Number: {reservation.reservationId}</p>
      <p>Parking Spot: {reservation.parkingSpotId}</p>
      <p>License Plate: {reservation.licensePlate}</p>
      <p>Reservation Date: {reservation.reservationDate}</p>
      <p>Reservation Time: {reservation.time}</p>
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
  }, []);
  if (reservations === undefined) {
    return null;
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
