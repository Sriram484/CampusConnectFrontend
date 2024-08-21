import { Accordion, AccordionDetails, AccordionSummary, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

import "../Assets/CSS/CourseCardMainBody.css"
import { Rate } from 'antd'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AccordionActions from '@mui/material/AccordionActions';

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import MobileFriendlyIcon from '@mui/icons-material/MobileFriendly';
import DeviceHubIcon from '@mui/icons-material/DeviceHub';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import ArticleIcon from '@mui/icons-material/Article';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import VideoSettingsIcon from '@mui/icons-material/VideoSettings';

import deo1 from "../Assets/Image/service-icon-01.png";
import deo2 from "../Assets/Image/service-icon-02.png";
import deo3 from "../Assets/Image/service-icon-03.png";
import { CourseMainBodyLikeThisCardResponsive, responsiveReview } from '../Carousel/HomeCardResponsive';
import Carousel from 'react-multi-carousel';
import HomeCard from './HomeCard';
import ReviewCard from './ReviewCard';
import CourseCard from './CourseCard';
import CourseMainBodyLikeThisCard from './CourseMainBodyLikeThisCard';
import { useLocation } from 'react-router';
import { useCourseData } from './Context/CourseData';
import axios from 'axios';

import Lottie from "lottie-react"
import NoReview from "../Assets/Lottie/NoReview.json"
import { useFormData } from './Context/UserData';



const getRandomTime = () => `${Math.floor(Math.random() * 20)}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`;







const CourseCardMainBody = (props) => {
  
  const location = useLocation();
  const { courseObject } = location.state || {};
  const { CourseDatabase } = useCourseData();
  const currentMoreItems = CourseDatabase[courseObject.category];
  const { formData, setFormData } = useFormData();
  
  console.log(currentMoreItems);
  console.log(courseObject);
  console.log(location);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);
  const totalLectureCount = courseObject.sections.reduce((total, section) => total + section.lectures.length, 0);
  
  const handleEnroll = async () => {
    try {
        const token = localStorage.getItem('token');
        await axios.post(
            `http://localhost:1010/adminuser/courses/${courseObject.id}/enroll`,
            {},
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        );
        // Update formData's enrolledCourseIds
        setFormData(prevFormData => ({
          ...prevFormData,
          enrolledCourseIds: [
              ...(Array.isArray(prevFormData.enrolledCourseIds) ? prevFormData.enrolledCourseIds : []),
              courseObject.id
          ]
      }));
        alert('Successfully enrolled in the course!');
    } catch (error) {
        console.error('Error enrolling in course:', error);
        alert('Failed to enroll in the course.');
    }
};
  
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`http://localhost:1010/adminusers/reviews/course/${courseObject.id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setReviews(response.data);
      } catch (err) {
        setError(err.message);
      }
    };

    if (courseObject?.id) {
      fetchReviews();
    }
  }, [courseObject]);

  useEffect(() => {
    console.log(reviews);

  }, [reviews])

  console.log(reviews);

  const sanitizedDescription = courseObject.description.replace(/<p>/g, '<p style="color:black;">');

  const addCourseToCart = async (courseId) => {
    const token = localStorage.getItem("token");

    try {
      
        const response = await axios.post(
            "http://localhost:1010/adminuser/cart/add",
            null,  // No request body required as we are using query params
            {
                params: {
                    courseId: courseObject.id
                },
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            }
        );

        console.log(response.data);  // Success message
        alert("Course added to cart successfully.");
    } catch (error) {
        console.error("Error adding course to cart:", error.response.data);
        alert("Error adding course to cart: " + error.response.data);
    }
};


  return (
    <div className='CourseMainSuperContainer'>
      <div className='CourseMainBodyContainer'>
        <div className='CourseCardMainBody-Image'>
          <img src={courseObject.courseImage} alt="" />
        </div>
        <div className='CourseCardMainBody-Header'>
          <div className='CourseMainHeader-MainHeading'>{courseObject.title}</div>
          <div
            className='CourseMainHeader-SubHeading'
            dangerouslySetInnerHTML={{ __html: sanitizedDescription }}
            style={{ color: "black" }}
          ></div>
          <div className='CourseMainHeader-Ratings'>
            <span>4.4 <Rate allowHalf value={4.4} disabled /></span>
            <span>16,189 Reviews</span>
            <span>{courseObject.enrolledUserIds.length} students</span>

          </div>
          <div className='CourseMainHeader-CreatedBy'>Created By <span>Star-Tech-Academy</span></div>
          <div className='CourseMainHeader-Language'>
            <ul className='CourseMainHeader-Lister'>
              <li className='CourseMainHeader-ListItem'>Last updated 5/2024</li>
              <li className='CourseMainHeader-ListItem'>Audio:- {courseObject.audioLanguages.join(', ')}</li>
              <li className='CourseMainHeader-ListItem'>Subtitle:- {courseObject.subtitleLanguages.join(', ')}</li>
            </ul>
          </div>
          <div className='CourseMainHeader-PriceTag'>Price:- {courseObject.priceTier} {courseObject.currency} <span className='CourseMainHeader-PriceTagDuplicate'>2399 {courseObject.currency}</span></div>
          <div className='CourseMainHeader-AddToCart'>
            <Button
              sx={{
                width: "120px",
                backgroundColor: "orange",
                margin: "10px",
                marginLeft: "0px",
                color: "#fff",
                '&:hover': {
                  backgroundColor: "darkorange" // Darker shade of orange for hover
                },
                '&:focus': {
                  backgroundColor: "darkorange" // Darker shade of orange for focus
                }
              }}
              onClick={() => addCourseToCart(123)} 
            >
              Add to Cart
            </Button>

            <Button
              sx={{
                width: "120px",
                backgroundColor: "green",
                margin: "10px",
                color: "#fff",
                '&:hover': {
                  backgroundColor: "darkgreen" // Darker shade of green for hover
                },
                '&:focus': {
                  backgroundColor: "darkgreen" // Darker shade of green for focus
                }
              }}
              onClick={handleEnroll}
            >
              Buy Now
            </Button>


          </div>
        </div>

        <div className='CourseCardMainBody-WhatYouLearn'>
          <div className='CourseCardMainBody-WhatYouLearn-Headers'>What you'll learn</div>
          <div className='CourseCardMainBody-WhatYouLearn-Body'>
            <ul>
              {courseObject.learningObjectives.map((objective, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: objective.replace(/<p>/g, '<p style="color:black;">') }}></li>
              ))}
            </ul>
          </div>
        </div>
        <div className='CourseCardMainBody-Topics'>
          <div className='CourseTopic-Header'>
            Explore related topics
          </div>
          <div className='CourseTopic-Body'>
            {courseObject.subCategories.map((subCategory, index) => (
              <Button
                key={index}
                sx={{ border: "1px solid black", color: "black", minHeight: "56px" }}
              >
                {subCategory}
              </Button>
            ))}
          </div>
        </div>
        <div className='CourseCardMainBody-CourseIncludes'>
          <div className='CourseInclude-Headers'>
            This Course Includes:
          </div>
          <div className='CourseInclude-Body'>

            {
              courseObject.totalHours &&

              <div className='CourseInclude-BodyDiv'><OndemandVideoIcon />{courseObject.totalHours} hours on-demand video</div>
            }

            {
              courseObject.numberOfExercises &&

              <div className='CourseInclude-BodyDiv'><DeviceHubIcon />{courseObject.numberOfExercises} coding exercises</div>
            }

            {
              courseObject.numberOfArticles &&

              <div className='CourseInclude-BodyDiv'><ArticleIcon />{courseObject.numberOfArticles} articles</div>
            }

            {
              courseObject.numberOfResources &&

              <div className='CourseInclude-BodyDiv'><DownloadIcon />{courseObject.numberOfResources} downloadable resources</div>
            }
            {courseObject.includesMobileAccess &&
              courseObject.includesMobileAccess === true &&

              <div className='CourseInclude-BodyDiv'><MobileFriendlyIcon />Access on mobile and TV</div>
            }
            {courseObject.fullLifetimeAccess &&
              courseObject.fullLifetimeAccess === true &&

              <div className='CourseInclude-BodyDiv'><AllInclusiveIcon />Full lifetime access</div>
            }
            {courseObject.certificateOfCompletion &&
              courseObject.certificateOfCompletion === true &&

              <div className='CourseInclude-BodyDiv'><EmojiEventsIcon />Certificate of completion</div>
            }
          </div>
        </div>
        <div className='CourseCardMainBody-CourseContent'>
          <div className='CourseContent-Headers'>
            Course Content
          </div>
          <div className='CourseContent-Time'>
            <div>{courseObject.sections.length} section</div>
            <div>{totalLectureCount} lectures</div>
            {/* <div>7h 34m Total Length</div> */}
          </div>
          <div className='CourseContent-Body'>
            {courseObject.sections.map((section, sectionIndex) => (
              <Accordion key={sectionIndex}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${sectionIndex + 1}-content`}
                  id={`panel${sectionIndex + 1}-header`}
                >
                  <div className='AccordionHeaderBody'>
                    <div className='AccordionHeaders'>{section.title}</div>
                    <div className='AccordionLectureLength'>{section.lectures.length} lectures</div>
                  </div>
                </AccordionSummary>
                <AccordionDetails>
                  <div className='AccordionBody'>
                    {section.lectures.map((lecture, lectureIndex) => (
                      <div className='AccordionBodyElement' key={lectureIndex} style={{ width: '100%' }}>
                        <div className='AccordionBodyElementHeader' style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                          <div style={{ display: 'flex', alignItems: 'center' }}>
                            {lecture.contents[0]?.type === 'Video' ? (
                              <VideoSettingsIcon />
                            ) : (
                              <ArticleIcon />
                            )}
                            <div className='AccordionBodyElementHeaderTitle' style={{ marginLeft: '8px' }}>
                              {lecture.title}
                            </div>
                          </div>
                          <div className='AccordionBodyElementTime'>
                            {getRandomTime()}
                          </div>
                        </div>

                      </div>
                    ))}

                  </div>
                </AccordionDetails>
              </Accordion>
            ))}

          </div>
        </div>
        <div className='CourseCardMainBody-CourseRequirements'>
          <div className='CourseRequirementsHeaders'>
            Requirements
          </div>
          <div className='CourseRequirementsBody'>
            <ul>
              {courseObject.requirements.map((requirement, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: requirement.replace(/<p>/g, '<p style="color:black;">') }}></li>
              ))}
            </ul>
          </div>
        </div>
        {/* <div className='CourseCardMainBody-CourseInstructorNotes'>

        </div> */}
        <div className='CourseCardMainBody-CourseReviews'>
          <div className='CourseReviews-Headers'>
            Reviews
          </div>
          <div className='CourseReviews-Body'>
            {reviews.length > 0 ? (
              <Carousel
                responsive={responsiveReview}
                arrows={false}
                autoPlay={false}
                autoPlaySpeed={5000}
                infinite={true}
              >
                {reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
              </Carousel>
            ) : (
              <Lottie animationData={NoReview} style={{ width: 300, height: 300 }} />
            )}
          </div>
        </div>
        <div className='CourseCardMainBody-CourseMoreLikeThis'>
          <div className='CourseMoreLikeThis-Headers'>
            More Like This
          </div>
          <div className='CourseMoreLikeThis-Body'>

            <Carousel responsive={CourseMainBodyLikeThisCardResponsive} className='CourseCardListerBody'>

              {currentMoreItems ? (
                currentMoreItems.map((course, index) => {
                  // Debugging: Log each course to check its structure
                  console.log('Course:', course);

                  return (
                    <CourseMainBodyLikeThisCard
                      key={index}
                      Course_Name={course.title || 'No Title'}
                      Course_Author={"Puli"}
                      Ratings={"5"}
                      Price={course.priceTier || 'Free'}
                      NoOfCustomers={course.enrolledUserIds ? course.enrolledUserIds.length : 0}
                      Image={course.courseImage || "../Assets/Image/service-icon-01.png"}
                    />
                  );
                })
              ) : (
                <div>No items to display</div>
              )}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCardMainBody
