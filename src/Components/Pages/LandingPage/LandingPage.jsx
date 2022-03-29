import { Fragment } from "react";
import Navbar from "../../Navbar";
import styles from "./LandingPage.module.css";

const LandingPage = () => {
  return (
    <Fragment>
      <Navbar />
      <h1 className={styles.header}>
        Welcome to Car-eservation. Save 15% or more in time spent finding
        parking.
      </h1>
    </Fragment>
  );
};
export default LandingPage;
