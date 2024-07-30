import React, { useState } from 'react'

import "../Assets/CSS/CourseCard.css"

import demo from "../Assets/Image/AWS1.jpg"
import { Rate } from "antd";
import { Box, Button, colors, Popover, Typography } from '@mui/material';



const CourseCard = ({ 
  Course_Name,
  Course_Author,
  Ratings,
  Price,
  NoOfCustomers,
  Image,
  open,
  anchorEl,
  handlePopoverOpen,
  handlePopoverClose,
  loading,
 }) => {

  const ratingValue = isNaN(Ratings) ? 0 : parseFloat(Ratings);
  const formattedNumber = Number(NoOfCustomers).toLocaleString();

  const handleQuizClick = () => {

  }

  //Format the Text
  const capitalize = (str) => {
    try {
      if (!str) {
        return 'Unknown';
      }
      return str.charAt(0).toUpperCase() + str.slice(1);
    } catch (error) {
      console.error("Error in capitalize function:", error);
      return 'Unknown';
    }
  };




  return (
    <>
      <div className="Course-Card-Body" onMouseEnter={handlePopoverOpen} onMouseLeave={handlePopoverClose} >
        <div className='Course-Card-Container'>
          <img className="Course-Card-Product-Image" src={Image} alt="product image" />
        </div>
        <div className='Course-Card-Product-Body'>
          <div style={{ wordWrap: "break-word" }} className='Course-Card-Elements Course-Card-Name'>{Course_Name}</div>
          <div style={{ wordWrap: "break-word" }} className='Course-Card-Elements Course-Card-Author'>{Course_Author} </div>
          <div style={{ wordWrap: "break-word" }} className='Course-Card-Elements Course-Card-Rating'><span style={{ marginRight: "10px",display:loading ? 'none' : 'block' }}>{ratingValue}</span><Rate allowHalf value={ratingValue} disabled /><span style={{ marginLeft: "10px" }}>({formattedNumber})</span></div>
          <div style={{ wordWrap: "break-word" }} className='Course-Card-Elements Course-Card-Price'>₹{Price}</div>
        </div>
      </div>
      <Popover
        id="mouse-over-popover"
        sx={{
          pointerEvents: 'none',
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
        onMouseLeave={handlePopoverClose}
      >
        <Box p={2} sx={{ width: '400px', padding: "15px", backgroundColor: 'white', boxShadow: 3, borderRadius: 1 }} onMouseLeave={handlePopoverClose}>
          <Typography sx={{ fontWeight: "700px", fontSize: "24px", color: "black" }} gutterBottom>
            {Course_Name}
          </Typography>
          <Typography variant="body2" paragraph sx={{ fontSize: "12px", color: "green" }}>
            Updated September 2022
          </Typography>
          <Typography variant="body2" paragraph sx={{ fontSize: "12px", color: "grey" }}>
            {Course_Author}| 26 total hours | All Levels | Subtitles
          </Typography>
          <Typography variant="body2" paragraph sx={{ fontSize: "14px", color: "black" }}>
            Cloud Computing | Web Apps | Linux | Web Servers | DBMS | LAMP Stack | HTML | CSS | JavaScript | PHP | + More Understand the essentials of Local and Wide Area Networks
          </Typography>
          <Typography variant="body2" component="div" sx={{ fontSize: "14px", color: "black" }}>
            <ul>
              <li>Understand the essentials of Local and Wide Area Networks</li>
              <li>Setup a basic network.</li>
              <li>Register a domain name with Domain Privacy</li>
            </ul>
          </Typography>
          {/* <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button  sx={{ backgroundColor: "orange", color: "white",maxWidth:"115px",minWidth:"115px",marginRight:"10px" }} >
              Add to Cart
            </Button>
            <Button  sx={{ backgroundColor: "green", color: "white",maxWidth:"115px",minWidth:"115px"}}>
              Buy Now
            </Button>
          </Box> */}
        </Box>
      </Popover>
    </>

  );
}

export default CourseCard
