import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './Components/Pages/LandingPage/LandingPage';
import Reserve from './Components/Pages/ReservationPage/ReservationPage';
import View from './Components/Pages/ViewPage/ViewPage';
import Login from './Components/Pages/LoginPage/LoginPage';
import Navbar from './Components/Navbars/Navbar';
import EmployeeNav from './Components/Navbars/EmployeeNavbar';

import ViewCheckIn from "./Components/EmployeePages/ViewCheckInPage";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, getUser } from "./firebase";


function App() {
  const [user] = useAuthState(auth);
  const reroute = <Navigate replace to="/login" />;
  const [isEmployeeWorker, setIsEmployeeWorker] = useState(false);

  useEffect(() => {
    const fetchEmployeeStatus = async () => {
      if (user) {
        const customer = await getUser(user.uid);
        const employeeOrUser = customer.isEmployee;
        setIsEmployeeWorker(employeeOrUser);
      }
    };
    fetchEmployeeStatus();
  }, [user]);

  let employeeReroute = <Navigate replace to="/login" />;
  if (user) {
    employeeReroute = <Navigate replace to="/reservations" />;
  }

  return (
    // Routes for website
    // <Route path="/PAGELINK" element={<PAGE />} />
    <Router>
      {!isEmployeeWorker ? <Navbar /> : <EmployeeNav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reserve" element={user ? <Reserve /> : reroute} />
        <Route path="/reservations" element={user ? <View /> : reroute} />
        <Route path="/employee/viewcheckin" element={isEmployeeWorker ? <ViewCheckIn /> : employeeReroute} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;