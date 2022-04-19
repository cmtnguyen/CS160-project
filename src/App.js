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

import ViewViolation from './Components/EmployeePages/ViewViolationPage';
import ViewCheckIn from "./Components/EmployeePages/ViewCheckInPage";


function App() {
  return (
    // Routes for website
    // <Route path="/PAGELINK" element={<PAGE />} />
    // need to implement employee checker to display correct navbar
    <Router>
      {true ? <Navbar /> : <EmployeeNav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/reserve" element={<Reserve />} />
        <Route path="/reservations" element={<View />} />
        <Route path="/report" element={<Report />} />
        <Route path="/employee/viewreport" element={<ViewViolation />} />
        <Route path="/employee/viewcheckin" element={<ViewCheckIn />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;