import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ReservationPage from './ReservationPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/reserve" element={<ReservationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
