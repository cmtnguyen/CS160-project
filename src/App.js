import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './Components/Pages/LandingPage/LandingPage';
import Reserve from './Components/Pages/ReservationPage/ReservationPage';
import View from './Components/Pages/ViewPage/ViewPage';
import Report from './Components/Pages/ReportPage/ReportPage';
import Login from './Components/Pages/LoginPage/LoginPage';
import Navbar from './Components/Navbars/Navbar';
import EmployeeNav from './Components/Navbars/EmployeeNavbar';

import ViewCheckIn from "./Components/EmployeePages/ViewCheckInPage";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";


function App() {
  const [user] = useAuthState(auth);
  const reroute = <Navigate replace to="/login" />;
  return (
    // Routes for website
    // <Route path="/PAGELINK" element={<PAGE />} />
    // need to implement employee checker to display correct navbar and employee pages
    <Router>
      {true ? <Navbar /> : <EmployeeNav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reserve" element={user ? <Reserve /> : reroute} />
        <Route path="/reservations" element={user ? <View /> : reroute} />
        <Route path="/report" element={<Report />} />
        <Route path="/employee/viewcheckin" element={<ViewCheckIn />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;