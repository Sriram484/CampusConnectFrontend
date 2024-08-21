import React from 'react';
import { Container, Typography, FormGroup, FormControlLabel, Checkbox, Box, Button } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';

function CourseMessagesForm({ courseData, setCourseData }) {
    const handleInputChange = (event) => {
        const { name, value, checked, type } = event.target;
        setCourseData(prevData => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleQuillChange = (value, field) => {
        setCourseData(prevData => ({
            ...prevData,
            [field]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(courseData); // Prints the form data to the console
    };

    const handleCourseSubmit = async (event) => {
        event.preventDefault();
        
        // Retrieve the token from localStorage
        const token = localStorage.getItem('token');

        console.log(courseData);
        
        
        try {
            const response = await axios.post('http://localhost:1010/adminuser/courses/createCourse', courseData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Add the Bearer token here
                }
            });
            
            console.log('Course created successfully:', response.data);
            // You might want to redirect or show a success message here
        } catch (error) {
            console.error('Error creating course:', error);
            // Handle error appropriately (e.g., show an error message to the user)
        }
    };

    return (
        <Container>
            <Box mb={4}>
                <Typography variant="h2">Course Messages</Typography>
                <Typography variant="body1" mt={2} sx={{color:"black"}}>
                    Write messages to your students (optional) that will be sent automatically when they join or complete your course to encourage students to engage with course content. If you do not wish to send a welcome or congratulations message, leave the text box blank.
                </Typography>
            </Box>

            <form onSubmit={handleSubmit}>
                <Box mb={4}>
                    <FormGroup sx={{mb:4}}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={courseData.enableWelcomeMessage}
                                    onChange={handleInputChange}
                                    name="enableWelcomeMessage"
                                />
                            }
                            label="Enable Welcome Message"
                            sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={courseData.enableCongratulationsMessage}
                                    onChange={handleInputChange}
                                    name="enableCongratulationsMessage"
                                />
                            }
                            label="Enable Congratulations Message"
                            sx={{ '& .MuiFormControlLabel-label': { color: 'black' } }}
                        />
                    </FormGroup>

                    {courseData.enableWelcomeMessage && (
                        <Box mb={4}>
                            <Typography variant="h6">Welcome Message</Typography>
                            <ReactQuill
                                value={courseData.welcomeMessage}
                                onChange={(value) => handleQuillChange(value, 'welcomeMessage')}
                                placeholder="Write your welcome message here..."
                            />
                        </Box>
                    )}

                    {courseData.enableCongratulationsMessage && (
                        <Box mb={4}>
                            <Typography variant="h6">Congratulations Message</Typography>
                            <ReactQuill
                                value={courseData.congratulationsMessage}
                                onChange={(value) => handleQuillChange(value, 'congratulationsMessage')}
                                placeholder="Write your congratulations message here..."
                            />
                        </Box>
                    )}
                </Box>

                <Button type="submit" variant="contained" color="primary">
                    Save
                </Button>
            </form>
                <Button type="submit" variant="contained" color="primary" sx={{mt:3}}  onClick={handleCourseSubmit}>
                    Submit The Course
                </Button>
        </Container>
    );
}

export default CourseMessagesForm;
