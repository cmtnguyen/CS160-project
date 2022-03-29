import { Fragment } from "react";
import styles from "./ReservationPage.module.css";
import ReservationForm from "./ReservationForm/ReservationForm";
import Navbar from "../../Navbar";

const ReservationPage = () => {
  return (
    <Fragment>
      <Navbar />
      <ReservationForm />
    </Fragment>
  );
};
export default ReservationPage;
