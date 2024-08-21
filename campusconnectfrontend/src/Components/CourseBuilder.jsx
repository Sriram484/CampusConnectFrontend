import React, { useEffect, useState } from 'react';
import {
  Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Divider,
  Typography, AppBar, Toolbar, CssBaseline
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, useTheme } from '@mui/material/styles';

import "../Assets/CSS/CourseBuilder.css";
import CourseIntendedLearner from './CourseBuilderStructurePage/CourseIntendedLearner';
import CourseStructure from './CourseBuilderStructurePage/CourseStructure';
import CurriculumComponent from './CourseBuilderStructurePage/CurriculumComponent';
import CourseLandingPage from './CourseBuilderStructurePage/CourseLandingPage';
import PricingForm from './CourseBuilderStructurePage/PricingForm';
import CourseMessagesForm from './CourseBuilderStructurePage/CourseMessagesForm';
import { useNavigate } from 'react-router';

const drawerWidth = 240;


const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
    marginTop: "64px", // Ensure the top content isn't hidden by the AppBar
    minHeight:"calc(100vh - 64px)",
    overflowY: 'auto', // Enable vertical scrolling
  }),
);

const AppBarStyled = styled(AppBar, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    }),
    zIndex: theme.zIndex.drawer + 1,
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: 'flex-start',
}));

const CourseBuilder = () => {
  const navigate = useNavigate();
  const [courseData, setCourseData] = useState({
    title: '',
    subtitle: '',
    description: '',
    audioLanguages: [],
    subtitleLanguages: [],
    level: '',
    category: '',
    subCategories: [],
    topic: '',
    courseImage: '',
    promoVideo: '',
    totalHours: '',
    numberOfExercises: '',
    numberOfArticles: '',
    numberOfResources: '',
    includesMobileAccess: false,
    fullLifetimeAccess: false,
    certificateOfCompletion: false,
    learningObjectives: [],
    requirements: [],
    intendedLearners: [],
    sections: [],
    welcomeMessage: '',
    congratulationsMessage: '',
    currency: '',
    priceTier: '',
    bankName: '',
    accountNumber: '',
    ifscCode: ''
  });
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState('Intended learners');

  useEffect(()=>{
    console.log(courseData);
    
  },[selectedSection])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSectionClick = (section) => {
    setSelectedSection(section);
  };

  const renderContent = () => {
    switch (selectedSection) {
      case 'Intended learners':
        return <CourseIntendedLearner courseData={courseData} setCourseData={setCourseData}/>;
      case 'Course structure':
        return <CourseStructure />;
      case 'Curriculum':
        return <CurriculumComponent courseData={courseData} setCourseData={setCourseData} />;
      case 'Course landing page':
        return <CourseLandingPage courseData={courseData} setCourseData={setCourseData}/>;
      case 'Pricing':
        return <PricingForm courseData={courseData} setCourseData={setCourseData}/>;
      case 'Course messages':
        return <CourseMessagesForm courseData={courseData} setCourseData={setCourseData}/>;
      default:
        return <CourseIntendedLearner />;
    }
  };

  return (


    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBarStyled position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Course Builder
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: 'none' }) }}
            style={{ position: 'fixed', right: '10px' }} // Ensure button is visible
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBarStyled>
      <div open={open}>
        <DrawerHeader />
        {renderContent()}
      </div>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {/* Section 1: Plan Your Course */}
          <ListItem>
            <ListItemText
              primary={
                <Typography fontWeight="bold" sx={{ color: "black", fontSize: "20px" }}>
                  Plan your course
                </Typography>
              }
            />
          </ListItem>
          {['Intended learners', 'Course structure'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleSectionClick(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider />

          {/* Section 2: Create Your Content */}
          <ListItem>
            <ListItemText
              primary={
                <Typography fontWeight="bold" sx={{ color: "black", fontSize: "20px" }}>
                  Create your content
                </Typography>
              }
            />
          </ListItem>
          {['Curriculum'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleSectionClick(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}

          <Divider />

          {/* Section 3: Publish Your Course */}
          <ListItem>
            <ListItemText
              primary={
                <Typography fontWeight="bold" sx={{ color: "black", fontSize: "20px" }}>
                  Publish your course
                </Typography>
              }
            />
          </ListItem>
          {['Course landing page', 'Pricing', 'Course messages'].map((text) => (
            <ListItem key={text} disablePadding>
              <ListItemButton onClick={() => handleSectionClick(text)}>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}


          <Divider />

          {/* Section 4: Go Back */}
          <ListItem>
            <ListItemText
              primary={
                <Typography fontWeight="bold" sx={{ color: "black", fontSize: "20px" }}>
                  Return Back
                </Typography>
              }
            />
          </ListItem>
          <ListItem  disablePadding>
              <ListItemButton >
                <ListItemText primary={"Go Back"}  onClick={() => navigate("/instructordashboard")}/>
              </ListItemButton>
            </ListItem>
           
        </List>
      </Drawer>
    </Box>
  );
};

export default CourseBuilder;
