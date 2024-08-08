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

import deo1 from "../Assets/Image/service-icon-01.png";
import deo2 from "../Assets/Image/service-icon-02.png";
import deo3 from "../Assets/Image/service-icon-03.png";
import { CourseMainBodyLikeThisCardResponsive, responsiveReview } from '../Carousel/HomeCardResponsive';
import Carousel from 'react-multi-carousel';
import HomeCard from './HomeCard';
import ReviewCard from './ReviewCard';
import CourseCard from './CourseCard';
import CourseMainBodyLikeThisCard from './CourseMainBodyLikeThisCard';


let customerReviews = [
  {
    id: 1,
    name: "Karthick",
    date: "March 2023",
    comment: "Impressive service",
    description:
      "Polar Portal sets a high standard with their impeccable service and attention to detail. Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo1,
  },
  {
    id: 2,
    name: "Dharneesh",
    date: "April 2022",
    comment: "Exceptional experience",
    description:
      "Choosing Polar Portal was a wise decision. Their expertise and dedication to customer  Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo2,
  },
  {
    id: 3,
    name: "Rokhithran",
    date: "June 2021",
    comment: "Reliable partner",
    description:
      "Polar Portal proved to be a reliable partner in our steel procurement. Their service  Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo3,
  },
  {
    id: 4,
    name: "Ram",
    date: "August 2020",
    comment: "Top-notch service",
    description:
      "I had an outstanding experience with Polar Portal. Their service was top-notch, from  Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo1,
  },
  {
    id: 5,
    name: "Krishna",
    date: "October 2019",
    comment: "Exceptional quality",
    description:
      "Polar Portal provided exceptional quality and service throughout our partnership. Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo2,
  },
  {
    id: 6,
    name: "Ram",
    date: "January 2024",
    comment: "Highly recommended",
    description:
      "Polar Portal stands out for their superior service and product quality. They Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo3,
  },
  {
    id: 7,
    name: "Muthuvel",
    date: "May 2023",
    comment: "Excellent service",
    description:
      "Choosing Polar Portal was the best decision for our project. They provided Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo1,
  },
  {
    id: 8,
    name: "Gautham",
    date: "July 2022",
    comment: "Professionalism at its best",
    description:
      "Polar Portal exemplifies professionalism and reliability in every aspect Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo2,
  },
  {
    id: 9,
    name: "Sanjay",
    date: "September 2021",
    comment: "Outstanding performance",
    description:
      "Polar Portal delivered outstanding performance and service quality through Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo3,
  },
  {
    id: 10,
    name: "Puli Pandi",
    date: "December 2020",
    comment: "Impressive results",
    description:
      "Our experience with Polar Portal was nothing short of impressive. They offered Polar Portal sets a high standard with their impeccable service and attention to detail.",
    image: deo1,
  },
];


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


const CourseCardMainBody = () => {

  return (
    <div className='CourseMainSuperContainer'>
      <div className='CourseMainBodyContainer'>
        <div className='CourseCardMainBody-Path'>
          {`Development > Data Science > Regression Analysis`}
        </div>
        <div className='CourseCardMainBody-Image'>
          <img src="https://img-c.udemycdn.com/course/240x135/625204_436a_3.jpg" alt="" />
        </div>
        <div className='CourseCardMainBody-Header'>
          <div className='CourseMainHeader-MainHeading'>Complete Linear Regression Analysis in Python</div>
          <div className='CourseMainHeader-SubHeading'>Linear Regression in Python| Simple Regression, Multiple Regression, Ridge Regression, Lasso and
            subset selection also</div>
          <div className='CourseMainHeader-Ratings'>
            <span>4.4 <Rate allowHalf value={4.4} disabled /></span>
            <span>16,189 Reviews</span>
            <span>168,108 students</span>

          </div>
          <div className='CourseMainHeader-CreatedBy'>Created By <span>Star-Tech-Academy</span></div>
          <div className='CourseMainHeader-Language'>
            <ul className='CourseMainHeader-Lister'>
              <li className='CourseMainHeader-ListItem'>Last updated 5/2024</li>
              <li className='CourseMainHeader-ListItem'>English</li>
              <li className='CourseMainHeader-ListItem'>English</li>
            </ul>
          </div>
          <div className='CourseMainHeader-PriceTag'>Price:- $499 <span className='CourseMainHeader-PriceTagDuplicate'>$2399</span></div>
          <div className='CourseMainHeader-AddToCart'>
            <Button sx={{
              width: "120px", backgroundColor: "orange", margin: "10px", marginLeft: "0px",
              color: "#fff"
            }}>Add to Cart</Button>
            <Button sx={{
              width: "120px", backgroundColor: "green", margin: "10px",
              color: "#fff"
            }}>Buy Now</Button>
            {/* <FavoriteBorderIcon sx={{ color: "black", fontSize: "40px" }} />     //WishList
            <FavoriteIcon sx={{ color: "red", fontSize: "40px" }} /> */}
          </div>
        </div>
        <div className='CourseCardMainBody-ButtonTypes'>
          <div className='CourseMainBody-TypeHeaders'>
            <div className='CourseMainBody-TypeHeadersActive'>Coupon</div>
            <div>Share</div>
            <div>Gift</div>
          </div>
          <div className='CourseMainBody-CouponBody'>
            <TextField id="outlined-basic" label="Enter the Coupon" variant="outlined" sx={{ width: "80%" }} />
            <Button sx={{ width: "20%", backgroundColor: "black", color: "#fff", minHeight: "56px" }}>Submit</Button>
          </div>
        </div>
        {/* <div className='CourseCardMainBody-Subscriptions'>

         </div> */}
        <div className='CourseCardMainBody-WhatYouLearn'>
          <div className='CourseCardMainBody-WhatYouLearn-Headers'>What you'll learn</div>
          <div className='CourseCardMainBody-WhatYouLearn-Body'>
            <ul>
              <li>Learn how to solve real life problem using the Linear Regression technique</li>
              <li>Preliminary analysis of data using Univariate and Bivariate analysis before running Linear regression</li>
              <li>Predict future outcomes basis past data by implementing Simplest Machine Learning algorithm</li>
              <li>Understand how to interpret the result of Linear Regression model and translate them into actionable insight</li>
              <li>Understanding of basics of statistics and concepts of Machine Learning</li>
              <li>Indepth knowledge of data collection and data preprocessing for Machine Learning Linear Regression problem</li>
            </ul>
          </div>
        </div>
        <div className='CourseCardMainBody-Topics'>
          <div className='CourseTopic-Header'>
            Explore related topics
          </div>
          <div className='CourseTopic-Body'>
            <Button sx={{ border: "1px solid black", color: "black", minHeight: "56px" }}>Regression Analysis</Button>
            <Button sx={{ border: "1px solid black", color: "black", minHeight: "56px" }}>Development</Button>
            <Button sx={{ border: "1px solid black", color: "black", minHeight: "56px" }}>Data Science</Button>
          </div>
        </div>
        <div className='CourseCardMainBody-CourseIncludes'>
          <div className='CourseInclude-Headers'>
            This Course Includes:
          </div>
          <div className='CourseInclude-Body'>

            <div className='CourseInclude-BodyDiv'><OndemandVideoIcon />7.5 hours on-demand video</div>
            <div className='CourseInclude-BodyDiv'><DeviceHubIcon />5 coding exercises</div>
            <div className='CourseInclude-BodyDiv'><ArticleIcon />18 articles</div>
            <div className='CourseInclude-BodyDiv'><DownloadIcon />35 downloadable resources</div>
            <div className='CourseInclude-BodyDiv'><MobileFriendlyIcon />Access on mobile and TV</div>
            <div className='CourseInclude-BodyDiv'><AllInclusiveIcon />Full lifetime access</div>
            <div className='CourseInclude-BodyDiv'><EmojiEventsIcon />Certificate of completion</div>

          </div>
        </div>
        <div className='CourseCardMainBody-CourseContent'>
          <div className='CourseContent-Headers'>
            Course Content
          </div>
          <div className='CourseContent-Time'>
            <div>10 section</div>
            <div>78 lectures</div>
            <div>7h 34m Total Length</div>
          </div>
          <div className='CourseContent-Body'>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

              >
                <div className='AccordionHeaderBody'>
                  <div className='AccordionHeaders'>Introduction</div>
                  <div className='AccordionTime'>4 lectures</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className='AccordionBody'>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <ArticleIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Machine Learning Basics</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

              >
                <div className='AccordionHeaderBody'>
                  <div className='AccordionHeaders'>Introduction</div>
                  <div className='AccordionTime'>4 lectures</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className='AccordionBody'>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <ArticleIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Machine Learning Basics</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

              >
                <div className='AccordionHeaderBody'>
                  <div className='AccordionHeaders'>Introduction</div>
                  <div className='AccordionTime'>4 lectures</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className='AccordionBody'>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <ArticleIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Machine Learning Basics</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"

              >
                <div className='AccordionHeaderBody'>
                  <div className='AccordionHeaders'>Introduction</div>
                  <div className='AccordionTime'>4 lectures</div>
                </div>
              </AccordionSummary>
              <AccordionDetails>
                <div className='AccordionBody'>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <ArticleIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Machine Learning Basics</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                  <div className='AccordionBodyElement'>
                    <div className='AccordionBodyElementHeader'>
                      <CodeIcon />
                      <div className='AccordionBodyElementHeaderTitle'>Welcome To Machine Learning</div>
                    </div>
                    <div className='AccordionBodyElementTime'>
                      02.28
                    </div>
                  </div>
                </div>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className='CourseCardMainBody-CourseRequirements'>
          <div className='CourseRequirementsHeaders'>
            Requirements
          </div>
          <div className='CourseRequirementsBody'>
            <ul>
              <li>Students will need to install Python and Anaconda software
                but we have a separate lecture to help you install the same</li>

              <li>Students will need to install Python and Anaconda software
                but we have a separate lecture to help you install the same</li>

              <li>Students will need to install Python and Anaconda software
                but we have a separate lecture to help you install the same</li>

              <li>Students will need to install Python and Anaconda software
                but we have a separate lecture to help you install the same</li>

              <li>Students will need to install Python and Anaconda software
                but we have a separate lecture to help you install the same</li>

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
            <Carousel
              responsive={responsiveReview}
              arrows={false}
              autoPlay={false}
              autoPlaySpeed={5000}
              infinite={true}
            >
              {customerReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </Carousel>
          </div>
        </div>
        <div className='CourseCardMainBody-CourseMoreLikeThis'>
          <div className='CourseMoreLikeThis-Headers'>
            More Like This
          </div>
          <div className='CourseMoreLikeThis-Body'>
            <Carousel responsive={CourseMainBodyLikeThisCardResponsive} className='CourseCardListerBody'>

              {computerCourse.map((course, index) => (
                <CourseMainBodyLikeThisCard
                  key={index}
                  Course_Name={course.Course_Name}
                  Course_Author={course.Course_Author}
                  Ratings={course.Ratings}
                  Price={course.Price}
                  NoOfCustomers={course.NoOfCustomers}
                  Image={course.Image}
                />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseCardMainBody
