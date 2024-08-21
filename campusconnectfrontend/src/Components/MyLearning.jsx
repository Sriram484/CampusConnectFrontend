import React, { useEffect, useState } from 'react';
import { Container, Typography, Tabs, Tab, TextField, Grid, Autocomplete, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import "../Assets/CSS/MyLearning.css"
import { useFormData } from './Context/UserData';
import axios from 'axios';
import { useHistory, useNavigate } from 'react-router';

// Styled Button Component
const StyledButton = styled(Button)(({ theme }) => ({
  backgroundColor: 'rgb(161, 44, 48)',
  color: '#fff',
  width: '100%',
  '&:hover': {
    backgroundColor: 'rgb(141, 35, 38)',
  },
}));

const tabItems = [
  { label: 'Enrolled Course', href: '/home/my-courses/Mylearning/' },
  { label: 'My Cart', href: '/addToCart' },
];

const dropdownOptions = [
  { title: 'Recently Enrolled' },
  { title: 'Title: A-to-Z' },
  { title: 'Title: Z-to-A' },
];

const initialCourses = [
  {
    id: 1,
    title: 'Machine Learning, Data Science and Generative AI with Python',
    author: 'Sundog Education by Frank Kane',
    duration: '26 total hours',
    level: 'All Levels',
    image: 'https://img-b.udemycdn.com/course/240x135/671576_a272_4.jpg',
    enrolledDate: '2024-07-15', // ISO Date String
  },
  {
    id: 1,
    title: 'Machine Learning, Data Science and Generative AI with Python',
    author: 'Sundog Education by Frank Kane',
    duration: '26 total hours',
    level: 'All Levels',
    image: 'https://img-b.udemycdn.com/course/240x135/671576_a272_4.jpg',
    enrolledDate: '2024-07-15', // ISO Date String
  },
  {
    id: 1,
    title: 'Machine Learning, Data Science and Generative AI with Python',
    author: 'Sundog Education by Frank Kane',
    duration: '26 total hours',
    level: 'All Levels',
    image: 'https://img-b.udemycdn.com/course/240x135/671576_a272_4.jpg',
    enrolledDate: '2024-07-15', // ISO Date String
  },
  {
    id: 1,
    title: 'Machine Learning, Data Science and Generative AI with Python',
    author: 'Sundog Education by Frank Kane',
    duration: '26 total hours',
    level: 'All Levels',
    image: 'https://img-b.udemycdn.com/course/240x135/671576_a272_4.jpg',
    enrolledDate: '2024-07-15', // ISO Date String
  },
  // Other courses...
];

const MyMyLearning = () => {
  const [courses, setCourses] = useState([]);
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [selectedOption, setSelectedOption] = React.useState(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [filteredCourses, setFilteredCourses] = React.useState(courses);
  const [originalCourses] = React.useState(courses); // Store the original courses

  const { formData } = useFormData();
  const token = localStorage.getItem('token');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const user = formData.enrolledCourseIds;
      console.log(user);


      try {
        setLoading(true); // Set loading state to true

        const response = await axios.get('http://localhost:1010/public/courses/all', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log(response.data);


        const allCourses = response.data;
        const filteredCourses = allCourses.filter(course =>
          formData.enrolledCourseIds.includes(course.id)
        );

        setCourses(filteredCourses);
        setFilteredCourses(filteredCourses)
        console.log(courses);

      } catch (error) {
        console.error('Error fetching course data:', error);
        setError('Error fetching course data'); // Set error state
      } finally {
        setLoading(false); // Set loading state to false
      }
    };

    fetchCourses();
  }, [formData]);

  useEffect(() => {
    console.log(courses);
  }, [courses])
  console.log(courses);





  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    setFilteredCourses(
      originalCourses.filter(course =>
        course.title.toLowerCase().includes(query.toLowerCase()) ||
        course.author.toLowerCase().includes(query.toLowerCase())
      )
    );
  };

  const handleDropdownChange = (event, newValue) => {
    setSelectedOption(newValue);

    if (newValue) {
      switch (newValue.title) {
        case 'Title: A-to-Z':
          setFilteredCourses(prevCourses =>
            [...prevCourses].sort((a, b) => a.title.localeCompare(b.title))
          );
          break;
        case 'Title: Z-to-A':
          setFilteredCourses(prevCourses =>
            [...prevCourses].sort((a, b) => b.title.localeCompare(a.title))
          );
          break;
        case 'Recently Enrolled':
          setFilteredCourses(prevCourses =>
            [...prevCourses].sort((a, b) => new Date(b.enrolledDate) - new Date(a.enrolledDate))
          );
          break;
        default:
          setFilteredCourses(originalCourses); // Revert to original order
          break;
      }
    } else {
      setFilteredCourses(originalCourses); // Revert to original order if no option is selected
    }
  };

  return (
    <Container sx={{ marginTop: "64px" }}>
      <Typography variant="h3">My Learning</Typography>

      <Tabs value={selectedTab} onChange={handleTabChange} variant="scrollable" scrollButtons="auto">
        {tabItems.map((item, index) => (
          <Tab key={index} label={item.label} href={item.href} />
        ))}
      </Tabs>
      <Grid container spacing={2} sx={{ mt: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search my courses"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ maxWidth: '100%' }} // Ensure it doesn't overflow
          />
        </Grid>
        <Grid item xs={12} sm={6} sx={{ mt: { xs: 2, sm: 0 } }}>
          <Autocomplete
            options={dropdownOptions}
            getOptionLabel={(option) => option.title}
            value={selectedOption}
            onChange={handleDropdownChange}
            renderInput={(params) => <TextField {...params} label="Sort" variant="outlined" />}
            fullWidth
            sx={{ maxWidth: '100%' }} // Ensure it doesn't overflow
          />
        </Grid>
      </Grid>


      <div className='MyLearning-Body'>
        <div className='MyLearning-BodyLeft'>
          <div className='MyLearning-BodyLeftHeader'>
            {filteredCourses.length} Courses in My Learning
          </div>
          {filteredCourses.map((course) => (
            <div className='MyLearning-MainBodyLeft' key={course.id}
              onClick={() => {
                navigate('/courseLearningPage', { state: { course } });
              }}
            >
              <div className='MyLearning-MainBodyLeft-Pic'>
                <img src={course.courseImage} alt={course.title} />
              </div>
              <div className='MyLearning-MainBodyLeft-Body'>
                <div className='MyLearning-MainBodyLeft-Header'>
                  {course.title}
                </div>
                <div className='MyLearning-MainBodyLeft-Author'>
                  By {course.author}
                </div>
                <div className='MyLearning-MainBodyLeft-Extras'>
                  {course.duration} | {course.level} | Subtitles
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default MyMyLearning;
