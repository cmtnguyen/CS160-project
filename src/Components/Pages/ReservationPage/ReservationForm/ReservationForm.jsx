import { Fragment } from "react";
import styles from "./ReservationForm.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";
import { auth } from "../../../../firebase.js";
import { v4 as uuid } from "uuid";
import { 
  addToReservationDB, 
  getReservationByDate 
} from "../../../../Services/reservationServices.js"

//should prob move to new file later
const ParkingSpot = ({parkValue, isReserved, onClickHandler}) => {
  return (
    <Col>
      <button
        className={isReserved ? styles.parkingSpot2 : styles.parkingSpot}
        disabled={isReserved ? true : false}
        type="button"
        onClick={onClickHandler}
        value={parkValue}>
        {parkValue}
      </button>
    </Col>
  )
}

const ReservationForm = (props) => {
  const [startDate, setStartDate] = useState(
    setHours(setMinutes(new Date(), 0), new Date().getHours() + 1)
  );
  const [reservedDates, setReservedDates] = useState([]);
  const componentRef = useRef("null");
  const filterPassedTime = (time) => {
    const currentDate = new Date();
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const parkValuesRow1 = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H"
  ];

  const parkValuesRow2 = [
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
  ];

  const onClickHandler = (e) => {
    componentRef.current.value = e.target.value;
    setParkingSpot(e.target.value);
  };

  function endDate() {
    var date = new Date();
    date = setHours(
      setMinutes(new Date(startDate), 0),
      startDate.getHours() + 1
    );
    return date;
  }

  const initValues = {
    firstName: "",
    lastName: "",
    email: "",
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

  const user = auth.currentUser;
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setFormErrors(errors);
    console.log(formValues);
    if (Object.keys(formErrors).length === 0) {
      const reservationId = uuid();
      const parkingSpotId = parkingSpot;
      const userId = user.uid;
      const licensePlate = formValues.license;
      const reservationDate = startDate;
      const time = reservationDate.getHours();
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
      } catch (err) {
        console.error(err);
        alert(err.message);
      }
    }
    setIsSubmit(true);
  };

  useEffect(() => {
    const fetchReservedReservations = async () => {
      const reservedReservations = await getReservationByDate(startDate.toISOString());
      const reservedSpotIds = reservedReservations.map((reservation) => reservation.parkingSpotId)
      setReservedDates(reservedSpotIds);
    }
    fetchReservedReservations();
  }, [startDate, isSubmit])

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.firstName) {
      errors.firstName = "First Name Required!";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name Required!";
    }
    if (!values.email) {
      errors.email = "Email required";
    } else if (!emailFormat.test(values.email)) {
      errors.email = "Invalid Email Address";
    }


    if (!values.license) {
      errors.license = "License Plate Required!";
    }
    return errors;
  };
  return (
    <form onSubmit={handleSubmit}>
      {/*Reservation Page */}
      <Container className={styles.reservationAlign} class="reservation">
        <h1 className={styles.reservationTitle}> Reserve a Spot</h1>
        <Row>
          <Col xs={5}>
            <label className={styles.reservationLabel}>First Name</label>
          </Col>
          <Col xs={5}>
            <label className={styles.reservationLabel}>Last Name</label>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <input
              className={styles.reservationInputBox}
              type="text"
              name="firstName"
              placeholder="Enter First Name"
              value={formValues.firstName}
              onChange={handleChange}
            ></input>
          </Col>
          <Col xs={5}>
            <input
              className={styles.reservationInputBox}
              type="text"
              name="lastName"
              placeholder="Enter Last Name"
              value={formValues.lastName}
              onChange={handleChange}
            ></input>
          </Col>
          <Row>
            <Col xs={5}>
              <label className={styles.error}>{formErrors.firstName}</label>
            </Col>
            <Col xs={5}>
              <label className={styles.error}>{formErrors.lastName}</label>
            </Col>
          </Row>
        </Row>
        <Row>
          <Col xs={5}>
            <label className={styles.reservationLabel}>Email</label>
          </Col>
        </Row>
        <Row>
          <Col>
            <input
              className={styles.reservationLongBox}
              type="text"
              name="email"
              placeholder="ex. example@example.com"
              value={formValues.email}
              onChange={handleChange}
            ></input>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <label className={styles.error}>{formErrors.email}</label>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <label className={styles.reservationLabel}>Arrival Time</label>
          </Col>
          <Col xs={5}>
            <label className={styles.reservationLabel}>Departure Time</label>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <DatePicker
              className={styles.datePicker}
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              showTimeSelect
              filterTime={filterPassedTime}
              minDate={new Date()}
              locale="en-US"
              timeIntervals={60}
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </Col>
          <Col xs={5}>
            <DatePicker
              className={styles.datePicker}
              selected={endDate()}
              disabled
              showTimeSelect
              locale="en-US"
              dateFormat="MMMM d, yyyy h:mm aa"
            />
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            {/*<label className={styles.error}>{formErrors.arrive}</label>*/}
          </Col>
          <Col xs={5}>
            {/*<label className={styles.error}>{formErrors.depart}</label>*/}
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <label className={styles.reservationLabel}>
              License Plate Number
            </label>
          </Col>
          <Col xs={5}>
            <label className={styles.reservationLabel}>
              Chosen Parking Spot
            </label>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <input
              className={styles.reservationInputBox}
              type="text"
              name="license"
              placeholder="Enter License Plate"
              value={formValues.license}
              onChange={handleChange}
            ></input>
          </Col>
          <Col xs={5}>
            <input
              className={styles.reservationInputBox}
              ref={componentRef}
              type="text"
              disabled
            ></input>
          </Col>
        </Row>
        <Row>
          <Col xs={5}>
            <label className={styles.error}>{formErrors.license}</label>
          </Col>
          <Col xs={5}>
            <label className={styles.error}>{formErrors.parkingSpot}</label>
          </Col>
        </Row>

        {/* Garage Floor Image*/}
        <Container className={styles.garageFloor}>
          <Row>
            {parkValuesRow1.map((parkValue) => (
              <ParkingSpot 
              parkValue={parkValue} 
              isReserved={reservedDates.includes(parkValue)}
              onClickHandler={onClickHandler} />
            ))}
          </Row>
          <Row>
            {parkValuesRow2.map((parkValue) => (
              <ParkingSpot 
              parkValue={parkValue} 
              isReserved={reservedDates.includes(parkValue)}
              onClickHandler={onClickHandler} />
            ))}
          </Row>
        </Container>
        <button className={styles.reservationBtn}>Reserve</button>
      </Container>
      <Fragment></Fragment>
    </form>
  );
};
export default ReservationForm;
