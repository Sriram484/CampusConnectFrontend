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
import CourseCardMainBody from '../CourseCardMainBody';
import AddToCart from '../AddToCart';
import AddToWishList from '../AddToWishList';
import CourseBuilder from '../CourseBuilder';
import CourseStructure from '../CourseBuilderStructurePage/CourseStructure';
import PublicProfilePage from '../PublicProfile';
import CourseLearningPage from '../CourseLearningPage';
import MyLearning from '../MyLearning';
import InstructorDashboard from '../IntructorDashboard';
import MyMyLearning from '../MyLearning';


const MainRoutingDashboard = () => {
  const { formData } = useFormData();

  // Conditionally render routes based on formData
  const routes = [
    <Route key="/" path="/" element={<Home />} />,
    // <Route key="/" path="/" element={<CourseBuilder />} />, //aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
    // <Route key="/" path="/" element={<PublicProfilePage />} />,              
    <Route key="/" path="/" element={<CourseLearningPage />} />,
    // <Route key="/" path="/" element={<MyLearning />} />,
    // <Route key="/" path="/" element={<InstructorDashboard />} />,
    <Route key="/" path="/" element={<CourseStructure />} />,
    <Route key="/courseMainBody" path="/courseMainBody" element={<CourseCardMainBody />} />,
    <Route key="/about" path="/about" element={<About />} />,
    <Route key="/course" path="/course" element={<Course />} />,
    <Route key="/login" path="/login" element={<LoginStudent />} />,
  ];

  if (formData && formData.name !== '') {
    routes.push(<Route key="/profile" path="/profile" element={<Profile />} />);
  }
  if (formData && formData.name !== '') {
    routes.push(<Route key="/addToCart" path="/addToCart" element={<AddToCart />} />);
  }
  if (formData && formData.name !== '') {
    routes.push(<Route key="/addToWishList" path="/addToWishList" element={<AddToWishList />} />);
  }
  if (formData && formData.name !== '') {
    routes.push(<Route key="/myLearning" path="/myLearning" element={<MyMyLearning />} />);
  }
  
  if (formData && formData.name !== '') {
    routes.push(<Route key="/instructordashboard" path="/instructordashboard" element={<InstructorDashboard />} />);
  }
  if (formData && formData.name !== '') {
    routes.push(<Route key="/courseBuilder" path="/courseBuilder" element={<CourseBuilder />} />);
  }
  if (formData && formData.name !== '') {
    routes.push(<Route key="/courseLearningPage" path="/courseLearningPage" element={<CourseLearningPage />} />);
  }
  
  if (formData && formData.role === 'ADMIN') {
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
