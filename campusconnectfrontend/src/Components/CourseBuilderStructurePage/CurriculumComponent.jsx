import React, { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    Button,
    IconButton,
    TextField,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    MenuItem,
    Menu,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    IconButton as MUIIconButton,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CurriculumComponent = ({ courseData, setCourseData }) => {
    const [sections, setSections] = useState([
        { title: 'Introduction', lectures: [{ title: 'Lecture 1.1: Introduction', contents: [] }] },
    ]);
    const [newSectionTitle, setNewSectionTitle] = useState('');
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedSectionIndex, setSelectedSectionIndex] = useState(null);
    const [contentType, setContentType] = useState('');
    const [contentTopic, setContentTopic] = useState('');
    const [contentBody, setContentBody] = useState('');
    const [documentTitle, setDocumentTitle] = useState('');
    const [open, setOpen] = useState(false);
    const [editLectureIndex, setEditLectureIndex] = useState(null);
    const [editLectureTitle, setEditLectureTitle] = useState('');
    const [editLectureContents, setEditLectureContents] = useState([]);

    // Handle adding a new section at the parent level
    const handleAddSection = () => {
        if (newSectionTitle) {
            setSections([
                ...sections,
                { title: newSectionTitle, lectures: [] },
            ]);
            setNewSectionTitle('');
        }
    };

    // Handle opening the menu to add content
    const handleContentClick = (event, sectionIndex) => {
        setAnchorEl(event.currentTarget);
        setSelectedSectionIndex(sectionIndex);
    };

    // Handle the type of content selected (Document, Video, etc.)
    const handleContentTypeSelect = (type) => {
        setContentType(type);
        setOpen(true);
        setAnchorEl(null);
    };

    // Handle the submission of the content dialog
    const handleDialogSubmit = (event) => {
        event.preventDefault();
        if (selectedSectionIndex !== null) {
            const updatedSections = [...sections];
            const section = updatedSections[selectedSectionIndex];

            if (contentType === 'Document') {
                const lectureNumber = section.lectures.length + 1;
                const lectureTitle = `Lecture ${selectedSectionIndex + 1}.${lectureNumber}: ${contentTopic} (${contentType})`;

                section.lectures.push({
                    title: lectureTitle,
                    contents: [{ type: 'Document', data: contentBody }],
                });
            } else {
                const lectureNumber = section.lectures.length + 1;
                const lectureTitle = `Lecture ${selectedSectionIndex + 1}.${lectureNumber}: ${contentTopic} (${contentType})`;

                section.lectures.push({
                    title: lectureTitle,
                    contents: [{ type: contentType, data: contentBody }],
                });
            }

            setSections(updatedSections);
            setOpen(false);
            setContentBody('')
            setContentTopic('');
            setDocumentTitle('');
        }
    };

    // Handle opening the edit dialog for a specific lecture
    const handleEditLectureClick = (sectionIndex, lectureIndex) => {
        const lecture = sections[sectionIndex].lectures[lectureIndex];
        setEditLectureIndex(lectureIndex);
        setEditLectureTitle(lecture.title);
        setEditLectureContents(lecture.contents);
        setSelectedSectionIndex(sectionIndex);
        setOpen(true); // Reuse the dialog for editing
    };

    // Handle submission of the edit dialog
    const handleEditDialogSubmit = (event) => {
        event.preventDefault();
        if (selectedSectionIndex !== null && editLectureIndex !== null) {
            const updatedSections = [...sections];
            const section = updatedSections[selectedSectionIndex];

            section.lectures[editLectureIndex] = {
                ...section.lectures[editLectureIndex],
                title: editLectureTitle,
                contents: editLectureContents,
            };

            setSections(updatedSections);
            setEditLectureIndex(null);
            setEditLectureTitle('');
            setEditLectureContents([]);
            setOpen(false);
        }
    };

    // Handle deleting a lecture
    // Handle deleting a lecture
    const handleDeleteLecture = (sectionIndex, lectureIndex) => {
        const updatedSections = [...sections];
        const section = updatedSections[sectionIndex];

        // Remove the lecture
        section.lectures.splice(lectureIndex, 1);

        // Renumber the remaining lectures
        section.lectures.forEach((lecture, index) => {
            lecture.title = `Lecture ${sectionIndex + 1}.${index + 1}: ${lecture.title.split(': ')[1]}`;
        });

        // Remove the section if there are no lectures left
        if (section.lectures.length === 0) {
            updatedSections.splice(sectionIndex, 1);
        }

        setSections(updatedSections);
    };
    // Handle deleting a section
    const handleDeleteSection = (sectionIndex) => {
        const updatedSections = sections.filter((_, index) => index !== sectionIndex);
        setSections(updatedSections);
    };

    // Handle the form submission
    const handleSubmit = () => {
        setCourseData({ ...courseData, sections });
        console.log('Form data submitted:', courseData);
    };

    useEffect(() => {
        console.log(sections);
    }, [sections]);

  
    return (
        <Box p={3} sx={{ maxWidth: "60vw", display: "flex", flexDirection: "column", marginLeft: "" }}>
            <Typography variant="h3" sx={{ fontWeight: "700" }} gutterBottom>
                Curriculum
            </Typography>

            {/* Sections */}
            {sections.map((section, sectionIndex) => (
                <Accordion key={sectionIndex} sx={{ minWidth: '80vw' }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="subtitle1" fontWeight="bold" sx={{ flex: 1 }}>
                            Section {sectionIndex + 1}: {section.title}
                        </Typography>
                        <IconButton
                            color="error"
                            onClick={() => handleDeleteSection(sectionIndex)}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </AccordionSummary>
                    <AccordionDetails sx={{ backgroundColor: '#f9f9f9', p: 2, width: '75vw' }}>
                        {/* Lectures */}
                        {section.lectures.map((lecture, lectureIndex) => (
                            <Box key={lectureIndex} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: '4px', backgroundColor: '#fff', minWidth: "75vw" }}>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Typography variant="subtitle1" sx={{ mb: 1, fontSize: "18px", fontWeight: "700", borderBottom: "1px solid black" }}>
                                        {lecture.title}
                                    </Typography>
                                    <Box>
                                        <IconButton
                                            color="warning"
                                            onClick={() => handleEditLectureClick(sectionIndex, lectureIndex)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton
                                            color="error"
                                            onClick={() => handleDeleteLecture(sectionIndex, lectureIndex)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                {lecture.contents.map((content, contentIndex) => (
                                    <Box key={contentIndex} sx={{ mb: 1 }}>
                                        <Typography variant="body2" sx={{ maxWidth: "60vw", color: "black" }}>
                                            {/* Render the content using dangerouslySetInnerHTML */}
                                            <div dangerouslySetInnerHTML={{ __html: content.data.replace(/<p>/g, '<p style="color:black;">') }}style={{ color: 'black' }}  />
                                        </Typography>
                                    </Box>
                                ))}
                            </Box>
                        ))}

                        <Button
                            variant="outlined"
                            sx={{ mt: 1, minWidth: '120px' }}
                            onClick={(event) => handleContentClick(event, sectionIndex)}
                        >
                            Add Content
                        </Button>
                    </AccordionDetails>
                </Accordion>
            ))}

            {/* Add New Section */}
            <Box mt={4} p={2} sx={{ border: '1px solid #ddd', borderRadius: 1, minWidth: "80vw" }}>
                <Typography variant="subtitle1" gutterBottom>
                    New Section:
                </Typography>
                <TextField
                    label="Enter a Title"
                    fullWidth
                    value={newSectionTitle}
                    onChange={(e) => setNewSectionTitle(e.target.value)}
                    sx={{ mb: 2 }}
                />
                <Button variant="contained" onClick={handleAddSection}>
                    Add Section
                </Button>
            </Box>

            {/* Dialog for Content Input or Editing */}
            <Dialog
                open={open}
                onClose={() => setOpen(false)}
                PaperProps={{
                    component: 'form',
                    onSubmit: editLectureIndex !== null ? handleEditDialogSubmit : handleDialogSubmit,
                }}
            >
                <DialogTitle>
                    {editLectureIndex !== null ? 'Edit Lecture' : `Add ${contentType} Content`}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {editLectureIndex !== null ? `Edit Lecture ${selectedSectionIndex + 1}.${editLectureIndex + 1}` : `Lecture ${selectedSectionIndex + 1}.${sections[selectedSectionIndex]?.lectures.length + 1}`}
                    </DialogContentText>
                    <TextField
                        autoFocus
                        required
                        margin="dense"
                        id="contentTopic"
                        label={`Title (${contentType})`}
                        fullWidth
                        value={editLectureIndex !== null ? editLectureTitle : contentTopic}
                        onChange={(e) => editLectureIndex !== null ? setEditLectureTitle(e.target.value) : setContentTopic(e.target.value)}
                    />
                    <ReactQuill
                        style={{ maxWidth: "60vw", minWidth: "60vw" }}
                        label={`Body (${contentType})`}
                        value={editLectureIndex !== null ? editLectureContents.map(c => c.data).join('\n') : contentBody}
                        onChange={(content) => {
                            if (editLectureIndex !== null) {
                                setEditLectureContents([{ type: 'Document', data: content }]);
                            } else {
                                setContentBody(content);
                            }
                        }}

                    />

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)}>Cancel</Button>
                    <Button type="submit">
                        {editLectureIndex !== null ? 'Save Changes' : 'Add Content'}
                    </Button>
                </DialogActions>
            </Dialog>

            {/* Content Type Selection Menu */}
            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
            >
                <MenuItem onClick={() => handleContentTypeSelect('Document')}>
                    Document
                </MenuItem>
                <MenuItem onClick={() => handleContentTypeSelect('Video')}>
                    Video
                </MenuItem>
            </Menu>
            <Button variant="contained" sx={{ minWidth: "100px", maxWidth: "100px", mt: 2 }} onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default CurriculumComponent;
