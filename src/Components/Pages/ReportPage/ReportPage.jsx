import { Fragment } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Navbar from "../../Navbar";
import styles from "./ReportPage.module.css";

const ReportPage = () => {
  return (
    <Fragment>
      <Navbar />
      <Container className={styles.reportAlign}>
        <h1 className={styles.reportTitle}>Report Form</h1>
        <p>Please send us details about the parking violation you would like to report. This includes your parking spot number and the license plate number of the car in your occupied spot. Our Report Center will analyze your submission and take the appropriate measures. Thank you.</p>
        <hr/>
        <Row className={styles.columnGap}>
          <label>Date of Report:</label>
          <input className={styles.reportInputBoxLong} type="date" name="name" required/>
        </Row>
        <Row className={styles.columnGap}>
          <label>Name:</label>
          <input className={styles.reportInputBox} type="text" name="name" placeholder="First" />
          <input className={styles.reportInputBox} type="text" name="name" placeholder="Last" />
        </Row>
        <Row className={styles.columnGap}>
          <label>Email:</label>
          <input className={styles.reportInputBoxLong} type="text" name="name" placeholder="ex. example@example.com"/>
        </Row>
        <Row className={styles.columnGap}>
          <label>Parking Spot Number:</label>
          <input className={styles.reportInputBoxLong} type="text" name="name" placeholder="ex. A35"/>
        </Row>
        <Row className={styles.columnGap}>
          <label>License Plate Number:</label>
          <input className={styles.reportInputBoxLong} type="text" name="name" placeholder="ex. 123456"/>
        </Row>
        <button className={styles.reportBtn} type="submit" href="/">Report</button>
    </Container>
    </Fragment>
  );
};
export default ReportPage;
