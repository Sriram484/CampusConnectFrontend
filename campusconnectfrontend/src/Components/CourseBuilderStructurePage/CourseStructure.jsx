import React from 'react';
import { Box, Typography, Button, Card, CardContent, List, ListItem, ListItemText, Link } from '@mui/material';

import Library from "../../Assets/Image/library-help.jpg"

const CourseStructure = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h3" sx={{ fontWeight: "700" }} gutterBottom>
        Course structure
      </Typography>
      <Typography variant="body1" gutterBottom sx={{ fontSize: "24px", fontWeight: "700", mt: 5, mb: 5,color:"black" }}>
        There's a course in you. Plan it out.
      </Typography>
      <Typography variant="body2" paragraph sx={{ fontSize: "18px" ,color:"black"}}>
        Planning your course carefully will create a clear learning path for students and help you once you film.
        Think down to the details of each lecture including the skill you’ll teach, estimated video length,
        practical activities to include, and how you’ll create introductions and summaries.
      </Typography>

      <Card sx={{ marginBottom: 4, display: "flex", flexDirection: "row", justifyContent: "space-between", maxWidth: "60%" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Our library of resources
          </Typography>
          <Typography variant="body2" paragraph sx={{color:"black"}}>
            Tips and guides to structuring a course students love
          </Typography>
          <Button variant="contained" color="primary">
            Teaching Center
          </Button>
        </CardContent>
        <CardContent>
          <img src={Library} height="150px" />
        </CardContent>
      </Card>

      <Box sx={{ marginBottom: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "700" }}>
          Tips
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="Start with your goals."
              secondary="Setting goals for what learners will accomplish in your course (also known as learning objectives) at the beginning will help you determine
               what content to include in your course and how you will teach the content to help your learners achieve the goals."
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Create an outline."
              secondary="Decide what skills you’ll teach and how you’ll teach them. Group related lectures into sections.
               Each section should have at least 3 lectures, and include at least one assignment or practical activity. "
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Introduce yourself and create momentum."
              secondary="People online want to start learning quickly. Make an introduction section 
              that gives learners something to be excited about in the first 10 minutes."
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Sections have a clear learning objective."
              secondary="Introduce each section by describing the section's goal and why it’s important. Give lectures 
              and sections titles that reflect their content and have a logical flow."
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Lectures cover one concept."
              secondary="A good lecture length is 2-7 minutes to keep students interested and help them study in short bursts. Cover a 
              single topic in each lecture so learners can easily find and re-watch them later."
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Mix and match your lecture types."
              secondary="Alternate between filming yourself, your screen, and slides or other visuals. 
              Showing yourself can help learners feel connected."
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="Practice activities create hands-on learning."
              secondary="Help learners apply your lessons to their real world with projects, assignments, coding exercises, or worksheets."
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "700" }}>
          Requirements
        </Typography>
        <List>
          <ListItem >
            <ListItemText primary="1) See the complete list of course quality requirements."
              primaryTypographyProps={{
                sx: {
                  fontSize: '18px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="2) Your course must have at least five lectures."
              primaryTypographyProps={{
                sx: {
                  fontSize: '18px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="3) All lectures must add up to at least 30+ minutes of total video."
              primaryTypographyProps={{
                sx: {
                  fontSize: '18px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText primary="4) Your course is composed of valuable educational content and free of promotional or distracting materials."
              primaryTypographyProps={{
                sx: {
                  fontSize: '18px',
                },
              }}
            />
          </ListItem>
        </List>
      </Box>

      <Box>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "700", mt: 4 }} >
          Resources
        </Typography>
        <List>
          <ListItem>
            <ListItemText
              primary={
                <Link
                  href="https://yourwebsite.com"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontWeight: 700,
                    fontSize: '18px',
                    textDecoration: 'none',
                    color: '#a12c30',
                    textDecoration: 'underline',
                    
                  }}
                >
                  CampusConnect Trust & Safety
                </Link>
              }
              secondary="Our policies for instructors and students"
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={
                <Link
                  href="https://yourwebsite.com"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontWeight: 700,
                    fontSize: '18px',
                    textDecoration: 'none',
                    color: '#a12c30',
                    textDecoration: 'underline',
                 
                  }}
                >
                  Join the instructor community
                </Link>
              }

              secondary="A place to connect with other instructors"
              primaryTypographyProps={{
                sx: {
                  fontWeight: 700,
                  fontSize: '18px',
                },
              }}
              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemText

              primary={
                <Link
                  href="https://yourwebsite.com"
                  target="_blank"
                  rel="noopener"
                  sx={{
                    fontWeight: 700,
                    fontSize: '18px',
                    textDecoration: 'none',
                    color: '#a12c30',
                    textDecoration: 'underline',
                  }}
                >
                  Official CampusConnect Course: How to Create an Online Course
                </Link>
              }
              secondary="Learn about course creation from the CampusConnect Instructor Team and experienced instructors"

              secondaryTypographyProps={{
                sx: {
                  fontWeight: 400,
                  fontSize: '14px',
                },
              }}
            />
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default CourseStructure;
