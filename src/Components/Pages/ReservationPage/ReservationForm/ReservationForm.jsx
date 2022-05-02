import styles from "./ReservationForm.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { auth } from "../../../../firebase.js";
import {
  addToReservationDB,
  getReservationByRangeDate,
} from "../../../../Services/reservationServices.js";

const { nanoid } = require("nanoid");
const ParkingSpot = ({ parkValue, isReserved, onClickHandler }) => {
  return (
    <Col>
      <button
        className={isReserved ? styles.parkingSpot2 : styles.parkingSpot}
        disabled={isReserved ? true : false}
        type="button"
        onClick={onClickHandler}
        value={parkValue}
      >
        {parkValue}
      </button>
    </Col>
  );
};

const ReservationForm = (props) => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), new Date().getHours() + 1)
  );
  const [endDate, setEndDate] = useState(
    setHours(setMinutes(startDate, 0), startDate.getHours() + 1)
  );
  const [reservedDates, setReservedDates] = useState([]);
  const componentRef = useRef("null");
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);
    return currentDate.getTime() < selectedDate.getTime();
  };

  const parkValuesRow1 = ["A", "B", "C", "D", "E", "F", "G", "H"];

  const parkValuesRow2 = ["I", "J", "K", "L", "M", "N", "O", "P"];

  const onClickHandler = (e) => {
    componentRef.current.value = e.target.value;
    setParkingSpot(e.target.value);
  };

  const initValues = {
    license: "",
  };

  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [parkingSpot, setParkingSpot] = useState(null);
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const fetchReservedReservations = async () => {
    const reservedReservations = await getReservationByRangeDate(
      startDate.toISOString().substring(0, 13) + ":00:00.000+00:00",
      endDate.toISOString().substring(0, 13) + ":00:00.000+00:00"
    );
    const reservedSpotIds = reservedReservations.map(
      (reservation) => reservation.parkingSpotId
    );
    setReservedDates(reservedSpotIds);
  };

  const user = auth.currentUser;
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("1: ", formValues);
    const errors = validate(formValues);
    setFormErrors(errors);
    console.log("2: ", formValues);
    if (Object.keys(errors).length === 0) {
      const reservationId = nanoid(6);
      const parkingSpotId = parkingSpot;
      const userId = user.uid;
      const licensePlate = formValues.license;
      const reservationDate = startDate;
      let endHours = endDate.getHours();
      if (endDate.getDay() > startDate.getDay()) {
        endHours = endDate.getHours() + 24;
      }
      const time = endHours - reservationDate.getHours();
      const isCheckedIn = false;
      try {
        addToReservationDB(
          reservationId,
          parkingSpotId,
          userId,
          licensePlate,
          reservationDate,
          time,
          isCheckedIn
        );
        fetchReservedReservations();
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
      clearValues(formValues);
    }
    setIsSubmit(true);
  };

  useEffect(() => {
    fetchReservedReservations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate, endDate, isSubmit]);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    if (!values.license) {
      errors.license = "License Plate Required!";
    }
    if (!parkingSpot) {
      errors.parkingSpot = "Parking Spot Required!";
    }

    return errors;
  };

  const clearValues = (values) => {
    formValues.license = "";
    setStartDate(
      setHours(setMinutes(new Date(), 0), new Date().getHours() + 1)
    );
    setEndDate(setHours(setMinutes(new Date(), 0), new Date().getHours() + 2));
    setParkingSpot(null);
    componentRef.current.value = "";
  };

  return (
    <form onSubmit={handleSubmit}>
      {/*Reservation Page */}
      <Container className={`${styles.reservationAlign} reservation`}>
        <h1 className={styles.reservationTitle}> Reserve a Spot</h1>
        <Row className="ms-3">
          <Col>
            <label className={styles.reservationLabel}>Arrival Time</label>
            <DatePicker
              className={styles.datePicker}
              selected={startDate}
              onChangeRaw={(e) => e.preventDefault()}
              onChange={(date) => {
                setStartDate(date);
                setEndDate(setHours(setMinutes(date, 0), date.getHours() + 1));
              }}
              showTimeSelect
              filterTime={filterPassedTime}
              minDate={new Date()}
              timeIntervals={60}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <label className={styles.reservationLabel}>
              {/*Spacing Purposes */}
            </label>
          </Col>
          <Col>
            <label className={styles.reservationLabel}>Departure Time</label>
            <DatePicker
              className={styles.datePicker}
              selected={endDate}
              onChangeRaw={(e) => e.preventDefault()}
              onChange={(date) => setEndDate(date)}
              minDate={startDate}
              maxDate={startDate}
              minTime={setHours(
                setMinutes(startDate, 0),
                startDate.getHours() + 1
              )}
              maxTime={setHours(
                setMinutes(startDate, 0),
                startDate.getHours() + 3
              )}
              timeIntervals={60}
              showTimeSelect
              dateFormat="MMMM d, yyyy h:mm aa"
            />
            <label className={styles.reservationLabel}>
              {/*Spacing Purposes */}
            </label>
          </Col>
        </Row>
        <Row className="ms-3">
          <Col>
            <label className={styles.reservationLabel}>
              License Plate Number
            </label>
            <input
              className={styles.reservationInputBox}
              type="text"
              name="license"
              placeholder="Enter License Plate"
              value={formValues.license}
              onChange={handleChange}
            ></input>
            <label className={styles.error}>{formErrors.license}</label>
          </Col>
          <Col>
            <label className={styles.reservationLabel}>
              Chosen Parking Spot
            </label>
            <input
              className={styles.reservationInputBox}
              ref={componentRef}
              type="text"
              disabled
            ></input>
            <label className={styles.error}>{formErrors.parkingSpot}</label>
          </Col>
        </Row>

        {/* Garage Floor Image*/}
        <div className="d-flex justify-content-center">
          <Container className={styles.garageFloor}>
            <Row>
              {parkValuesRow1.map((parkValue) => (
                <ParkingSpot
                  key={parkValue}
                  parkValue={parkValue}
                  isReserved={reservedDates.includes(parkValue)}
                  onClickHandler={onClickHandler}
                />
              ))}
            </Row>
            <Row>
              {parkValuesRow2.map((parkValue) => (
                <ParkingSpot
                  key={parkValue}
                  parkValue={parkValue}
                  isReserved={reservedDates.includes(parkValue)}
                  onClickHandler={onClickHandler}
                />
              ))}
            </Row>
          </Container>
        </div>
        <div className="d-flex justify-content-center">
          <button className={styles.reservationBtn}>Reserve</button>
        </div>
      </Container>
    </form>
  );
};
export default ReservationForm;
