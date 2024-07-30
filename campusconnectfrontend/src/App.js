import About from './Components/About';
import AiChat from './Components/AIchatBot/aiChat';
import Course from './Components/Course';
import Home from './Components/Home';
import LoginStudent from './Components/LoginStudent';
import LoginTeacherAdmin from './Components/LoginTeacherAdmin';
import NavBar from './Components/Navbar';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Profile from './Components/Profile';
import AdminDashboard from './Components/AdminDashboard';

import "./Components/Context/UserData"
import { UserDataProvider } from './Components/Context/UserData';
import { CourseDataProvider } from './Components/Context/CourseData';
import MainRoutingDashboard from './Components/Routings/MainRoutingDashboard';

function App() {
  return (
    <div className="App">
      <UserDataProvider>
        <CourseDataProvider>
          <MainRoutingDashboard/>
        <AiChat />
        </CourseDataProvider>
      </UserDataProvider>
    </div>

  );
}

export default App;
