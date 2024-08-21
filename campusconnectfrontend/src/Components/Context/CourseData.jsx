import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react';

// Create a context for the form data
export const UserDataContext = createContext();

// Custom hook to use the form data context
export const useCourseData = () => useContext(UserDataContext);

// Provider component
export const CourseDataProvider = ({ children }) => {
    // const CourseDatabase = {
    //     Health: [
    //         {
    //             Course_Name: "Yoga for Beginners",
    //             Course_Author: "Jane Doe",
    //             Ratings: "4.7",
    //             Price: "199",
    //             NoOfCustomers: "12345",
    //             Image: "https://img-c.udemycdn.com/course/240x135/6092325_fa47.jpg",
    //         },
    //         {
    //             Course_Name: "Mastering Meditation",
    //             Course_Author: "John Smith",
    //             Ratings: "4.8",
    //             Price: "249",
    //             NoOfCustomers: "67890",
    //             Image: "https://img-c.udemycdn.com/course/240x135/6069595_4a43_3.jpg",
    //         },
    //         {
    //             Course_Name: "Healthy Eating and Nutrition",
    //             Course_Author: "Emily Johnson",
    //             Ratings: "4.6",
    //             Price: "299",
    //             NoOfCustomers: "34567",
    //             Image: "https://img-c.udemycdn.com/course/240x135/6080583_b851.jpg",
    //         },
    //         {
    //             Course_Name: "Advanced Pilates Techniques",
    //             Course_Author: "Michael Brown",
    //             Ratings: "4.5",
    //             Price: "349",
    //             NoOfCustomers: "45678",
    //             Image: "https://img-c.udemycdn.com/course/240x135/6063915_6d03.jpg",
    //         },
    //         {
    //             Course_Name: "High-Intensity Interval Training (HIIT)",
    //             Course_Author: "Sarah Davis",
    //             Ratings: "4.7",
    //             Price: "199",
    //             NoOfCustomers: "56789",
    //             Image: "https://img-c.udemycdn.com/course/480x270/6022066_f124_5.jpg",
    //         },
    //         {
    //             Course_Name: "Mental Wellness and Stress Management",
    //             Course_Author: "Robert Wilson",
    //             Ratings: "4.8",
    //             Price: "249",
    //             NoOfCustomers: "67890",
    //             Image: "https://img-c.udemycdn.com/course/240x135/5988984_53f2.jpg",
    //         },
    //         {
    //             Course_Name: "Functional Training for Better Health",
    //             Course_Author: "Linda Martinez",
    //             Ratings: "4.6",
    //             Price: "299",
    //             NoOfCustomers: "78901",
    //             Image: "https://img-c.udemycdn.com/course/240x135/230066_632a_6.jpg",
    //         },
    //         {
    //             Course_Name: "Nutrition for Weight Loss",
    //             Course_Author: "David Anderson",
    //             Ratings: "4.7",
    //             Price: "199",
    //             NoOfCustomers: "89012",
    //             Image: "https://img-c.udemycdn.com/course/240x135/239640_fb72_2.jpg",
    //         },
    //         {
    //             Course_Name: "Introduction to Ayurveda",
    //             Course_Author: "Jessica Taylor",
    //             Ratings: "4.5",
    //             Price: "349",
    //             NoOfCustomers: "90123",
    //             Image: "https://img-c.udemycdn.com/course/240x135/281000_579e_2.jpg",
    //         },
    //         {
    //             Course_Name: "Cardio Workouts for All Levels",
    //             Course_Author: "Thomas Harris",
    //             Ratings: "4.6",
    //             Price: "299",
    //             NoOfCustomers: "12345",
    //             Image: "https://img-c.udemycdn.com/course/240x135/629672_a888_2.jpg",
    //         },
    //         {
    //             Course_Name: "Mindful Eating Practices",
    //             Course_Author: "Nancy Clark",
    //             Ratings: "4.7",
    //             Price: "249",
    //             NoOfCustomers: "23456",
    //             Image: "https://img-c.udemycdn.com/course/240x135/652906_e634.jpg",
    //         },
    //         {
    //             Course_Name: "Core Strength and Flexibility",
    //             Course_Author: "Paul Lewis",
    //             Ratings: "4.8",
    //             Price: "349",
    //             NoOfCustomers: "34567",
    //             Image: "https://img-c.udemycdn.com/course/240x135/756494_408d.jpg",
    //         },
    //         {
    //             Course_Name: "Healing Herbs and Supplements",
    //             Course_Author: "Karen Robinson",
    //             Ratings: "4.5",
    //             Price: "299",
    //             NoOfCustomers: "45678",
    //             Image: "https://img-c.udemycdn.com/course/240x135/874762_4686_13.jpg",
    //         },
    //         {
    //             Course_Name: "Guided Breathing Techniques",
    //             Course_Author: "Michael White",
    //             Ratings: "4.6",
    //             Price: "199",
    //             NoOfCustomers: "56789",
    //             Image: "https://img-c.udemycdn.com/course/240x135/998560_969a.jpg",
    //         },
    //         {
    //             Course_Name: "Strength Training Basics",
    //             Course_Author: "Jessica Lee",
    //             Ratings: "4.8",
    //             Price: "249",
    //             NoOfCustomers: "67890",
    //             Image: "https://img-c.udemycdn.com/course/240x135/1065420_3039_2.jpg",
    //         },
    //     ],
    //     Computer: [
    //         {
    //             Course_Name: "Amazon AWS Serverless APIs & Apps",
    //             Course_Author: "Academind by Maximilian Schwarzmüller",
    //             Ratings: "4.5",
    //             Price: "499",
    //             NoOfCustomers: "9985",
    //             Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
    //         },
    //         {
    //             Course_Name: "Machine Learning and Algorithms",
    //             Course_Author: "Sriram",
    //             Ratings: "5",
    //             Price: "499",
    //             NoOfCustomers: "9985",
    //             Image: "https://img-c.udemycdn.com/course/240x135/950390_270f_3.jpg",
    //         },
    //         {
    //             Course_Name: "React - The Complete Guide",
    //             Course_Author: "Maximilian Schwarzmüller",
    //             Ratings: "4.8",
    //             Price: "999",
    //             NoOfCustomers: "15432",
    //             Image: "https://img-c.udemycdn.com/course/240x135/1362070_b9a1_2.jpg",
    //         },
    //         {
    //             Course_Name: "Complete Python Bootcamp",
    //             Course_Author: "Jose Portilla",
    //             Ratings: "4.6",
    //             Price: "799",
    //             NoOfCustomers: "25430",
    //             Image: "https://img-c.udemycdn.com/course/240x135/567828_67d0.jpg",
    //         },
    //         {
    //             Course_Name: "The Web Developer Bootcamp",
    //             Course_Author: "Colt Steele",
    //             Ratings: "4.7",
    //             Price: "599",
    //             NoOfCustomers: "30432",
    //             Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
    //         },
    //         {
    //             Course_Name: "Java Programming Masterclass",
    //             Course_Author: "Tim Buchalka",
    //             Ratings: "4.5",
    //             Price: "699",
    //             NoOfCustomers: "20432",
    //             Image: "https://img-c.udemycdn.com/course/240x135/533682_c10c_4.jpg",
    //         },
    //         {
    //             Course_Name: "Data Science and Machine Learning Bootcamp",
    //             Course_Author: "Jose Portilla",
    //             Ratings: "4.7",
    //             Price: "899",
    //             NoOfCustomers: "18432",
    //             Image: "https://img-c.udemycdn.com/course/240x135/903744_8eb2.jpg",
    //         },
    //         {
    //             Course_Name: "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp",
    //             Course_Author: "Angela Yu",
    //             Ratings: "4.8",
    //             Price: "1199",
    //             NoOfCustomers: "26432",
    //             Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
    //         },
    //         {
    //             Course_Name: "The Complete Node.js Developer Course",
    //             Course_Author: "Andrew Mead",
    //             Ratings: "4.7",
    //             Price: "799",
    //             NoOfCustomers: "17345",
    //             Image: "https://img-c.udemycdn.com/course/240x135/922484_52a1_4.jpg",
    //         },
    //         {
    //             Course_Name: "The Complete SQL Bootcamp",
    //             Course_Author: "Jose Portilla",
    //             Ratings: "4.6",
    //             Price: "699",
    //             NoOfCustomers: "12345",
    //             Image: "https://img-c.udemycdn.com/course/240x135/762616_7693_3.jpg",
    //         },
    //         {
    //             Course_Name: "Learn Ethical Hacking From Scratch",
    //             Course_Author: "Zaid Sabih",
    //             Ratings: "4.6",
    //             Price: "999",
    //             NoOfCustomers: "23456",
    //             Image: "https://img-c.udemycdn.com/course/240x135/857010_8239_2.jpg",
    //         },
    //         {
    //             Course_Name: "Docker and Kubernetes: The Complete Guide",
    //             Course_Author: "Stephen Grider",
    //             Ratings: "4.8",
    //             Price: "899",
    //             NoOfCustomers: "15678",
    //             Image: "https://img-c.udemycdn.com/course/240x135/15305_0987_6.jpg",
    //         },
    //         {
    //             Course_Name: "Angular - The Complete Guide",
    //             Course_Author: "Maximilian Schwarzmüller",
    //             Ratings: "4.7",
    //             Price: "999",
    //             NoOfCustomers: "29876",
    //             Image: "https://img-c.udemycdn.com/course/240x135/756150_c033_2.jpg",
    //         },
    //         {
    //             Course_Name: "Complete Guide to TensorFlow for Deep Learning with Python",
    //             Course_Author: "Jose Portilla",
    //             Ratings: "4.6",
    //             Price: "899",
    //             NoOfCustomers: "18765",
    //             Image: "https://img-c.udemycdn.com/course/240x135/1863854_8bfa_3.jpg",
    //         },
    //         {
    //             Course_Name: "The Complete JavaScript Course 2021: From Zero to Expert!",
    //             Course_Author: "Jonas Schmedtmann",
    //             Ratings: "4.8",
    //             Price: "999",
    //             NoOfCustomers: "23456",
    //             Image: "https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg",
    //         },
    //     ]
    // };
    // const courseCategories = [
    //     { id: "19", name: "Computer" },
    //     { id: "95", name: "Health" },
    //     { id: "23", name: "History" },
    //     { id: "22", name: "Geography" },
    //     { id: "21", name: "Sports" },
    //     { id: "26", name: "Celebrities" },
    //     { id: "20", name: "Mythology" },
    //     { id: "27", name: "Art & Design" },
    //     { id: "28", name: "Music" },
    //     { id: "29", name: "Literature" },
    //     { id: "30", name: "Philosophy" },
    //     { id: "31", name: "Mathematics" },
    //     { id: "32", name: "Science Fiction" },
    //     { id: "33", name: "Economics" },
    //     { id: "34", name: "Psychology" },
    //     { id: "35", name: "Health & Wellness" },
    //     { id: "36", name: "Travel" },
    //     { id: "37", name: "Cooking" },
    //     { id: "38", name: "Photography" },
    //     { id: "40", name: "Engineering" },
    // ];


    const [courseCategories, setCourseCategories] = useState([]);
    const [CourseDatabase, setCourseDatabase] = useState({});

    // Fetch categories from the backend
    useEffect(() => {
        axios.get('http://localhost:1010/public/categories')
            .then(response => {
                setCourseCategories(response.data);
            })
            .catch(error => {
                console.error('Error fetching categories:', error);
            });
    }, []);

    // Fetch courses for each category
    useEffect(() => {
        console.log("$$$$$$$");
        const fetchCoursesForCategories = async () => {
            let database = {};
        
            if (courseCategories !== null) {
                for (const category of courseCategories) {
                    try {
                        console.log(category);
        
                        const coursePromises = category.courseIds.map(async (courseId) => {
                            try {
                                const response = await axios.get(`http://localhost:1010/public/courses/${courseId}`);
                                console.log(response.data);
                                return response.data; // Return the entire response.data object
                            } catch (error) {
                                console.error(`Error fetching course ${courseId}:`, error);
                                return null;
                            }
                        });
        
                        const courses = await Promise.all(coursePromises);
                        // Filter out any null responses due to errors
                        const validCourses = courses.filter(course => course !== null);
        
                        // Add the valid courses to the database under the current category name
                        if (validCourses.length > 0) {
                            database[category.name] = validCourses;
                        }
                    } catch (error) {
                        console.error(`Error processing category ${category.name}:`, error);
                    }
                }
            }
        
            setCourseDatabase(database);
        };
        
        if (courseCategories.length > 0) {
            fetchCoursesForCategories();
        }

    }, [courseCategories]);

    useEffect(() => {
        console.log(courseCategories);

        console.log(CourseDatabase);
    }, [CourseDatabase]);

    useEffect(() => {
        console.log(courseCategories);
    }, [courseCategories]);



    return (
        <UserDataContext.Provider value={{ CourseDatabase, courseCategories }}>
            {children}
        </UserDataContext.Provider>
    );
};
