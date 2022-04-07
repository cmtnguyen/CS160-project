import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Landing from './Components/Pages/LandingPage/LandingPage';
import Reserve from './Components/Pages/ReservationPage/ReservationPage';
import View from './Components/Pages/ViewPage/ViewPage';
import Report from './Components/Pages/ReportPage/ReportPage';
import Login from './Components/Pages/LoginPage/LoginPage';
import Navbar from './Components/Navbar';


function App() {
  return (
    // Routes for website
    // <Route exact path="/PAGELINK" element={<PAGE />} />
    <Router>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/reserve" element={<Reserve />} />
        <Route exact path="/reservations" element={<View />} />
        <Route exact path="/report" element={<Report />} />
      </Routes>
    </Router>
  );
}

export default App;