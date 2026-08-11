import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from '../pages/homepage';

export default function Routers() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  )
}