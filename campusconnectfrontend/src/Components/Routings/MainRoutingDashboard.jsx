import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from '../Home';
import About from '../About';
import Course from '../Course';
import LoginStudent from '../LoginStudent';
import Profile from '../Profile';
import AdminDashboard from '../AdminDashboard';
import NavBar from '../Navbar';
import { useFormData } from '../Context/UserData';

const MainRoutingDashboard = () => {
  const { formData } = useFormData();

  // Conditionally render routes based on formData
  const routes = [
    <Route key="/" path="/" element={<Home />} />,
    <Route key="/about" path="/about" element={<About />} />,
    <Route key="/course" path="/course" element={<Course />} />,
    <Route key="/login" path="/login" element={<LoginStudent />} />,
  ];

  if (formData && formData.name !== '') {
    routes.push(<Route key="/profile" path="/profile" element={<Profile />} />);
  }

  if (formData && formData.type === 'admin') {
    routes.push(<Route key="/dashboard" path="/dashboard" element={<AdminDashboard />} />);
  }

  return (
    <div>
      <Router>
        <NavBar />
        <Routes>
          {routes}
        </Routes>
      </Router>
    </div>
  );
};

export default MainRoutingDashboard;
