
import React from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import { Route , Routes } from 'react-router-dom';
import Flights from './pages/Flights';
import About from './pages/About';
import Contact from './pages/contact';
import Signup from './pages/Signup';
import Login from './pages/Login';
import ProtectedRoute from './routes/ProtectedRoute';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Dashboard/Profile';
import MyBookings from './pages/Dashboard/MyBookings';
import AdminDashboard from './pages/AdminDashboard/AdminDashboard';
import AdminProfile from './pages/AdminDashboard/AdminProfile';
import AllFlights from './pages/AdminDashboard/AllFlights';
import FlightDetails from './pages/AdminDashboard/FlightDetails';
import CreateFlightPage from './pages/AdminDashboard/CreateFlight/CreateFlightPage';
import AdminBookings from './pages/AdminDashboard/AdminBookings';
import UpdatePassword from './pages/UpdatePassword';
import ForgotPassword from './pages/ForgotPassword';
import AdminStats from './pages/AdminDashboard/AdminStats/AdminStats';




function App() {
  return (
       <div>
         
          {/* Navbar */}
          <Navbar />
           
          <Routes>

            {/* Public Routes */}
              <Route path="/" element={<Home />} />

              <Route path='/flights' element={<Flights />} />
              
              <Route path='/about' element={<About/>} />
              
              <Route path='/contact' element={<Contact/>} />

              <Route path='/signup' element={<Signup/>} />

              <Route path='/login' element={<Login/>} />

              <Route path="/forgot-password" element={<ForgotPassword />} />

              <Route path="/update-password/:token" element={<UpdatePassword />} />

              <Route path="/flights/:id" element={<FlightDetails />} />



             {/* Protected User Dashboard Route */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute role="user">
                    <Dashboard />
                  </ProtectedRoute>
                } 
              >
              
              <Route index element={<Profile />} />
              <Route path="profile" element={<Profile />} />
              <Route path="bookings" element={<MyBookings />} />

              </Route>
                  

                {/* Protected Admin Dashboard Route */}
              <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute role="admin">
                  <AdminDashboard/> 
                </ProtectedRoute>
              }
            >
              <Route index element={<AdminProfile/>} />
              <Route path="profile" element={<AdminProfile />} />
              <Route path="stats" element={<AdminStats/>} 	 />
              <Route path="flights" element={<AllFlights />} />
              <Route path="allbookings" element={<AdminBookings />} />
              <Route path="flights/:id" element={<FlightDetails />} />
              <Route path="create" element={<CreateFlightPage />} /> 

            </Route>
             

         </Routes>

       </div>

  );
}


export default App;
