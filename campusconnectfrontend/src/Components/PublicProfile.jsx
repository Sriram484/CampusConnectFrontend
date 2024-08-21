import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Container, Grid, Avatar, Typography, Paper, Box, Divider, Link } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import profilepng from "../Assets/Image/ProfilePNG.png"

// Dummy course data
const courses = [
    { id: 1, title: 'Course Title 1', description: 'Course Description 1', customers: 150, rating: 4.7 },
    { id: 2, title: 'Course Title 2', description: 'Course Description 2', customers: 300, rating: 4.9 },
    { id: 3, title: 'Course Title 3', description: 'Course Description 3', customers: 200, rating: 4.8 },
    { id: 4, title: 'Course Title 4', description: 'Course Description 4', customers: 100, rating: 4.6 },
    { id: 5, title: 'Course Title 5', description: 'Course Description 5', customers: 250, rating: 4.7 }
];

// Dummy FAQ data about the instructor
const faqs = [
    { question: 'What is the instructor’s teaching philosophy?', answer: 'The instructor believes in a hands-on approach and encourages active participation to facilitate deeper understanding.' },
    { question: 'What are the instructor’s qualifications?', answer: 'The instructor holds advanced degrees in their field and has years of practical experience in both academic and industry settings.' },
    { question: 'How does the instructor stay updated with industry trends?', answer: 'The instructor regularly attends industry conferences, participates in professional development, and stays connected with other experts in the field.' },
    { question: 'Can the instructor provide one-on-one mentoring?', answer: 'Yes, the instructor offers one-on-one mentoring sessions for personalized guidance and support.' },
    { question: 'What is the instructor’s approach to feedback?', answer: 'The instructor values constructive feedback and uses it to continuously improve their teaching methods and course content.' }
];

const PublicProfilePage = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Container maxWidth="lg" sx={{ paddingTop: 4 }}>
            <Grid container spacing={4}>
                {/* Profile Picture, Name, and Headline */}
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ padding: 2, textAlign: 'center' }}>
                        <img
                            alt="Instructor Name"
                            src={profilepng}
                            style={{ width: 150, height: 150, margin: 'auto', backgroundColor: "black", fontSize: "55px",borderRadius:"50%" }}
                        />
                        <Typography variant="h5" sx={{ marginTop: 2 }}>Instructor Name</Typography>
                        <Typography variant="body1" sx={{ color: "gray" }}>
                            Instructor Headline
                        </Typography>
                    </Paper>
                </Grid>

                {/* About and Courses */}
                <Grid item xs={12} md={8}>
                    <Paper elevation={3} sx={{ padding: 2 }}>
                        <Typography variant="h6">About</Typography>
                        <Box sx={{ marginTop: 1 }}>
                            <Typography variant="body1" sx={{ color: "black" }}>
                                The instructor has over 10 years of experience in the field, specializing in cutting-edge technology and innovative teaching methods.
                                They have taught thousands of students and have a passion for making complex subjects accessible and engaging.
                                The instructor’s work has been recognized by industry leaders and they continue to contribute to their field through research, speaking engagements, and published works.
                            </Typography>
                        </Box>

                        <Divider sx={{ marginY: 2 }} />

                        <Typography variant="h6">Top Courses</Typography>
                        <Box sx={{ marginTop: 1 }}>
                            {courses
                                .sort((a, b) => b.customers - a.customers) // Sort courses by number of customers
                                .slice(0, 3) // Take the top 3 courses
                                .map((course) => (
                                    <Accordion key={course.id} expanded={expanded === `course${course.id}`} onChange={handleChange(`course${course.id}`)}>
                                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                            <Typography variant="body1" sx={{ color: "black" }}>{course.title}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <Typography variant="body2" sx={{ color: "black" }}>{course.description}</Typography>
                                        </AccordionDetails>
                                    </Accordion>
                                ))}
                        </Box>

                        <Divider sx={{ marginY: 2 }} />

                        <Typography variant="h6">FAQs</Typography>
                        <Box sx={{ marginTop: 1 }}>
                            {faqs.map((faq, index) => (
                                <Accordion key={index} expanded={expanded === `faq${index}`} onChange={handleChange(`faq${index}`)}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        <Typography variant="body1" sx={{ color: "black" }}>{faq.question}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Typography variant="body2" sx={{ color: "black" }}>{faq.answer}</Typography>
                                    </AccordionDetails>
                                </Accordion>
                            ))}
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                        <Typography variant="h6">Contact Information</Typography>
                        <Box sx={{ marginTop: 1 }}>
                            <Typography variant="body1" sx={{ color: "black" }}>Email: <Link href="mailto:instructor@example.com">instructor@example.com</Link></Typography>
                        </Box>
                    </Paper>

                    <Paper elevation={3} sx={{ padding: 2, marginTop: 4 }}>
                        <Typography variant="h6">Connect</Typography>
                        <Box sx={{ marginTop: 1 }}>
                            <Link href="https://linkedin.com/in/instructor" target="_blank" sx={{ marginRight: 2 }}>
                                LinkedIn
                            </Link>
                            <Link href="https://twitter.com/instructor" target="_blank">
                                Twitter
                            </Link>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default PublicProfilePage;
