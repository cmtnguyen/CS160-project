import { Fragment } from "react";
//import styles from "./ReservationPage.module.css";
import ReservationForm from "./ReservationForm/ReservationForm";
import React, { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../firebase";

const ReservationPage = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/login");
  }, [user, loading, navigate]);
  return <Fragment>{user && <ReservationForm />}</Fragment>;
};
export default ReservationPage;
