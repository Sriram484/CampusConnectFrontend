import React, { useEffect, useState } from 'react';
import "../Assets/CSS/AddToCart.css";
import { Button } from '@mui/material';
import { Rate } from 'antd';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import axios from 'axios';
import Lottie from "lottie-react";
import Empty from "../Assets/Lottie/Empty.json";

const AddToCart = () => {
    const [cartData, setCartData] = useState(null);
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCartData = async () => {
            try {
                const token = localStorage.getItem("token");
                const response = await axios.get('http://localhost:1010/adminuser/cart', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setCartData(response.data);
                await fetchCourses(response.data.courseIds);
            } catch (err) {
                setError(err.message);
            }
        };

        const fetchCourses = async (courseIds) => {
            try {
                const token = localStorage.getItem("token");
                const courseRequests = courseIds.map(id =>
                    axios.get(`http://localhost:1010/public/courses/${id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                );
                const responses = await Promise.all(courseRequests);
                const coursesData = responses.map(response => response.data);
                setCourses(coursesData);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchCartData();
    }, []);

    useEffect(() => {
        console.log(cartData);
    }, [cartData]);

    useEffect(() => {
        console.log(courses);
    }, [courses]);

    return (
        <div className='AddToCart-Container' style={{ marginTop: "80px" }}>
            <div className='AddToCartLeft-Header'>
                Shopping Cart
            </div>

            {error && <div className='error-message'>Error: {error}</div>}

            {courses && courses.length > 0 ? (
                <div className='AddToCart-Body'>
                    <div className='AddToCart-BodyLeft'>
                        <div className='AddToCart-BodyLeftHeader'>
                            {courses.length} Course{courses.length > 1 ? 's' : ''} in Cart
                        </div>
                        {courses.map(course => (
                            <div key={course.id} className='AddToCart-MainBodyLeft'>
                                <div className='AddToCart-MainBodyLeft-Pic'>
                                    <img src={course.courseImage} alt={course.title} />
                                </div>
                                <div className='AddToCart-MainBodyLeft-Body'>
                                    <div className='AddToCart-MainBodyLeft-Header'>
                                        {course.title}
                                    </div>
                                    <div className='AddToCart-MainBodyLeft-Author'>
                                        By Sundog Education by Frank Kane
                                    </div>
                                    <div className='AddToCart-MainBodyLeft-Author'>
                                        <span style={{ marginRight: "10px", fontSize: "14px", fontWeight: "700" }}>{4.5}</span>
                                        <Rate allowHalf value={4.5} disabled style={{ fontSize: "12px" }} />
                                        <span style={{ marginLeft: "10px", fontSize: "12px", fontWeight: "400", color: "rgb(106, 111, 115)" }}>(13,145)</span>
                                    </div>
                                    <div className='AddToCart-MainBodyLeft-Extras'>
                                        {course.totalHours} total hours | All Levels | Subtitles
                                    </div>
                                    <div className='AddToCart-MainBodyLeft-Buttons'>
                                        <Button sx={{ fontSize: "14px", color: "rgb(161, 44, 48)", paddingLeft: "0px" }}>Remove</Button>
                                        <Button sx={{ fontSize: "14px", color: "rgb(161, 44, 48)" }}>Move to WishList</Button>
                                    </div>
                                </div>
                                <div className='AddToCart-Price'>
                                    {course.priceTier} ({course.currency})
                                    <LocalOfferIcon style={{ color: "rgb(161, 44, 48)" }} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className='AddToCart-BodyRight'>
                        <div className='AddToCartRight-Header'>
                            <div className='AddToCart-Total'>
                                Total
                            </div>
                            <div className='AddToCart-TotalAmount'>
                                {courses.reduce((total, course) => total + parseInt(course.numberOfResources, 10), 0)} ({courses[0].currency})
                            </div>
                        </div>
                        <div className='AddToCart-Body'>
                            <Button sx={{ width: "100%", backgroundColor: 'rgb(161, 44, 48)', color: "#fff" }}>
                                CheckOut
                            </Button>
                        </div>
                    </div>
                </div>
            ) : (
                <div style={{ maxHeight: "300px", display: "flex",  justifyContent: "left" }}>
                <Lottie
                    animationData={Empty}
                    style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                />
            </div>
            )}
        </div>
    );
};

export default AddToCart;
