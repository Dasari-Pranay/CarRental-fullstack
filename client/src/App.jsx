import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

// Components & Pages
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import CarDetails from './pages/CarDetails';
import Cars from './pages/Cars';
import MyBookings from './pages/MyBookings';
import Layout from './pages/Owner/Layout';
import Dashboard from './pages/Owner/Dashboard';
import AddCar from './pages/Owner/AddCar';
import ManageCars from './pages/Owner/ManageCars';
import ManageBooking from './pages/Owner/ManageBooking';
import Login from './components/Login';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext.jsx';

const App = () => {
  const { showLogin} = useAppContext(); // ✅ Added parentheses
  const location = useLocation();
  const isOwnerPath = location.pathname.startsWith('/owner');

  return (
    <>
      <Toaster />
      {showLogin && <Login />}


      {/* Show user navbar only on non-owner routes */}
      {!isOwnerPath && <Navbar />}

      <Routes>
        {/* Public User Routes */}
        <Route path='/' element={<Home />} />
        <Route path='/cars' element={<Cars />} />
        <Route path='/carDetails/:id' element={<CarDetails />} />
        <Route path='/my-bookings' element={<MyBookings />} />

        {/* Owner/Admin Routes */}
        <Route path='/owner' element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path='add-car' element={<AddCar />} />
          <Route path='manage-cars' element={<ManageCars />} />
          <Route path='manage-bookings' element={<ManageBooking />} />
        </Route>

        {/* Fallback Route */}
        <Route
          path='*'
          element={<h1 className='text-center py-20 text-2xl'>404 - Page Not Found</h1>}
        />
      </Routes>

      {/* Show footer only on non-owner routes */}
      {!isOwnerPath && <Footer />}
    </>
  );
};

export default App;
