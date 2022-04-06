import { Fragment } from "react";
import { Row, Container } from "react-bootstrap";
import Navbar from "../../Navbar";
import styles from "./CancelPage.module.css";

const CancelPage = () => {
  return (
    <Fragment>
      <Navbar />
      <Container className={styles.cancelAlign}>
        <h1 className={styles.cancelTitle}>Cancel</h1>
        <Row className={styles.columnGap}>
          <label>Email:</label>
          <input
            className={styles.cancelInputBox}
            type="text"
            name="name"
            placeholder="ex. example@example.com"
          />
        </Row>
        <Row className={styles.columnGap}>
          <label>Reservation Number:</label>
          <input
            className={styles.cancelInputBox}
            type="text"
            name="name"
            placeholder="ex. A12345"
          />
        </Row>
        <button className={styles.cancelBtn} type="submit" href="/">
          Cancel
        </button>
      </Container>
    </Fragment>
  );
};
export default CancelPage;
