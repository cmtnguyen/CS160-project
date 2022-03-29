import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './Components/Pages/LandingPage/LandingPage';
import Reserve from './Components/Pages/ReservationPage/ReservationPage';
import CheckIn from './Components/Pages/CheckInPage/CheckInPage';
import Report from './Components/Pages/ReportPage/ReportPage';
import Cancel from './Components/Pages/CancelPage/CancelPage';


function App() {
  return (
    // Routes for website
    // <Route exact path="/PAGELINK" element={<PAGE />} />
    <Router>
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/reserve" element={<Reserve />} />
        <Route exact path="/cancel" element={<Cancel />} />
        <Route exact path="/checkIn" element={<CheckIn />} />
        <Route exact path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;