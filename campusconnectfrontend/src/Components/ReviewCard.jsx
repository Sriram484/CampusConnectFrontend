import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import { Rate } from 'antd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../Assets/CSS/ReviewCard.css"
import { Popover } from '@mui/material';

const ReviewCard = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const text = `
      That one was quite a journey! It started as preparation for TensorFlow Developer Certificate but 
      due to various reasons took way longer than expected and in the meantime, they shut down the TF 
      certificate program :) Considering code written, rewritten and additional materials checked I think 
      I spent around 100h on that. Nevertheless, this was time well spent! The course is extensive and really 
      starts from the basics. It goes from basic examples of regression and classification tasks to end up with 
      giving a good introduction to ANN applications to industry-relevant problems like Computer Vision, Transfer 
      Learning, Natural Language Processing, and Time Series modeling.
    `;

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleReviewDotClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;
    return (
        <div className='ReviewContainer'>
            <div className='ReviewHeader'>
                <Avatar sx={{ backgroundColor: "black", height: "40px", width: "40px" }} aria-label="avatar">
                    <span style={{ fontSize: "32px" }}>A</span>
                </Avatar>
                <div className='ReviewHeaderBody'>
                    <div className='ReviewBodyName'>Demo</div>
                    <div className='ReviewBodyRate'>
                        <Rate allowHalf value={3.5} disabled
                            style={{ fontSize: "12px" }} />
                        <div className='ReviewBodyDate'>29 Jan, 2019</div>
                    </div>
                </div>
                <div className='ReviewBodyDots' onMouseEnter={handleReviewDotClick} onMouseLeave={handleClose}>
                    <MoreVertIcon />
                    <Popover
                        id={id}
                        open={open}
                        anchorEl={anchorEl}
                        onClose={handleClose}
                        anchorOrigin={{
                            vertical: 'center',
                            horizontal: 'center',
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                    >
                        Report Abuse
                    </Popover>
                </div>
            </div>
            <div className='ReviewBody'>
                {isExpanded ? text : text.split(' ').slice(0, 60).join(' ') + '...'}
                <button onClick={toggleReadMore} className="read-more-btn">
                    {isExpanded ? 'Read Less' : 'Read More'}
                </button>
            </div>
        </div>
    )
}

export default ReviewCard
