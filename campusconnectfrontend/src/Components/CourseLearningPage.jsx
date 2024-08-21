import React, { useState } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, List, ListItem, ListItemButton, Button, TextField } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ReactPlayer from 'react-player';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles
import "../Assets/CSS/CourseLearningPage.css";
import { courseContent } from './CourseBuilderStructurePage/HelperFunction';
import { Rate } from 'antd'; // Import Ant Design Rate component
import 'antd/dist/reset.css'; // Import Ant Design CSS
import { useLocation } from 'react-router';
import axios from 'axios';

// Custom CSS to hide scrollbars
const hideScrollbar = {
    '&::-webkit-scrollbar': {
        display: 'none',
    },
    scrollbarWidth: 'none', // For Firefox
    msOverflowStyle: 'none', // For Internet Explorer and Edge
};

const CourseLearningPage = () => {
    const location = useLocation();
    const { course } = location.state || {};
    console.log(course);

    // State to hold the selected content
    const [selectedContent, setSelectedContent] = useState(null);
    // State to manage review input
    const [review, setReview] = useState("");
    // State to manage rating
    const [rating, setRating] = useState(0);
    // State to manage review submission status
    const [reviewSubmitted, setReviewSubmitted] = useState(false);

    // Handle review submission
    const handleReviewSubmit = async () => {
        try {
            const token = localStorage.getItem('token'); // Get the token from local storage
            const reviewRequest = {
                courseId: course.id, // Assuming you have the course ID available
                rating: rating,
                description: review
            };

            // Send the review to the backend
            await axios.post(
                'http://localhost:1010/adminusers/reviews/add', // Replace with your backend endpoint
                reviewRequest,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            console.log("Review submitted:", review);
            console.log("Rating submitted:", rating);

            // Update the status after submission
            setReviewSubmitted(true);
            setReview("");
            setRating(0);
        } catch (error) {
            console.error('Error submitting review:', error);
            alert('Failed to submit the review.');
        }
    };
    console.log(selectedContent);
    const demoBody = `<h2>Welcome to the Course!</h2>
    <p>This course will provide a comprehensive overview of artificial intelligence (AI), laying the groundwork for more 
    advanced topics that will be covered later. AI is a broad and fast-evolving field that impacts various aspects of 
    modern life. From personal assistants like Siri and Alexa to advanced applications in healthcare and finance, AI is 
    everywhere. In this introductory section, we will explore the fundamental concepts of AI, its history, and its potential 
    future.</p>

    <h3>What is Artificial Intelligence?</h3>
    <p>Artificial intelligence refers to the simulation of human intelligence in machines that are designed to think and act 
    like humans. The concept of AI encompasses a range of technologies that enable machines to perform tasks that typically 
    require human intelligence, such as learning, problem-solving, and decision-making. AI can be categorized into three types:</p>
    <ul>
      <li><strong>Narrow AI:</strong> Also known as weak AI, this type is designed to perform a narrow task, such as facial 
      recognition or internet searches. Narrow AI is currently the most common form of AI.</li>
      <li><strong>General AI:</strong> Also known as strong AI, this type aims to be as intelligent as a human across all tasks. 
      General AI remains largely theoretical at this stage.</li>
      <li><strong>Superintelligent AI:</strong> This hypothetical form of AI surpasses human intelligence and could potentially 
      outperform humans in every aspect.</li>
    </ul>

    <h3>The History of AI</h3>
    <p>AI has its roots in the mid-20th century when mathematicians and scientists began exploring the possibility of creating 
    machines that could think. Key milestones include:</p>
    <ul>
      <li><strong>1950:</strong> Alan Turing introduced the concept of the Turing Test to evaluate a machine's ability to exhibit 
      intelligent behavior.</li>
      <li><strong>1956:</strong> The term "Artificial Intelligence" was coined by John McCarthy during the Dartmouth Conference, 
      which is considered the birthplace of AI as a field of study.</li>
      <li><strong>1980s:</strong> The rise of expert systems, which were AI programs designed to simulate the decision-making 
      ability of a human expert.</li>
      <li><strong>2000s-Present:</strong> The advent of machine learning, big data, and deep learning has propelled AI to new 
      heights, leading to advancements in fields like natural language processing and computer vision.</li>
    </ul>

    <h3>Applications of AI</h3>
    <p>AI is being used in various industries to enhance efficiency, improve decision-making, and create new opportunities. 
    Some key applications include:</p>
    <ul>
      <li><strong>Healthcare:</strong> AI is used for diagnostic purposes, personalized treatment plans, and drug discovery.</li>
      <li><strong>Finance:</strong> AI powers algorithmic trading, fraud detection, and personalized financial advice.</li>
      <li><strong>Transportation:</strong> AI is integral to the development of autonomous vehicles and traffic management 
      systems.</li>
      <li><strong>Retail:</strong> AI enhances customer experiences through personalized recommendations and inventory 
      management.</li>
    </ul>

    <p>As we delve into the more technical aspects of AI in the following sections, it is important to keep these foundational 
    concepts in mind. This will provide context and help you understand the broader implications of the technology as it continues 
    to evolve.</p>`


    return (
        <div className='CourseLearningPage' style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column', marginTop: "90px", marginLeft: "10px" }}>
            <Box sx={{
                display: 'flex',
                flex: 1,
                flexDirection: { xs: 'column', md: 'row' },
                width: { xs: '95vw', md: '100%' } // Full width on small screens, default width on larger screens
            }}>
                {/* Main Content Container */}
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: { xs: '95vw', md: '75%' }, // Full width on small screens, 75% width on larger screens
                    marginRight: { xs: 0, md: 2 }, // Remove right margin on small screens
                    overflow: 'hidden',
                    flex: 1
                }}>
                    {/* Main Content Area */}
                    <Box sx={{
                        overflowY: 'auto',
                        flex: 1,
                        ...hideScrollbar,
                        maxHeight: '50vh',
                        minHeight: "50vh",
                        width: '100%' // Ensure full width
                    }}>
                        {selectedContent && (
                            <div>
                                {/* Display content based on the selected lecture */}
                                <Typography variant="h6">{selectedContent.title}</Typography>
                                {selectedContent.contents.map((content, contentIndex) => (
                                    <div key={contentIndex}>
                                        {course.id === 1 && content.type === 'Document' ? (
                                            <div dangerouslySetInnerHTML={{ __html: demoBody }} />
                                        ) : (
                                            content.type === 'Document' && (
                                                <div dangerouslySetInnerHTML={{ __html: content.data }} />
                                            )
                                        )}
                                        {content.type === 'Video' && (
                                            <ReactPlayer
                                                url={"https://www.youtube.com/watch?v=e_EQ0_33VxM"}
                                                controls
                                                width="50vw"
                                                height="50vh"
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </Box>
                </Box>

                {/* Right Sidebar with Accordion */}
                <Box sx={{
                    width: { xs: '95vw', md: '25%' }, // Full width on small screens, 25% width on larger screens
                    maxHeight: '50vh',
                    overflowY: 'auto',
                    borderLeft: { xs: 'none', md: '1px solid #ddd' }, // Remove border on small screens
                    flex: 1,
                    ...hideScrollbar
                }}>
                    {course.sections.map((section, sectionIndex) => (
                        <Accordion key={sectionIndex} sx={{ marginBottom: 1 }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls={`panel${sectionIndex}-content`}
                                id={`panel${sectionIndex}-header`}
                            >
                                <Typography variant="h6">{section.title}</Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ maxHeight: '75vh', overflowY: 'auto' }}>
                                <List>
                                    {section.lectures.map((lecture, lectureIndex) => (
                                        <ListItem key={lectureIndex} disablePadding>
                                            <ListItemButton onClick={() => setSelectedContent(lecture)}>
                                                <Typography variant="body1">{lecture.title}</Typography>
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </List>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>

            {/* Review Section */}
            <Box sx={{
                padding: 2,
                borderTop: '1px solid #ccc',
                backgroundColor: '#f9f9f9',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                marginTop: 2,
                width: { xs: '95vw', md: '100%' } // Full width on small screens, default width on larger screens
            }}>
                <Typography variant="h6" sx={{
                    marginBottom: 1,
                    fontWeight: 'bold',
                    color: '#333'
                }}>
                    Leave a Review
                </Typography>
                <Box sx={{ marginBottom: 1 }}>
                    <Typography variant="body1" sx={{ marginBottom: 1 }}>
                        Rate this content:
                    </Typography>
                    <Rate
                        value={rating}
                        onChange={(value) => setRating(value)}
                        style={{ fontSize: '15px' }}
                    />
                </Box>
                <TextField
                    autoFocus
                    multiline
                    rows={3}
                    fullWidth
                    variant="outlined"
                    label="Write your review"
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                    sx={{ marginBottom: 1 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleReviewSubmit}
                    sx={{
                        textTransform: 'none',
                        borderRadius: 4,
                        padding: '8px 16px',
                        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
                        '&:hover': {
                            backgroundColor: '#004ba0',
                            boxShadow: '0px 6px 8px rgba(0, 0, 0, 0.2)'
                        }
                    }}
                >
                    Submit Review
                </Button>
                {reviewSubmitted && (
                    <Typography variant="body2" sx={{ color: 'green', marginTop: 2 }}>
                        Thank you for your review!
                    </Typography>
                )}
            </Box>
        </div>
    );
};

export default CourseLearningPage;
