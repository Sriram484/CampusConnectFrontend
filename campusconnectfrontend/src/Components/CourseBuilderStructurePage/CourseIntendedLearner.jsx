import React from 'react';
import { Delete } from '@mui/icons-material';
import { Box, Button, Typography, IconButton } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MAX_FIELDS = 4;
const MAX_CHAR_COUNT = 3600;

const CourseIntendedLearner = ({ courseData, setCourseData }) => {
    const { learningObjectives, requirements, intendedLearners } = courseData;

    // Handlers to add new text fields
    const addLearningObjective = () => {
        if (learningObjectives.length < MAX_FIELDS) {
            setCourseData(prevData => ({
                ...prevData,
                learningObjectives: [...learningObjectives, '']
            }));
        } else {
            alert("Only 4");
        }
    };

    const addRequirement = () => {
        if (requirements.length < MAX_FIELDS) {
            setCourseData(prevData => ({
                ...prevData,
                requirements: [...requirements, '']
            }));
        } else {
            alert("Only 4");
        }
    };

    const addIntendedLearner = () => {
        if (intendedLearners.length < MAX_FIELDS) {
            setCourseData(prevData => ({
                ...prevData,
                intendedLearners: [...intendedLearners, '']
            }));
        } else {
            alert("Only 4");
        }
    };

    // Handlers to update state for each section
    const handleLearningObjectiveChange = (index, value) => {
        if (value.length <= MAX_CHAR_COUNT) {
            const newLearningObjectives = [...learningObjectives];
            newLearningObjectives[index] = value; // `value` is the content as a string
            setCourseData(prevData => ({
                ...prevData,
                learningObjectives: newLearningObjectives
            }));
        } else {
            alert("Maximum 3600 characters only");
        }
    };

    const handleRequirementChange = (index, value) => {
        if (value.length <= MAX_CHAR_COUNT) {
            const newRequirements = [...requirements];
            newRequirements[index] = value;
            setCourseData(prevData => ({
                ...prevData,
                requirements: newRequirements
            }));
        } else {
            alert("Maximum 3600 characters only");
        }
    };

    const handleIntendedLearnerChange = (index, value) => {
        if (value.length <= MAX_CHAR_COUNT) {
            const newIntendedLearners = [...intendedLearners];
            newIntendedLearners[index] = value;
            setCourseData(prevData => ({
                ...prevData,
                intendedLearners: newIntendedLearners
            }));
        } else {
            alert("Maximum 3600 characters only");
        }
    };

    // Handlers to remove text fields with a minimum of one row
    const removeLearningObjective = (index) => {
        if (learningObjectives.length > 1) {
            const newLearningObjectives = [...learningObjectives];
            newLearningObjectives.splice(index, 1);
            setCourseData(prevData => ({
                ...prevData,
                learningObjectives: newLearningObjectives
            }));
        }
    };

    const removeRequirement = (index) => {
        if (requirements.length > 1) {
            const newRequirements = [...requirements];
            newRequirements.splice(index, 1);
            setCourseData(prevData => ({
                ...prevData,
                requirements: newRequirements
            }));
        }
    };

    const removeIntendedLearner = (index) => {
        if (intendedLearners.length > 1) {
            const newIntendedLearners = [...intendedLearners];
            newIntendedLearners.splice(index, 1);
            setCourseData(prevData => ({
                ...prevData,
                intendedLearners: newIntendedLearners
            }));
        }
    };

    const handleSubmit = () => {
        // You may want to validate the courseData here before submitting
        console.log('Submitting form data:', courseData);
    };

    return (
        <div>
            <div className='CourseBuilder-Heading-Container'>
                <div className='CourseBuilder-Heading'>
                    <Typography variant="h4" fontWeight="bold">
                        Intended learners
                    </Typography>
                </div>
                <div className='CourseBuilder-SubHeading'>
                    <Typography sx={{ fontSize: "16px", color: "black" }}>
                        The following descriptions will be publicly visible on your Course Landing Page and will have a direct
                        impact on your course performance.
                        These descriptions will help learners decide if your course is right for them.
                    </Typography>
                </div>
            </div>

            <Box sx={{ p: 3 }}>
                {/* Learning Objectives Section */}
                <Typography variant="h6" fontWeight="bold">What will students learn in your course?</Typography>
                <Typography sx={{ mt: 1, mb: 1, fontSize: "14px", color: "black" }}>You must enter at least 4 learning objectives or outcomes that learners
                    can expect to achieve after completing your course.</Typography>
                {learningObjectives.map((objective, index) => (
                    <Box key={index} display="flex" alignItems="center" marginBottom="16px">
                        <ReactQuill
                            style={{ maxWidth: "60vw", minWidth: "60vw" }}
                            value={objective}
                            onChange={(value) => handleLearningObjectiveChange(index, value)}
                        />
                        <IconButton
                            aria-label="delete"
                            onClick={() => removeLearningObjective(index)}
                            edge="end"
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                ))}
                <Button variant="outlined" onClick={addLearningObjective}>
                    Add more to your response
                </Button>

                {/* Requirements Section */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, color: "black" }}>What are the requirements or prerequisites for taking your course?</Typography>
                <Typography sx={{ mt: 1, mb: 1, fontSize: "14px", color: "black" }}>List the required skills, experience, tools or equipment learners should have prior to taking your course.
                    If there are no requirements, use this space as an opportunity to lower the barrier for beginners</Typography>
                {requirements.map((requirement, index) => (
                    <Box key={index} display="flex" alignItems="center" marginBottom="16px">
                        <ReactQuill
                            style={{ maxWidth: "60vw", minWidth: "60vw" }}
                            fullWidth
                            margin="normal"
                            value={requirement}
                            onChange={(value) => handleRequirementChange(index, value)}
                        />
                        <IconButton
                            aria-label="delete"
                            onClick={() => removeRequirement(index)}
                            edge="end"
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                ))}
                <Button variant="outlined" onClick={addRequirement}>
                    Add more to your response
                </Button>

                {/* Intended Learners Section */}
                <Typography variant="h6" fontWeight="bold" sx={{ mt: 4 }}>Who is this course for?</Typography>
                <Typography sx={{ mt: 1, mb: 1, fontSize: "14px", color: "black" }}>Write a clear description of the intended learners for your course who will find your course content valuable.
                    This will help you attract the right learners to your course.
                </Typography>
                {intendedLearners.map((learner, index) => (
                    <Box key={index} display="flex" alignItems="center" marginBottom="16px">
                        <ReactQuill
                            style={{ maxWidth: "60vw", minWidth: "60vw" }}
                            fullWidth
                            margin="normal"
                            value={learner}
                            onChange={(value) => handleIntendedLearnerChange(index, value)}
                        />
                        <IconButton
                            aria-label="delete"
                            onClick={() => removeIntendedLearner(index)}
                            edge="end"
                        >
                            <Delete />
                        </IconButton>
                    </Box>
                ))}
                <Button variant="outlined" onClick={addIntendedLearner}>
                    Add more to your response
                </Button>
            </Box>
            <div style={{ paddingLeft: "24px" }}>
                <Button variant="outlined" onClick={handleSubmit}>
                    Submit
                </Button>
            </div>
        </div>
    );
};

export default CourseIntendedLearner;
