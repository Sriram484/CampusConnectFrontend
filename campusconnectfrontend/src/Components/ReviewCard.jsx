import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import { Rate } from 'antd';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import "../Assets/CSS/ReviewCard.css";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import axios from 'axios';
import { useFormData } from './Context/UserData';

const ReviewCard = ({ review }) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [reportReason, setReportReason] = useState('');
    const [reportError, setReportError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { formData } = useFormData();

    const toggleReadMore = () => {
        setIsExpanded(!isExpanded);
    };

    const openDialog = () => {
        setDialogOpen(true);
    };

    const closeDialog = () => {
        setDialogOpen(false);
        setReportReason('');
        setReportError('');
    };

    const handleReportSubmit = async () => {
        if (reportReason.length > 60) {
            setReportError('Reason must be maximum60 characters long.');
            return;
        }

        setIsSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await axios.put(`http://localhost:1010/adminuser/api/reports/${review.userId}`, {
                reportedById: formData.userId, // Adjust if necessary
                reason: reportReason,
                review: review.description,
                reportedPersonId: review.userId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            closeDialog();
        } catch (error) {
            setReportError('Failed to submit report. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='ReviewContainer'>
            <div className='ReviewHeader'>
                <Avatar sx={{ backgroundColor: "black", height: "40px", width: "40px" }} aria-label="avatar">
                    <span style={{ fontSize: "32px" }}>{review.name.charAt(0)}</span>
                </Avatar>
                <div className='ReviewHeaderBody'>
                    <div className='ReviewBodyName'>{review.name}</div>
                    <div className='ReviewBodyRate'>
                        <Rate allowHalf value={3.5} disabled style={{ fontSize: "12px" }} />
                        <div className='ReviewBodyDate'>29 Jan, 2019</div>
                    </div>
                </div>
                <div className='ReviewBodyDots'>
                    <MoreVertIcon onClick={openDialog} />
                </div>
            </div>
            <div className='ReviewBody'>
                {isExpanded ? review.description : review.description.split(' ').slice(0, 60).join(' ') + '...'}
                {review.description.length > 60 &&
                    <button onClick={toggleReadMore} className="read-more-btn">
                        {isExpanded ? 'Read Less' : 'Read More'}
                    </button>
                }
            </div>

            <Dialog open={dialogOpen} onClose={closeDialog}>
                <DialogTitle>Report Abuse</DialogTitle>
                <DialogContent>
                    <TextField
                        label="Reason for Reporting"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        value={reportReason}
                        onChange={(e) => setReportReason(e.target.value)}
                        helperText={reportError}
                        error={!!reportError}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={closeDialog} disabled={isSubmitting}>
                        Cancel
                    </Button>
                    <Button onClick={handleReportSubmit} variant="contained" color="primary" disabled={isSubmitting}>
                        Submit Report
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ReviewCard;
