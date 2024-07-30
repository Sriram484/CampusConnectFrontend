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
import { Button, MenuItem, OutlinedInput, Select } from '@mui/material';
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
import { HashLoader } from 'react-spinners';
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
    "Course": <LibraryBooksIcon />,
    "Users": <PersonIcon />,
    "Enquiry": <EmailIcon />,
    "Cost Management": <AttachMoneyIcon />,
    "User Charts": <PersonIcon />,
    "Course Charts": <LibraryBooksIcon />,
    "AI Key": <AdbIcon />
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
        format: (value) => value.toLocaleString('en-US'),
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



function AdminDashboard() {

    const theme = useTheme();
    const { CourseDatabase, courseCategories } = useCourseData()
    const [courseName, setCourseName] = React.useState(courseCategories[0].name);


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setCourseName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    const [searchTerm, setSearchTerm] = React.useState('');

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        console.log(searchTerm);
    };

    const filteredRows = CourseDatabase[courseName]
        .filter(row =>
            columns.some(column =>
                row[column.id] ? row[column.id].toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
            )
        );

        const [loading, setLoading] = React.useState(false)

        React.useEffect(() => {
            setLoading(true);
    
            setTimeout(() => {
                setLoading(false);
            }, 3000);
    
        }, [])


    return (
        <>
             <div  style={{
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
                display: 'flex', minHeight: "110vh",visibility: loading ? 'hidden' : 'visible',
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
                            {['Course', 'Users', 'Enquiry', 'Cost Management'].map((text) => (
                                <ListItem key={text} disablePadding>
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
                                <ListItem key={text} disablePadding>
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
                            Course Dashboard
                        </div>

                        <div className='Admin-Dashboard-Body'>
                            <div className='Admin-Dashboard-Selector'>
                                <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    sx={{ width: "300px", marginTop: "23px" }}
                                    value={courseName}
                                    onChange={handleChange}
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

                        <div className='Admin-Dashboard-Body'>

                        </div>


                    </div>

                    <Box>

                        <Paper sx={{ width: '100%', overflow: 'hidden', marginTop: "10px" }}>
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
                                        {filteredRows
                                            // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                                return (
                                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                        {columns.map((column) => {
                                                            let value;
                                                            if (column.id === 's.no') {
                                                                value = index + 1;
                                                            }
                                                            else {
                                                                value = row[column.id];
                                                            }
                                                            return (
                                                                <TableCell key={column.id} align={column.align}>
                                                                    {column.id === 'action' ? (
                                                                        <div>
                                                                            <Button >Edit</Button>
                                                                            <Button >Delete</Button>
                                                                        </div>
                                                                    ) :
                                                                        column.id === 'Image' ?
                                                                            (
                                                                                <div>
                                                                                    <img src={`${value}`} />
                                                                                </div>
                                                                            )
                                                                            :
                                                                            (
                                                                                column.format && typeof value === 'number'
                                                                                    ? column.format(value)
                                                                                    : value
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
                            {/* <TablePagination
                            rowsPerPageOptions={[10, 25, 100]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                        /> */}
                        </Paper>


                    </Box>

                </Box>

            </Box>
        </>
    );
}



export default AdminDashboard;
