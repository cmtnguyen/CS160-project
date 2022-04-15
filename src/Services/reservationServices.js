import axios from "axios";
import { createToken, auth } from "../firebase.js";

const baseUrl = process.env.REACT_APP_FIREBASE_POST_URL;
const resUrl = baseUrl + "reservations/";
const resByResIdUrl = resUrl + "reservationId/";
const resByUserIdUrl = resUrl + "userId/";

export const addToReservationDB = async (
  reservationId,
  parkingSpotId,
  userId,
  licensePlate,
  reservationDate,
  time,
  isCheckedIn
) => {
  const header = await createToken();
  const payload = {
    reservationId,
    parkingSpotId,
    userId,
    licensePlate,
    reservationDate,
    time,
    isCheckedIn,
  };
  try {
    const res = await axios.post(resUrl, payload, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const getAllReservations = async () => {
  const user = auth.currentUser
  const header = await createToken();
  try {
    const res = await axios.get(resByUserIdUrl + user.uid, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const checkIntoReservation = async (reservationId) => {
  const header = await createToken();
  try {
    const currReservation = await axios.get(
      resByResIdUrl + reservationId,
      header
    );
    currReservation.data.isCheckedIn = true;
    const res = await axios.put(
      resUrl + reservationId,
      currReservation.data,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};
export const cancelReservation = async (reservationId) => {
  const header = await createToken();
  try {
    await axios.delete(resUrl + reservationId, header);
  } catch (e) {
    console.error(e);
  }
};
