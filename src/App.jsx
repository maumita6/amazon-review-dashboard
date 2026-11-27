import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import DashboardPage from './Pages/DashboardPage';
import MainLayout from './Layouts/MainLayout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route element={<MainLayout />}>
        <Route path="/dashboard/:filename" element={<DashboardPage />} />
      </Route>

    </Routes>
  );
}

export default App;
