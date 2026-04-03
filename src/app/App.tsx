import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './LandingPage';
import ReservationPage from './ReservationPage';
import ProductPage from './ProductPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/product/:modelId" element={<ProductPage />} />
        <Route path="/reserve" element={<ReservationPage />} />
      </Routes>
    </BrowserRouter>
  );
}
