import { Fragment } from "react";
import styles from "./ReservationForm.module.css";
import { Row, Col, Container } from "react-bootstrap";
import { useState, useEffect } from "react";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import setHours from "date-fns/setHours";
import setMinutes from "date-fns/setMinutes";


const ReservationForm = (props) => {
  const [startDate, setStartDate] = useState(new Date());
 
 const filterPassedTime = (time) => {
   const currentDate = new Date();
   const selectedDate = new Date(time);
 
   return currentDate.getTime() < selectedDate.getTime();
 };
 
 function endDate() {
   var date = new Date(); 
    date = setHours(setMinutes(new Date(startDate), 0), startDate.getHours() + 1);
   return date;
 }

  const initValues = {
    firstName: "",
    lastName: "",
    email: "",
    arrive: "",
    depart: "",
    license: "",
    parkingSpot: "",
  };
  const [formValues, setFormValues] = useState(initValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors, formValues, isSubmit]);

  const validate = (values) => {
    const errors = {};
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const timeFormat = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;
    const parkingFormat = /^[A-P]$/;
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

    if (!values.arrive) {
      errors.arrive = "Arrival Time required";
    } else if (!timeFormat.test(values.arrive)) {
      errors.arrive = "Invalid Arrival Time";
    }

    if (!values.depart) {
      errors.depart = "Departure Time Required!";
    } else if (!timeFormat.test(values.depart)) {
      errors.depart = "Invalid Departure Time";
    }

    if (!values.license) {
      errors.license = "License Plate Required!";
    }

    if (!values.parkingSpot) {
      errors.parkingSpot = "Chosen Parking Spot Required!";
    } else if (!parkingFormat.test(values.parkingSpot)) {
      errors.parkingSpot = "Invalid Parking Spot";
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
             <DatePicker className={styles.datePicker}
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
             <DatePicker className={styles.datePicker}
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
              type="text"
              name="parkingSpot"
              placeholder="ex. A"
              value={formValues.parkingSpot}
              onChange={handleChange}
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
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>A</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>B</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>C</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>D</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>E</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>F</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>G</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>H</label>
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>I</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>J</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>K</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>L</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>M</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>N</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>O</label>
              </div>
            </Col>
            <Col>
              <div className={styles.parkingSpot}>
                <label className={styles.parkingLabel}>P</label>
              </div>
            </Col>
          </Row>
        </Container>
        <button className={styles.reservationBtn}>Reserve</button>
      </Container>
      <Fragment></Fragment>
    </form>
  );
};
export default ReservationForm;
