import { Fragment } from "react";
import { Row, Container } from "react-bootstrap";
import Navbar from "../../Navbar";
import styles from "./ViewPage.module.css";

const ViewPage = () => {
  return (
    <Fragment>
      <Navbar />
      <Container className={styles.checkAlign}>
        <h1 className={styles.checkTitle}>Check In</h1>
        <Row className={styles.columnGap}>
          <label>Email:</label>
          <input
            className={styles.checkInputBox}
            type="text"
            name="name"
            placeholder="ex. example@example.com"
          />
        </Row>
        <Row className={styles.columnGap}>
          <label>Reservation Number:</label>
          <input
            className={styles.checkInputBox}
            type="text"
            name="name"
            placeholder="ex. A12345"
          />
        </Row>
        <button className={styles.checkBtn} type="submit" href="/">
          Check In
        </button>
      </Container>
    </Fragment>
  );
};
export default ViewPage;
