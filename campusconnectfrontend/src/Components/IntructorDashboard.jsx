import React, { useEffect, useState } from 'react';
import {
    Drawer, AppBar, Toolbar, Typography, Box, CssBaseline, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Divider,
    Paper, Button, InputBase, TextField, Autocomplete,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    useMediaQuery,
    useTheme
} from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import BarChart from './BarChart';
import { useNavigate } from 'react-router';
import { useFormData } from './Context/UserData';
import axios from 'axios';

// Dummy data
const progressData = [
    { title: 'Machine Learning', progress: 40 },
    { title: 'Data Science', progress: 20 },
    { title: 'Web Development', progress: 80 },
];

const UserData = [
    { id: 1, year: "Amazon AWS Serverless APIs & Apps", userGain: 80000 },
    { id: 2, year: "Machine Learning and Algorithms", userGain: 45677 },
    { id: 3, year: "React - The Complete Guide", userGain: 78888 },
    { id: 4, year: "Complete Python Bootcamp", userGain: 90000 },
    { id: 5, year: "The Web Developer Bootcamp", userGain: 64300 },
    { id: 6, year: "Java Programming Masterclass", userGain: 4300 },
    { id: 7, year: "Data Science and Machine Learning Bootcamp", userGain: 64300 },
    { id: 8, year: "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp", userGain: 43800 },
    { id: 9, year: "The Complete Node.js Developer Course", userGain: 4300 },
    { id: 10, year: "The Complete SQL Bootcamp", userGain: 4300 },
];

const drawerWidth = 240;

const iconMap = {
    'Courses': <HomeIcon />,
    'Performance': <BarChartIcon />,
    'Delete Instructor Account': <BarChartIcon />,
};

const courseOptions = [
    { label: 'A-Z' },
    { label: 'Z-A' },
];

export default function InstructorDashboard() {
    const navigate = useNavigate();
    const { formData, setFormData } = useFormData();
    const [courses, setCourses] = useState([]);
    const token = localStorage.getItem('token');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCourses = async () => {
            const user = formData.createdCourseIds;
            console.log(user);
            console.log(formData.createdCourseIds);
            
            
            try {
                setLoading(true); // Set loading state to true

                const response = await axios.get('http://localhost:1010/public/courses/all', {
                    headers: { Authorization: `Bearer ${token}` },
                  });

                console.log(response.data);
                
        
                const allCourses = response.data;
                const filteredCourses = allCourses.filter(course =>
                  formData.createdCourseIds.includes(course.id)
                );
        
                setCourses(filteredCourses);
                console.log(courses);
                
              } catch (error) {
                console.error('Error fetching course data:', error);
                setError('Error fetching course data'); // Set error state
              } finally {
                setLoading(false); // Set loading state to false
              }
        };
        
        fetchCourses();
    }, []);
    
    useEffect(()=>{
        console.log(courses);
    },[courses])
    console.log(courses);
    
    
   


    console.log(formData);

    const [userData, setUserData] = useState({
        labels: UserData.map((data) => data.year),
        datasets: [
            {
                label: "Users Gained",
                data: UserData.map((data) => data.userGain),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                ],
                borderWidth: 1,
            },
        ],
    });

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedItem, setSelectedItem] = useState('Courses');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedOption, setSelectedOption] = useState(courseOptions[0].label);
    const [filteredData, setFilteredData] = useState(progressData);

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleConfirmDelete = () => {
        // Implement delete account logic here
        setOpenDialog(false);
        alert('Instructor account deleted!');
    };

    const handleItemClick = (text) => {
        if (text === 'Delete Instructor Account') {
            setOpenDialog(true);
        } else {
            setSelectedItem(text);
        }
    };

    const handleSearchChange = (event) => {
        const query = event.target.value.toLowerCase();
        setSearchQuery(query);

        setFilteredData(progressData.filter(item =>
            item.title.toLowerCase().includes(query)
        ));
    };

    const handleOptionChange = (event, newValue) => {
        setSelectedOption(newValue?.label || courseOptions[0].label);

        let sortedData;
        switch (newValue?.label) {
            case 'Newest':
                sortedData = [...progressData].sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate));
                break;
            case 'Oldest':
                sortedData = [...progressData].sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate));
                break;
            case 'A-Z':
                sortedData = [...progressData].sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'Z-A':
                sortedData = [...progressData].sort((a, b) => b.title.localeCompare(a.title));
                break;
            default:
                sortedData = progressData;
                break;
        }
        setFilteredData(sortedData);
    };


    const renderContent = () => {
        switch (selectedItem) {
            case 'Courses':
                return (
                    <>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                                <InputBase
                                    value={searchQuery}
                                    onChange={handleSearchChange}
                                    sx={{ ml: 1, flex: 1, maxWidth: '300px' }}
                                    placeholder="Search your courses"
                                    inputProps={{ 'aria-label': 'search your courses' }}
                                    startAdornment={<SearchIcon />}
                                />
                                <Autocomplete
                                    options={courseOptions}
                                    getOptionLabel={(option) => option.label}
                                    value={{ label: selectedOption }}
                                    onChange={handleOptionChange}
                                    disableClearable
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            variant="outlined"
                                            sx={{ minWidth: '150px', ml: 2 }}
                                            InputProps={{
                                                ...params.InputProps,
                                            }}
                                        />
                                    )}
                                    PaperComponent={(props) => (
                                        <Paper {...props} style={{ maxHeight: 200 }} />
                                    )}
                                />
                            </Box>
                            <Button variant="contained" color="primary" sx={{ whiteSpace: 'nowrap', ml: 2 }} onClick={() => navigate("/courseBuilder")}>
                                New course
                            </Button>
                        </Box>
                        {courses.map((course) => (
                            <Paper key={course.id} elevation={2} sx={{ p: 2,marginBottom:"20px" }}>
                                <Typography variant="h6" gutterBottom>
                                    {course.title}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    No of Customers
                                </Typography>
                                <Box sx={{ width: '100%', bgcolor: 'grey.300', height: 10, borderRadius: 1, mt: 1 }}>
                                    <Box sx={{ width: `${course.progress}%`, bgcolor: 'primary.main', height: '100%', borderRadius: 1 }} />
                                </Box>
                            </Paper>
                        ))}
                    </>
                );
            case 'Performance':
                return (
                    <div style={{ width: "80vw" }}>
                        <BarChart chartData={userData} />
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* AppBar */}
                <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                    <Toolbar >
                        <Typography variant="h6" noWrap component="div">
                            Dashboard
                        </Typography>
                        <Typography variant="h6" noWrap component="div" sx={{marginLeft:"70vw"}} onClick={()=>{navigate("/")}}>
                            Go Back To Home
                        </Typography>
                    </Toolbar>
                </AppBar>

                {/* Drawer */}
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {['Courses', 'Performance', 'Delete Instructor Account'].map((text) => (
                                <ListItem
                                    key={text}
                                    disablePadding
                                    selected={selectedItem === text}
                                    onClick={() => handleItemClick(text)}
                                >
                                    <ListItemButton>
                                        <ListItemIcon>
                                            {iconMap[text] || <AttachMoneyIcon />}
                                        </ListItemIcon>
                                        <ListItemText primary={text} />
                                    </ListItemButton>
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </Box>
                </Drawer>

                <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: 3 }}>
                    <Toolbar />
                    {renderContent()}
                </Box>
            </Box>

            {/* Delete Account Confirmation Dialog */}
            <Dialog
                fullScreen={fullScreen}
                open={openDialog}
                onClose={handleCloseDialog}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">
                    {"Delete Instructor Account?"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete your instructor account? This action cannot be undone.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleCloseDialog}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="error" autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
