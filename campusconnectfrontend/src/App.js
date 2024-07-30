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

function App() {
  return (
    <div className="App">
      <UserDataProvider>
        <CourseDataProvider>
        <Router>
          <NavBar />
          <Routes>

            <Route exact path='/' element={<Home />} />
            <Route exact path='/about' element={<About />} />
            <Route exact path='/course' element={<Course />} />
            <Route exact path='/login' element={<LoginStudent />} />
            <Route exact path='/profile' element={<Profile />} />
            <Route path='/dashboard' element={<AdminDashboard />} />
          </Routes>
        </Router>
                {/* <NavBar/>
              <Home/>
              <About/>
              <Course/>
              <Profile/> */}
                {/* <AdminDashboard/> */}

        <AiChat />
        </CourseDataProvider>
      </UserDataProvider>
    </div>

  );
}

export default App;
