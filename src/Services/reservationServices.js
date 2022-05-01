import axios from "axios";
import { createToken, auth } from "../firebase.js";

const baseUrl = process.env.REACT_APP_FIREBASE_POST_URL;
const resUrl = baseUrl + "reservations/";
const resByResIdUrl = resUrl + "reservationId/";
const resByUserIdUrl = resUrl + "userId/";
const resByDateUrl = resUrl + "date/";
const resByParkingSpotUrl = resUrl + "parkingSpotId/";
const resByCheckedInUrl = resUrl + "checkedIn"


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
  const user = auth.currentUser;
  const header = await createToken();
  try {
    const res = await axios.get(resByUserIdUrl + user.uid, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getReservationByDate = async (date) => {
  const header = await createToken();
  try {
    const res = await axios.get(resByDateUrl + date, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

export const getReservationByRangeDate = async (startDate, endDate) => {
  const header = await createToken();
  try {
    const res = await axios.get(
      resByDateUrl + startDate + "/" + endDate,
      header
    );
    return res.data;
  } catch (e) {
    console.error(e);
  }
};

// gets reservation that ends right when current reservation would start
export const getPrevReservation = async (reservationId) => {
  const header = await createToken();
  try {
    const currReservation = await axios.get(
      resByResIdUrl + reservationId,
      header
    );
    const parkingSpot = currReservation.data.parkingSpotId;
    const resDate = new Date(currReservation.data.reservationDate);
    const resPerSpot = await axios.get(
      resByParkingSpotUrl + parkingSpot,
      header
    );
    // see if there's a reservation right before they arrive
    const prevReservation = (resPerSpot.data || []).filter(function (
      reservation
    ) {
      const departureTime = new Date(reservation.reservationDate);
      departureTime.setTime(
        departureTime.getTime() + reservation.time * 60 * 60 * 1000
      ); // adds however many hours they reserved to get departure time
      return departureTime.getTime() === resDate.getTime();
    })[0];
    return prevReservation;
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

export const checkOutReservation = async (reservationId) => {
  const header = await createToken();
  try {
    const currReservation = await axios.get(
      resByResIdUrl + reservationId,
      header
    );
    currReservation.data.isCheckedIn = false;
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

export const getCheckedInReservations = async() => {
  const header = await createToken();
  try {
    const res = await axios.get(resByCheckedInUrl, header);
    return res.data;
  } catch (e) {
    console.error(e);
  }
}
