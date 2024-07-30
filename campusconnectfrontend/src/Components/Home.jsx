import React, { useEffect, useState } from "react";
import BgVideo from "../Assets/Video/course-video.mp4";
import "../Assets/CSS/Home.css";
import { responsive } from "../Carousel/HomeCardResponsive";
import Carousel from "react-multi-carousel";
import HomeCard from "./HomeCard";
import deo1 from "../Assets/Image/service-icon-01.png";
import deo2 from "../Assets/Image/service-icon-02.png";
import deo3 from "../Assets/Image/service-icon-03.png";
import NavBar from "./Navbar";
import About from "./About";
import Course from "./Course";

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

const Home = () => {
  const [hiddenElements, setHiddenElements] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    });

    const elements = document.querySelectorAll(".hidden");
    elements.forEach((el) => observer.observe(el));

    setHiddenElements(elements);

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // Dynamically import the CSS for the carousel
    const loadCarouselCss = async () => {
      await import("react-multi-carousel/lib/styles.css");
      setIsLoaded(true);
    };

    // Delay to ensure the carousel is rendered before adding hidden class
    const timeout = setTimeout(() => {
      loadCarouselCss();
    }, 10); // Adjust delay as needed
    return () => clearTimeout(timeout);
  }, []);
  
  return (
    <>
    <div className="Home-Container" id="home">
 
      <video autoPlay loop muted playsInline className="background-video">
        <source src={BgVideo} type="video/mp4" width="100vw" height="100vh" />
        Your browser does not support the video tag.
      </video>

      <div className="Home-Content">
        <div className="Home-Title">Welcome to Campus Connect</div>
        <div className="Home-Description">
          <p>
            Welcome to Campus Connect, where you can explore a wide range of
            courses at NIIT Pvt Ltd. Discover detailed course information,
            including topics covered, expert instructors, flexible durations,
            and affordable pricing.{" "}
            <span className="Home-NoMobile">
              Our user-friendly platform helps you choose the right course to
              enhance your skills and advance your career.
            </span>
          </p>

          <button className="Home-Join-Button">Join Us Now!</button>
        </div>
        <div className="Home-Card-Container">
          <div className="Card-Body">
            <Carousel
              responsive={responsive}
              arrows={false}
              autoPlay={true}
              autoPlaySpeed={5000}
              infinite={true}
            >
              {customerReviews.map((review) => (
                <HomeCard key={review.id} review={review} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default Home;
