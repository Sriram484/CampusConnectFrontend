import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MailIcon from '@mui/icons-material/Mail';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavBar from './Navbar';
import "../Assets/CSS/Course.css"
import { Button, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { useTheme } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import { styled, alpha } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import "../Assets/CSS/AdminDashboard.css"
import { useCourseData } from './Context/CourseData';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import AdbIcon from '@mui/icons-material/Adb';
import AddchartIcon from '@mui/icons-material/Addchart';

import { HashLoader } from 'react-spinners';
import DahBoardReadMore from './DashBoardReadMore';
import BarChart from "./BarChart";
import { ImBlocked } from "react-icons/im";
import { MdReportGmailerrorred } from "react-icons/md";
import { MdReportProblem } from "react-icons/md";
import axios from 'axios';


const UserData = [
    {
        id: 1,
        year: "Amazon AWS Serverless APIs & Apps",
        userGain: 80000,
    },
    {
        id: 2,
        year: "Machine Learning and Algorithms",
        userGain: 45677,
    },
    {
        id: 3,
        year: "React - The Complete Guide",
        userGain: 78888,
    },
    {
        id: 4,
        year: "Complete Python Bootcamp",
        userGain: 90000,
    },
    {
        id: 5,
        year: "The Web Developer Bootcamp",
        userGain: 64300,
    },
    {
        id: 6,
        year: "Java Programming Masterclass",
        userGain: 4300,
    },
    {
        id: 7,
        year: "Data Science and Machine Learning Bootcamp",
        userGain: 64300,
    },
    {
        id: 8,
        year: "iOS 13 & Swift 5 - The Complete iOS App Development Bootcamp",
        userGain: 43800,
    },
    {
        id: 9,
        year: "The Complete Node.js Developer Course",
        userGain: 4300,
    },
    {
        id: 10,
        year: "The Complete SQL Bootcamp",
        userGain: 4300,
    },
];


const drawerWidth = 240;


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "black",//theme.palette.common.black
        color: theme.palette.common.white,
    },
}));

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    border: "1px solid black",
    maxWidth: "300px",
    minWidth: "300px",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginleft: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const iconMap = {
    "Course": <LibraryBooksIcon style={{ fontSize: "24px" }} />,
    "Users": <PersonIcon />,
    "Reported Users": <MdReportGmailerrorred style={{ fontSize: "24px" }} />,
    "Blocked Users": <MdReportProblem style={{ fontSize: "24px" }} />,
    "Enquiry": <EmailIcon style={{ fontSize: "24px" }} />,
    "Cost Management": <AttachMoneyIcon style={{ fontSize: "24px" }} />,
    "User Charts": <PersonIcon style={{ fontSize: "24px" }} />,
    "Course Charts": <AddchartIcon style={{ fontSize: "24px" }} />,
    "AI Key": <AdbIcon style={{ fontSize: "24px" }} />
};

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
const columns = [
    { id: 's.no', label: 'S.No', minWidth: 170 },
    { id: 'Course_Name', label: 'Name', minWidth: 200 },
    {
        id: 'Course_Author',
        label: 'Course Author',
        minWidth: 170,
        align: 'left',
    },
    {
        id: 'Ratings',
        label: 'Ratings',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toLocaleString('en-US'),
    },
    {
        id: 'Price',
        label: 'Price',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'NoOfCustomers',
        label: 'No Of Customers',
        minWidth: 270,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'Image',
        label: 'Image',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 170,
        align: 'left',
        format: (value) => value.toFixed(2),
    },
];

const reportedColumns = [
    { id: 's.no', label: 'S.No', minWidth: 170 },
    { id: 'reportedBy', label: 'ReportedBy', minWidth: 150 },
    { id: 'reportedPersonName', label: 'ReportedPerson', minWidth: 150 },
    { id: 'reportedReview', label: 'ReportedReview', minWidth: 200 },
    { id: 'reportedReason', label: 'Reason', minWidth: 200 },
    { id: 'reportedOn', label: 'ReportedOn', minWidth: 200 },
    { id: 'action', label: 'Action', minWidth: 200 },

];
const blockedColumns = [
    { id: 's.no', label: 'S.No', minWidth: 170 },
    { id: 'name', label: 'User Name', minWidth: 150 },
    { id: 'email', label: 'Email', minWidth: 150 },
    { id: 'blockedOn', label: 'Blocked Date', minWidth: 150 },

];

function AdminDashboard() {
    //Side DashBoard
    const [selectedItem, setSelectedItem] = React.useState('Course');

    const handleItemClick = (item) => {
        setSelectedItem(item);
        console.log(selectedItem);

    };

    //ReportedData
    const [reportedData, setReportedData] = React.useState([]);

    const fetchReportedPerson = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(` http://localhost:1010/admin/api/reports/get`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                })
            console.log(response);
            setReportedData(response.data);

        } catch (err) {
            throw err;
        }

    }
    React.useEffect(() => {
        fetchReportedPerson()
    }, [])
    React.useEffect(() => {

        console.log(reportedData);

    }, [reportedData,selectedItem])

    //Reported Search Bar

    const [searchReportTerm, setSearchReportTerm] = React.useState('');
    const [filteredReportedUsers, setFilteredReportedUsers] = React.useState(reportedData);

    const handleSearchReportChange = (event) => {
        console.log(event.target.value);

        setSearchReportTerm(event.target.value);
    };
    React.useEffect(() => {
        const filteredUsers = reportedData.filter(user =>
            reportedColumns.some(column =>
                user[column.id] ? user[column.id].toString().toLowerCase().includes(searchReportTerm.toLowerCase()) : false
            )
        );
        setFilteredReportedUsers(filteredUsers);
    }, [searchReportTerm, reportedData, reportedColumns]);

    //Reported Function
    const handleBlockButton = async (row) => {
        console.log(reportedData);
        console.log(row);
        const token = localStorage.getItem("token");

        try {
            const response = await axios.post(
                `http://localhost:1010/admin/api/blocked/block/${row.reportedUserId}`,
                {},  // No data payload needed for this request
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            fetchReportedPerson()
        } catch (err) {
            console.error(err);
        }
    };
    const handleDeleteClick = async (row) => {
        console.log("Reported Data:", reportedData);
        console.log("Row Data:", row);
        const token = localStorage.getItem("token");
        console.log("Token:", token);
    
        try {
            const response = await axios.delete(
                `http://localhost:1010/admin/api/reports/${row.reportedUserId}`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log("Response:", response);
            fetchReportedPerson();
        } catch (err) {
            console.error("Error:", err.response);
            if (err.response && err.response.status === 403) {
                console.error("Authorization error: Access is forbidden. Check your token and permissions.");
            } else {
                console.error("An unexpected error occurred:", err);
            }
        }
    };
    


    //Blocked Data

    const [blockedData, setBlockedData] = React.useState([]);
    React.useEffect(() => {

        const fetchBlockedPerson = async () => {
            const token = localStorage.getItem("token");
            try {
                const response = await axios.get(`http://localhost:1010/admin/api/blocked/getBlockedUser`,
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    })
                setBlockedData(response.data);
                
                
            } catch (err) {
                throw err;
            }

        }
        fetchBlockedPerson()
    }, [selectedItem])
    React.useEffect(() => {

        console.log(blockedData);

    }, [blockedData])


    //Blocked Search Bar
    const [searchBlockedTerm, setSearchBlockedTerm] = React.useState('');
    const [filteredBlockedUsers, setFilteredBlockedUsers] = React.useState(blockedData);

    const handleSearchBlockedChange = (event) => {
        console.log(event.target.value);

        setSearchBlockedTerm(event.target.value);
    };

    React.useEffect(() => {
        const filteredUsers = blockedData.filter(user =>
            blockedColumns.some(column =>
                user[column.id] ? user[column.id].toString().toLowerCase().includes(searchBlockedTerm.toLowerCase()) : false
            )
        );
        setFilteredBlockedUsers(filteredUsers);
    }, [searchBlockedTerm, blockedData, blockedColumns]);






    const theme = useTheme();
    const { CourseDatabase, courseCategories } = useCourseData()
    const [courseName, setCourseName] = React.useState(courseCategories[0].name);
    const [userData, setUserData] = React.useState({
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
                options: {
                    scales: {
                        scaleFontColor: "#fa0",
                        datasetStrokeWidth: 1,
                        scaleShowLabels: false,
                        animation: false,
                        bezierCurve: true,
                        scaleStartValue: 0,
                    }
                }
            },
        ],
    });
    

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearchChange = (event) => {
        console.log(event);
        setSearchTerm(event.target.value);
    };






    const handleSelectChange = (event) => {
        const {
            target: { value },
        } = event;
        setCourseName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [loading, setLoading] = React.useState(false)

    React.useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000);

    }, [])


    const [editMode, setEditMode] = React.useState(null);
    const [editedRows, setEditedRows] = React.useState(CourseDatabase[courseName]);


    React.useEffect(() => {
        const filteredRows = CourseDatabase[courseName].filter(row =>
            columns.some(column =>
                row[column.id] ? row[column.id].toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
            )
        );
        setEditedRows(filteredRows);
    }, [searchTerm, CourseDatabase, columns, courseName]);

    const handleEditClick = (index) => {
        setEditMode(index);
    };

    const handleSaveClick = (index) => {
        setEditMode(null);
    };

    const handleRowChange = (index, columnId, value) => {
        const updatedRows = editedRows.map((row, rowIndex) =>
            rowIndex === index ? { ...row, [columnId]: value } : row
        );
        setEditedRows(updatedRows);
    };


    return (
        <>
            <div style={{
                visibility: loading ? 'visible' : 'hidden',
                display: loading ? 'flex' : 'none',
                justifyContent: "center",
                alignItems: "center",
                position: 'fixed', // Fix the position of the loader
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: 'rgba(255, 255, 255)', // Optional: Add a background color with opacity
                zIndex: 9999, // Ensure it appears above other content
            }}>
                <HashLoader

                />
            </div>
            <Box sx={{
                display: 'flex', minHeight: "80vh", visibility: loading ? 'hidden' : 'visible', maxHeight: "80vh"
            }}>
                <NavBar />
                <Drawer
                    variant="permanent"
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        marginTop: "64px",
                        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', marginTop: "64px" },
                    }}
                >
                    <Box sx={{ overflow: 'auto' }}>
                        <List>
                            {['Course', 'Reported Users', 'Blocked Users', 'Cost Management'].map((text) => (
                                <ListItem
                                    key={text}
                                    disablePadding
                                    selected={selectedItem === text} // Optional: highlight the selected item
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
                        <List>
                            {['User Charts', 'Course Charts', 'AI Key'].map((text, index) => (
                                <ListItem
                                    key={text}
                                    disablePadding
                                    selected={selectedItem === text} // Optional: highlight the selected item
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
                    </Box>
                </Drawer>
                <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: "64px" }}>

                    <div className='Admin-Dashboard-Container'>
                        <div className='Admin-Dashboard-Heading'>
                            {selectedItem}
                        </div>

                        {selectedItem === "Course" && <div className='Admin-Dashboard-Body'>
                            <div className='Admin-Dashboard-Selector'>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    sx={{ width: "300px", marginTop: "23px" }}
                                    value={courseName}
                                    onChange={handleSelectChange}
                                    // input={<OutlinedInput label="Name" />}
                                    MenuProps={MenuProps}
                                    placeholder='Select the course'
                                >
                                    {courseCategories.map(({ id, name }) => (
                                        <MenuItem
                                            key={name}
                                            value={name}
                                        >
                                            {name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className='Admin-Dashboard-SearchBar'>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={handleSearchChange}
                                    />
                                </Search>
                            </div>
                        </div>
                        }
                        {selectedItem === "Reported Users" && <div className='Admin-Dashboard-Body'>
                            <div className='Admin-Dashboard-Reported-SearchBar'>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={handleSearchReportChange}
                                    />
                                </Search>
                            </div>
                        </div>
                        }
                        {selectedItem === "Blocked Users" && <div className='Admin-Dashboard-Body'>
                            <div className='Admin-Dashboard-Reported-SearchBar'>
                                <Search>
                                    <SearchIconWrapper>
                                        <SearchIcon />
                                    </SearchIconWrapper>
                                    <StyledInputBase
                                        placeholder="Search…"
                                        inputProps={{ 'aria-label': 'search' }}
                                        onChange={handleSearchBlockedChange}
                                    />
                                </Search>
                            </div>
                        </div>
                        }


                    </div>

                    <Box>
                        {selectedItem === "Course" &&
                            <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "10px", height: "auto" }}>
                                <TableContainer sx={{ maxHeight: 440 }}>
                                    <Table stickyHeader aria-label="sticky table">
                                        <TableHead sx={{ backgroundColor: "black", color: "white" }}>
                                            <TableRow sx={{ backgroundColor: "black", color: "white" }}>
                                                {columns.map((column) => (
                                                    <StyledTableCell
                                                        key={column.id}
                                                        align={column.align}
                                                        style={{ minWidth: column.minWidth }}
                                                    >
                                                        {column.label}
                                                    </StyledTableCell>
                                                ))}
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {editedRows.map((row, index) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        let value = row[column.id];
                                                        if (column.id === 's.no') {
                                                            value = index + 1;
                                                        }

                                                        return (
                                                            <TableCell key={column.id} align={column.align}>
                                                                {editMode === index ? (
                                                                    column.id === 'action' ? (
                                                                        <div>
                                                                            <Button onClick={() => handleSaveClick(index)}>Save</Button>
                                                                        </div>
                                                                    ) : column.id === 'Image' ? (
                                                                        <div>
                                                                            <TextField
                                                                                value={value}
                                                                                onChange={(e) => handleRowChange(index, column.id, e.target.value)}
                                                                            />
                                                                        </div>
                                                                    ) : (
                                                                        <TextField
                                                                            value={value}
                                                                            onChange={(e) => handleRowChange(index, column.id, e.target.value)}
                                                                        />
                                                                    )
                                                                ) : column.id === 'action' ? (
                                                                    <div>
                                                                        <Button onClick={() => handleEditClick(index)}>Edit</Button>
                                                                        <Button onClick={() => handleDeleteClick(index)}>Delete</Button>
                                                                    </div>
                                                                ) : column.id === 'Image' ? (
                                                                    <div>
                                                                        <img src={`${value}`} alt="img" />
                                                                    </div>
                                                                ) : (
                                                                    column.format && typeof value === 'number'
                                                                        ? column.format(value)
                                                                        : value
                                                                )}
                                                            </TableCell>
                                                        );
                                                    })}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        }



                    </Box>
                    <Box>
                        {selectedItem === "Reported Users" &&
                            <div className='ReportedTable'>
                                <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "10px" }} >
                                    <TableContainer sx={{ maxHeight: "80vh" }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead sx={{ backgroundColor: "black", color: "white" }}>
                                                <TableRow sx={{ backgroundColor: "black", color: "white" }}>
                                                    {reportedColumns.map((column) => (
                                                        <StyledTableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </StyledTableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredReportedUsers
                                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, index) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                                                {reportedColumns.map((column) => {
                                                                    let value;
                                                                    if (column.id === 's.no') {
                                                                        value = index + 1;
                                                                    }
                                                                    else {
                                                                        value = row[column.id];

                                                                    }
                                                                    return (
                                                                        <TableCell key={column.id}
                                                                            sx={{
                                                                                alignItems: "flex-start",
                                                                                justifyContent: "flex-start",
                                                                                padding: "16px",
                                                                                textAlign: "start",
                                                                            }}
                                                                        >
                                                                            {column.id === 'action' ? (
                                                                                <div>
                                                                                    <Button onClick={() => { handleBlockButton(row) }}>Block</Button>
                                                                                    <Button onClick={() => { handleDeleteClick(row) }}>Reject</Button>
                                                                                </div>
                                                                            ) : column.id === 'ReportedReview' || column.id === 'Reason' ? (
                                                                                <DahBoardReadMore text={value} maxWords={10} />
                                                                            ) : (
                                                                                value
                                                                            )}
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </div>}



                    </Box>
                    <Box>
                        {selectedItem === "Blocked Users" &&
                            <div className='BlockedTable'>
                                <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "10px" }} >
                                    <TableContainer sx={{ maxHeight: "80vh" }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead sx={{ backgroundColor: "black", color: "white" }}>
                                                <TableRow sx={{ backgroundColor: "black", color: "white" }}>
                                                    {blockedColumns.map((column) => (
                                                        <StyledTableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ minWidth: column.minWidth }}
                                                        >
                                                            {column.label}
                                                        </StyledTableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {filteredBlockedUsers
                                                    // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row, index) => {
                                                        return (
                                                            <TableRow hover role="checkbox" tabIndex={-1} key={row.code} >
                                                                {blockedColumns.map((column) => {
                                                                    let value;
                                                                    if (column.id === 's.no') {
                                                                        value = index + 1;
                                                                    }
                                                                    else {
                                                                        value = row[column.id];
                                                                        console.log(column);

                                                                    }
                                                                    return (
                                                                        <TableCell key={column.id}
                                                                            sx={{
                                                                                alignItems: "flex-start",
                                                                                justifyContent: "flex-start",
                                                                                padding: "16px",
                                                                                textAlign: "start",
                                                                            }}
                                                                        >
                                                                            {column.id === 'action' ? (
                                                                                <div>
                                                                                    <Button>Block</Button>
                                                                                    <Button>Reject</Button>
                                                                                </div>
                                                                            ) : column.id === 'ReportedReview' || column.id === 'Reason' ? (
                                                                                <DahBoardReadMore text={value} maxWords={10} />
                                                                            ) : (
                                                                                value
                                                                            )}
                                                                        </TableCell>
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Paper>
                            </div>}



                    </Box>
                    <Box>
                        {
                            selectedItem === "Course Charts" &&
                            <div style={{ width: "80vw" }}>
                                <BarChart chartData={userData} />
                            </div>
                        }
                    </Box>

                </Box>

            </Box>
        </>
    );
}



export default AdminDashboard;
