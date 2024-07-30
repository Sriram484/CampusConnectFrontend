import React, { useEffect, useRef, useState } from 'react'
import $ from 'jquery';
import "../Assets/CSS/About.css"
import TopPic from "../Assets/Image/AboutTopPic.jpg"
import BottomPic from "../Assets/Image/AboutBottomPic.jpg"
import NavBar from './Navbar';
import Course from './Course';

function Counter({ endValue }) {
    const [count, setCount] = useState(0);
  
    useEffect(() => {
      let start = 0;
      const duration = 3000; // Duration in ms
      const stepTime = 50; // Update every 50ms
      const steps = duration / stepTime;
      const stepValue = (endValue - start) / steps;
  
      const timer = setInterval(() => {
        start += stepValue;
        if (start >= endValue) {
          setCount(endValue);
          clearInterval(timer);
        } else {
          setCount(Math.ceil(start));
        }
      }, stepTime);
  
      // Cleanup function
      return () => clearInterval(timer);
    }, [endValue]);
  
    return <div className="count-digit">{count}</div>;
  }

  
  const About = () => {
    const counterRef = useRef(null);
    const [student,setStudents] = useState(9500);
    const [course,setCourse] = useState(599);
    const [awards,setAwards] = useState(64);
    return (
        <>
        <div className='About-Container' id='about'>
           <div className='About-Left'  style={{marginTop:"50px"}}>
                <div className='About-Left-Top-Pic'>
                    <img src={TopPic} alt="" />
                </div>
                <div className='About-Left-Bottom-Pic'>
                    <img src={BottomPic} alt="" />
                </div>
           </div>
           <div className='About-Right'  style={{marginTop:"50px"}}>
                <div className='About-Content'>
                    <div className='About-Title'>
                        A Few Words About Us
                    </div>
                    <div className='About-Description'>
                        <div className='About-MainDescription'>
                        Our community is being called to reimagine the future. As the only university 
                        where a renowned design school comes together with premier colleges, 
                        we are dedicated to making learning more relevant and transformational.
                        </div>
                        <div className='About-Counter' ref={counterRef}>
                            <div className='About-Box'>
                                <div className='About-Box-Title count-digit'>
                                  {student}
                                </div>
                                <div className='About-Box-SubHeading'>
                                    Students
                                </div>
                            </div>
                            <div className='About-Box'>
                                <div className='About-Box-Title count-digit'>
                                  {course}
                                </div>
                                <div className='About-Box-SubHeading'>
                                    Courses
                                </div>
                            </div>
                            <div className='About-Box'>
                                <div className='About-Box-Title count-digit'>
                                  {awards}
                                </div>
                                <div className='About-Box-SubHeading'>
                                    Awards
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
           </div>
        </div>
        </>
    )
}

export default About
