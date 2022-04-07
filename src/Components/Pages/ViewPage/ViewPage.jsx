import { Fragment } from "react";
import { Row, Container } from "react-bootstrap";
import { useEffect } from "react";
import { auth } from "../../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import styles from "./ViewPage.module.css";

const ViewPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading, navigate]);
  return (
    <Fragment>
      {user && (
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
      )}
    </Fragment>
  );
};
export default ViewPage;
