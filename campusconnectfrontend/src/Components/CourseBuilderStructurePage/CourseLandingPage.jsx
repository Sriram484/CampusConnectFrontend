import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Input,
    Select,
    MenuItem,
    FormControl,
    FormLabel,
    Autocomplete,
    Divider,
} from '@mui/material';

//Quill
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

// Import Placeholder Image
import ImageVideoPlaceholder from "../../Assets/Image/ImageVideoPlaceholder.jpg";
import { languages, categories, subcategories } from './HelperFunction';

const MAX_TITLE_LENGTH = 35;
const MAX_SUBTITLE_LENGTH = 40;
const MAX_DESCRIPTION_LENGTH = 100;

const CourseLandingPage = ({ courseData, setCourseData }) => {


    // Temporary states
    const [tempAudioLanguages, setTempAudioLanguages] = useState([]);
    const [tempSubtitleLanguages, setTempSubtitleLanguages] = useState([]);
    const [tempSubCategories, setTempSubCategories] = useState([]);
    const [tempCategories, setTempCategories] = useState([]);



    const handleFileChange = async (event, fieldName) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setCourseData(prevState => ({
                    ...prevState,
                    [fieldName]: reader.result // Base64 encoded string
                }));
            };
            reader.readAsDataURL(file); // Read file as Base64
        }
    };




    const handleChange = (fieldName) => (event, newValue) => {

        if (fieldName === "subCategories") {
            const stringValues = newValue.map(option => option.value); // Extract only the string values
            setCourseData(prevState => ({
                ...prevState,
                [fieldName]: stringValues
            }));

            // Push the new objects to the temporary state
            setTempSubCategories(newValue);
        }
        else if (fieldName === "audioLanguages") {
            const stringValues = newValue.map(option => option.title); // Extract only the string values
            setCourseData(prevState => ({
                ...prevState,
                [fieldName]: stringValues
            }));

            // Push the new objects to the temporary state
            setTempAudioLanguages(newValue);
        }
        else if (fieldName === "subtitleLanguages") {
            const stringValues = newValue.map(option => option.title); // Extract only the string values
            console.log(newValue);
            
            setCourseData(prevState => ({
                ...prevState,
                [fieldName]: stringValues
            }));

            // Push the new objects to the temporary state
            setTempSubtitleLanguages(newValue);
        }
        else if (fieldName === "category") {
            const stringValues = newValue["title"]; // Extract only the string values
            
            setCourseData(prevState => ({
                ...prevState,
                [fieldName]: stringValues
            }));
            
            console.log(newValue);
            console.log(stringValues);
            // Push the new objects to the temporary state
            setTempCategories(newValue);
        }
        else {

            setCourseData(prevState => ({
                ...prevState,
                [fieldName]: newValue
            }));
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(courseData);
    };

    return (
        <Box p={3} sx={{ maxWidth: '80vw', margin: 'auto' }}>
            <Typography variant="h3" gutterBottom sx={{ mb: 3, fontWeight: 700 }}>
                Course Landing Page
            </Typography>
            <Typography sx={{ fontSize: '16px', mb: 3, color: "black" }}>
                Your course landing page is crucial to your success on Udemy. If it’s done right, it can also help you gain visibility in search engines like Google. As you complete this section,
                think about creating a compelling Course Landing Page that demonstrates why someone would want to enroll in your course.
            </Typography>
            <form onSubmit={handleSubmit}>
                {/* Basic Information */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Basic Information
                    </Typography>
                    <TextField
                        label="Course Title"
                        fullWidth
                        required
                        value={courseData.title}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_TITLE_LENGTH) {
                                setCourseData(prevState => ({
                                    ...prevState,
                                    title: e.target.value
                                }));
                            }
                        }}
                        helperText={`${courseData.title.length}/${MAX_TITLE_LENGTH} characters`}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Course Subtitle"
                        fullWidth
                        required
                        value={courseData.subtitle}
                        onChange={(e) => {
                            if (e.target.value.length <= MAX_SUBTITLE_LENGTH) {
                                setCourseData(prevState => ({
                                    ...prevState,
                                    subtitle: e.target.value
                                }));
                            }
                        }}
                        helperText={`${courseData.subtitle.length}/${MAX_SUBTITLE_LENGTH} characters`}
                        sx={{ mb: 2 }}
                    />
                    <ReactQuill
                        style={{ maxWidth: "80vw", minWidth: "80vw" }}
                        value={courseData.description}
                        onChange={(value) => setCourseData(prevState => ({
                            ...prevState,
                            description: value
                        }))}
                    />
                </Box>
                <Divider sx={{ mb: 4, borderColor: 'black' }} />

                {/* Course Details */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Course Details
                    </Typography>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Autocomplete
                            multiple
                            id="audio-languages-select"
                            options={languages}
                            getOptionLabel={(option) => option.title}
                            value={tempAudioLanguages}
                            onChange={handleChange('audioLanguages')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Audio Languages"
                                    placeholder="Select languages"
                                />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Autocomplete
                            multiple
                            id="subtitle-languages-select"
                            options={languages}
                            getOptionLabel={(option) => option.title}
                            value={tempSubtitleLanguages}
                            onChange={handleChange('subtitleLanguages')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Subtitle Languages"
                                    placeholder="Select languages"
                                />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Autocomplete
                            options={['Beginner', 'Intermediate', 'Advanced']}
                            value={courseData.level}
                            onChange={handleChange('level')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Course Instructional Level"
                                />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Autocomplete
                            id="course-category-select"
                            options={categories}
                            getOptionLabel={(option) => option.title}
                            value={tempCategories}
                            onChange={handleChange('category')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Course Category"
                                    placeholder="Course Category"
                                />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <Autocomplete
                            id="course-subcategory-select"
                            multiple
                            options={courseData.category ? subcategories[courseData.category.title] || [] : []}
                            getOptionLabel={(option) => option.label}
                            value={tempSubCategories}
                            onChange={handleChange('subCategories')}
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    variant="outlined"
                                    label="Course Subcategories"
                                />
                            )}
                            sx={{ width: '100%' }}
                        />
                    </FormControl>
                </Box>
                <Divider sx={{ mb: 4, borderColor: 'black' }} />

                {/* Additional Information */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Additional Information
                    </Typography>
                    <TextField
                        label="Total Hours"
                        type="number"
                        fullWidth
                        value={courseData.totalHours}
                        onChange={(e) => setCourseData(prevState => ({
                            ...prevState,
                            totalHours: e.target.value
                        }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Number of Exercises"
                        type="number"
                        fullWidth
                        value={courseData.numberOfExercises}
                        onChange={(e) => setCourseData(prevState => ({
                            ...prevState,
                            numberOfExercises: e.target.value
                        }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Number of Articles"
                        type="number"
                        fullWidth
                        value={courseData.numberOfArticles}
                        onChange={(e) => setCourseData(prevState => ({
                            ...prevState,
                            numberOfArticles: e.target.value
                        }))}
                        sx={{ mb: 2 }}
                    />
                    <TextField
                        label="Number of Downloadable Resources"
                        type="number"
                        fullWidth
                        value={courseData.numberOfResources}
                        onChange={(e) => setCourseData(prevState => ({
                            ...prevState,
                            numberOfResources: e.target.value
                        }))}
                        sx={{ mb: 2 }}
                    />
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Includes Mobile and TV Access</FormLabel>
                        <Select
                            value={courseData.includesMobileAccess}
                            onChange={(e) => setCourseData(prevState => ({
                                ...prevState,
                                includesMobileAccess: e.target.value === 'true'
                            }))}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Full Lifetime Access</FormLabel>
                        <Select
                            value={courseData.fullLifetimeAccess}
                            onChange={(e) => setCourseData(prevState => ({
                                ...prevState,
                                fullLifetimeAccess: e.target.value === 'true'
                            }))}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth sx={{ mb: 2 }}>
                        <FormLabel>Certificate of Completion</FormLabel>
                        <Select
                            value={courseData.certificateOfCompletion}
                            onChange={(e) => setCourseData(prevState => ({
                                ...prevState,
                                certificateOfCompletion: e.target.value === 'true'
                            }))}
                        >
                            <MenuItem value={true}>Yes</MenuItem>
                            <MenuItem value={false}>No</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="What is primarily taught in your course?"
                        fullWidth
                        value={courseData.topic}
                        onChange={(e) => setCourseData(prevState => ({
                            ...prevState,
                            topic: e.target.value
                        }))}
                        sx={{ mb: 2 }}
                    />
                </Box>
                <Divider sx={{ mb: 4, borderColor: 'black' }} />

                {/* Media Upload */}
                {/* Media Upload */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" sx={{ mb: 2 }}>
                        Media
                    </Typography>
                    <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Typography variant="subtitle1">Course Image</Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: "20%" }}>
                                <Input
                                    type="file"
                                    accept=".jpg,.jpeg,.png"
                                    id="course-image-upload"
                                    onChange={(e) => handleFileChange(e, 'courseImage')}
                                    sx={{ display: 'none' }}
                                />
                                <label htmlFor="course-image-upload">
                                    <Button
                                        variant="contained"
                                        component="span"
                                        sx={{ mb: 1 }}
                                    >
                                        Choose Image
                                    </Button>
                                </label>
                                {courseData.courseImage ? (
                                    <img
                                        src={courseData.courseImage} // Use Base64 data
                                        alt="Course"
                                        style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                                    />
                                ) : (
                                    <img
                                        src={ImageVideoPlaceholder}
                                        alt="Placeholder"
                                        style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                                    />
                                )}
                            </Box>
                        </Box>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                        <Typography variant="subtitle1">Promotional Video</Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: "20%" }}>
                            <Input
                                type="file"
                                accept="video/*"
                                id="promo-video-upload"
                                onChange={(e) => handleFileChange(e, 'promoVideo')}
                                sx={{ display: 'none' }}
                            />
                            <label htmlFor="promo-video-upload">
                                <Button
                                    variant="contained"
                                    component="span"
                                    sx={{ mb: 1 }}
                                >
                                    Choose Video
                                </Button>
                            </label>
                            {courseData.promoVideo ? (
                                <video
                                    src={courseData.promoVideo} // Use Base64 data
                                    controls
                                    style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                                />
                            ) : (
                                <img
                                    src={ImageVideoPlaceholder}
                                    alt="Placeholder"
                                    style={{ width: '200px', height: 'auto', marginTop: '10px' }}
                                />
                            )}
                        </Box>
                    </Box>
                </Box>

                <Button type="submit" variant="contained" color="primary">
                    Submit
                </Button>
            </form>
        </Box>
    );
};

export default CourseLandingPage;
