import React, { useEffect, useState } from 'react'
import { courseCloud, CourseNavResponsive } from '../Carousel/HomeCardResponsive';
import Carousel from 'react-multi-carousel';
import "../Assets/CSS/Course.css"
import CourseCard from './CourseCard';
import NavBar from './Navbar';
import { useCourseData } from './Context/CourseData';
import "react-multi-carousel/lib/styles.css"
import HashLoader from "react-spinners/HashLoader";

const Course = () => {

    const [activeCategory, setActiveCategory] = useState("19");
    const { CourseDatabase, courseCategories } = useCourseData()

    const [isLoaded, setIsLoaded] = useState(false);
    const [hiddenElements, setHiddenElements] = useState([]);

    const [activeNavCourse, setActiveNavCourse] = useState("Computer");
    // console.log(activeNavCourse);
    // console.log(CourseDatabase);
    const [activeCourseData, setActiveCourseData] = useState(CourseDatabase[activeNavCourse]);
    // console.log(activeCourseData);

    // Function to handle clicking on a category
    const handleCategoryClick = (category) => {
        setActiveNavCourse(category);
        setActiveCourseData(CourseDatabase[category])
    };

    useEffect(() => {
        // Dynamically import the CSS for the carousel
        const loadCarouselCss = async () => {
            // await ;
            setIsLoaded(true);
        };

        // Delay to ensure the carousel is rendered before adding hidden class
        const timeout = setTimeout(() => {
            loadCarouselCss();
        }, 1); // Adjust delay as needed
        return () => clearTimeout(timeout);
    }, []);

    const [anchorEl, setAnchorEl] = useState(null);
    const [currentCard, setCurrentCard] = useState(null);

    const handlePopoverOpen = (event, card) => {
        setAnchorEl(event.currentTarget);
        setCurrentCard(card);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setCurrentCard(null);
    };

    const open = Boolean(anchorEl);

    const computerCourse = [
        {
            Course_Name: "Amazon AWS Serverless APIs & Apps",
            Course_Author: "Academind by Maximilian Schwarzmüller",
            Ratings: "4.5",
            Price: "499",
            NoOfCustomers: "9985",
            Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
        },
        {
            Course_Name: "Machine Learning and Algorithms",
            Course_Author: "Sriram",
            Ratings: "5",
            Price: "499",
            NoOfCustomers: "9985",
            Image: "https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg",
        },
        {
            Course_Name: "React - The Complete Guide",
            Course_Author: "Maximilian Schwarzmüller",
            Ratings: "4.8",
            Price: "999",
            NoOfCustomers: "15432",
            Image: "https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg",
        },
        {
            Course_Name: "Complete Python Bootcamp",
            Course_Author: "Jose Portilla",
            Ratings: "4.6",
            Price: "799",
            NoOfCustomers: "25430",
            Image: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
        },
        {
            Course_Name: "The Web Developer Bootcamp",
            Course_Author: "Colt Steele",
            Ratings: "4.7",
            Price: "599",
            NoOfCustomers: "30432",
            Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
        },
        {
            Course_Name: "Java Programming Masterclass",
            Course_Author: "Tim Buchalka",
            Ratings: "4.5",
            Price: "699",
            NoOfCustomers: "20432",
            Image: "https://img-c.udemycdn.com/course/240x135/533682_c10c_4.jpg",
        },
        {
            Course_Name: "Data Science and Machine Learning Bootcamp",
            Course_Author: "Jose Portilla",
            Ratings: "4.7",
            Price: "899",
            NoOfCustomers: "18432",
            Image: "https://img-c.udemycdn.com/course/240x135/903744_8eb2.jpg",
        },
        {
            Course_Name: "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp",
            Course_Author: "Angela Yu",
            Ratings: "4.8",
            Price: "1199",
            NoOfCustomers: "26432",
            Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
        },
        {
            Course_Name: "The Complete Node.js Developer Course",
            Course_Author: "Andrew Mead",
            Ratings: "4.7",
            Price: "799",
            NoOfCustomers: "17345",
            Image: "https://img-c.udemycdn.com/course/240x135/922484_52a1_4.jpg",
        },
        {
            Course_Name: "The Complete SQL Bootcamp",
            Course_Author: "Jose Portilla",
            Ratings: "4.6",
            Price: "699",
            NoOfCustomers: "12345",
            Image: "https://img-c.udemycdn.com/course/240x135/762616_7693_3.jpg",
        },
        {
            Course_Name: "Learn Ethical Hacking From Scratch",
            Course_Author: "Zaid Sabih",
            Ratings: "4.6",
            Price: "999",
            NoOfCustomers: "23456",
            Image: "https://img-c.udemycdn.com/course/240x135/857010_8239_2.jpg",
        },
        {
            Course_Name: "Docker and Kubernetes: The Complete Guide",
            Course_Author: "Stephen Grider",
            Ratings: "4.8",
            Price: "899",
            NoOfCustomers: "15678",
            Image: "https://img-c.udemycdn.com/course/240x135/1793824_7999_2.jpg",
        },
        {
            Course_Name: "Angular - The Complete Guide",
            Course_Author: "Maximilian Schwarzmüller",
            Ratings: "4.7",
            Price: "999",
            NoOfCustomers: "29876",
            Image: "https://img-c.udemycdn.com/course/240x135/756150_c033_2.jpg",
        },
        {
            Course_Name: "Complete Guide to TensorFlow for Deep Learning with Python",
            Course_Author: "Jose Portilla",
            Ratings: "4.6",
            Price: "899",
            NoOfCustomers: "18765",
            Image: "https://img-c.udemycdn.com/course/240x135/1863854_8bfa_3.jpg",
        },
        {
            Course_Name: "The Complete JavaScript Course 2021: From Zero to Expert!",
            Course_Author: "Jonas Schmedtmann",
            Ratings: "4.8",
            Price: "999",
            NoOfCustomers: "23456",
            Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
        },
    ];

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000);

    }, [])


    return (

        <div className='Course-Container' id='course' style={{ marginTop: "50px" }}>
                <div  style={{
                    visibility: loading ? 'visible' : 'hidden',
                    display: loading ? 'flex' : 'none',
                    justifyContent: "center",
                    alignItems: "center",
                    position: 'fixed', // Fix the position of the loader
                    top: 0, 
                    left: 0, 
                    right: 0, 
                    bottom: 0, 
                    backgroundColor: 'rgba(255, 255, 255)', // Optional: Add a background color with opacity
                    zIndex: 9999, // Ensure it appears above other content
                }}>
                    <HashLoader

                    />
                </div>
                <div className='Course-Body'  style={{visibility: loading ? 'hidden' : 'visible'}}>
                    <div className='Course-Headings'>
                        <div className='Course-MainHeading'>
                            All the Skills In One Place
                        </div>
                        <div className='Course-SubHeading'>
                            From critical skills to technical topics,
                            Polar Portal supports your professional development.
                        </div>
                    </div>

                    <div className='Course-List' style={{visibility: loading ? 'hidden' : 'visible'}}>
                        <Carousel
                            responsive={CourseNavResponsive}
                            arrows={false}
                        >
                            {courseCategories.map((cat) => (
                                <div
                                    key={cat.name}
                                    className={`category-item ${activeNavCourse === cat.name ? "activeNavCourse" : ""
                                        }`}
                                    onClick={() => handleCategoryClick(cat.name)}
                                >
                                    {cat.name}
                                </div>
                            ))}
                            <div >
                                Anything Else?
                            </div>
                        </Carousel>
                    </div>
                    <div className="Course-Carousel" style={{visibility: loading ? 'hidden' : 'visible'}}>
                        <Carousel responsive={courseCloud} className='CourseCardListerBody' style={{display: loading ? 'none' : 'block'}}>
                            {activeCourseData.map((course, index) => (
                                <CourseCard
                                    key={index}
                                    Course_Name={course.Course_Name}
                                    Course_Author={course.Course_Author}
                                    Ratings={course.Ratings}
                                    Price={course.Price}
                                    NoOfCustomers={course.NoOfCustomers}
                                    Image={course.Image}
                                    open={open && currentCard === index}
                                    anchorEl={anchorEl}
                                    handlePopoverOpen={(event) => handlePopoverOpen(event, index)}
                                    handlePopoverClose={handlePopoverClose}
                                    loading={loading}
                               
                                />
                            ))}
                        </Carousel>
                    </div>
                </div>
            
        </div>
    )
}

export default Course
