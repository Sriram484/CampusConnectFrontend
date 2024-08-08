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
    { id: 'BlockedUserName', label: 'User Name', minWidth: 150 },
    { id: 'BlockedEmail', label: 'Email', minWidth: 150 },
    { id: 'BlockedDate', label: 'Blocked Date', minWidth: 150 },

];

const blockedData = [
    {
        BlockedUserName: 'John Doe',
        BlockedEmail: 'johndoe@example.com',
        BlockedDate: '2024-08-01',
    },
    {
        BlockedUserName: 'Jane Smith',
        BlockedEmail: 'janesmith@example.com',
        BlockedDate: '2024-07-28',
    },
    {
        BlockedUserName: 'Alice Johnson',
        BlockedEmail: 'alicej@example.com',
        BlockedDate: '2024-06-15',
    },
    {
        BlockedUserName: 'Bob Brown',
        BlockedEmail: 'bobbrown@example.com',
        BlockedDate: '2024-05-30',
    },
    {
        BlockedUserName: 'Charlie Black',
        BlockedEmail: 'charlieblack@example.com',
        BlockedDate: '2024-04-20',
    },
    {
        BlockedUserName: 'Emily White',
        BlockedEmail: 'emilywhite@example.com',
        BlockedDate: '2024-03-10',
    },
    {
        BlockedUserName: 'David Green',
        BlockedEmail: 'davidgreen@example.com',
        BlockedDate: '2024-02-05',
    },
    {
        BlockedUserName: 'Sophia Blue',
        BlockedEmail: 'sophiablue@example.com',
        BlockedDate: '2024-01-25',
    },
    {
        BlockedUserName: 'Michael Red',
        BlockedEmail: 'michaelred@example.com',
        BlockedDate: '2023-12-31',
    },
    {
        BlockedUserName: 'Laura Pink',
        BlockedEmail: 'laurapink@example.com',
        BlockedDate: '2023-11-20',
    },
];


const reportedata = [
    {
        ReportedBy: 'John Doe',
        ReportedPerson: 'Jane Smith',
        ReportedReview: 'The service was not satisfactory. I ordered a meal and had to wait over an hour before it was served. When it finally arrived, it was cold and unappetizing. The staff was inattentive and seemed overwhelmed despite the restaurant not being too busy. I requested to speak with a manager, but none were available. I feel my concerns were not taken seriously. This was a special occasion, and it was ruined due to poor service. I hope the management takes steps to improve their service quality in the future.',
        Reason: 'Poor Service: The establishment failed to meet the basic expectations of timely service and food quality. There appeared to be a lack of training or adequate staffing to handle orders promptly. Customer complaints were not addressed in a timely manner, indicating a lack of managerial oversight. Poor service often results in customer dissatisfaction, negative reviews, and loss of business. Addressing these issues promptly and effectively can help in improving customer satisfaction and business reputation. Continuous training and customer feedback can be invaluable in addressing such service-related issues and in retaining customer loyalty.',
        ReportedOn: '2024-08-01',
    },
    {
        ReportedBy: 'Alice Johnson',
        ReportedPerson: 'Bob Brown',
        ReportedReview: 'The product was defective. After using the item just once, it stopped functioning altogether. I followed all the instructions carefully, yet it still failed. I attempted to contact customer service multiple times but received no response. I had high expectations due to the brand’s reputation, but this experience has left me extremely disappointed. I have requested a replacement or a refund but have yet to receive a satisfactory response. This has been an inconvenient and frustrating experience, and I am not sure if I would consider purchasing from this brand again.',
        Reason: 'Defective Product: The item sold did not meet quality standards and failed during normal use. Defects can arise from manufacturing errors, poor quality materials, or inadequate quality control processes. Such issues can damage the reputation of a brand and result in lost customers. A comprehensive quality control system and prompt customer support are critical in addressing such issues. Offering returns, exchanges, or refunds can help maintain customer trust. Engaging in quality assurance practices can prevent defective products from reaching consumers, and regular feedback collection can aid in improving product quality.',
        ReportedOn: '2024-08-02',
    },
    {
        ReportedBy: 'Charlie Black',
        ReportedPerson: 'Emily White',
        ReportedReview: 'The customer service was rude and unprofessional. When I approached the service desk for assistance, the representative was dismissive and showed no interest in resolving my issue. Their tone was harsh and they made sarcastic remarks when I asked for clarification on the return policy. I felt humiliated in front of other customers. I expect courteous and professional behavior from staff, especially in a well-known store. This experience has tarnished my opinion of the brand, and I am hesitant to return. Professionalism and respect should be the cornerstone of any customer-facing role.',
        Reason: `Rude Behavior: The staff member displayed a lack of courtesy and professionalism towards the customer. Rude behavior can lead to dissatisfaction, complaints, and loss of repeat business. It's essential for businesses to train their employees in customer service etiquette and emphasize the importance of treating customers with respect. Addressing complaints swiftly and offering apologies or compensations can help repair relationships. Regular training and monitoring can ensure employees uphold the company’s standards. Encouraging a positive work environment and setting clear expectations can help in preventing such incidents in the future.`,
        ReportedOn: '2024-08-03',
    },
    {
        ReportedBy: 'David Green',
        ReportedPerson: 'Olivia Blue',
        ReportedReview: 'The delivery of my package was delayed significantly, arriving nearly two weeks after the expected delivery date. I did not receive any updates or notifications from the courier service regarding the delay. When I contacted customer support, I was placed on hold for an extended period and did not receive a satisfactory explanation. The delay caused significant inconvenience, as the package contained essential items needed urgently. I am considering using alternative services in the future. It’s crucial for companies to maintain transparent communication with their customers and provide timely updates on delivery statuses.',
        Reason: 'Late Delivery: The package was not delivered within the promised timeframe, causing inconvenience to the customer. Delays can occur due to various reasons, such as logistical issues, but effective communication and proactive measures can mitigate the impact. Providing real-time updates, offering compensation or expedited shipping for future orders can help maintain customer satisfaction. Building reliable delivery partnerships and employing efficient tracking systems are essential in preventing delays. Understanding customer priorities and maintaining transparency throughout the process can help build trust and ensure positive experiences, even when unforeseen delays occur.',
        ReportedOn: '2024-08-04',
    },
    {
        ReportedBy: 'Eve Brown',
        ReportedPerson: 'Chris Grey',
        ReportedReview: 'I received misleading information regarding a promotion. The advertisement stated that the discount was applicable store-wide, but when I attempted to use it, I was informed it only applied to select items. This lack of transparency was frustrating, and I felt deceived. The staff was unable to provide a clear explanation, further adding to my frustration. As a loyal customer, I expect honesty and clarity in all communications. Misleading advertising not only damages trust but also diminishes the overall shopping experience. Clear and accurate information is essential for maintaining customer trust.',
        Reason: `False Information: Misleading advertisements or unclear policies can erode customer trust and damage brand reputation. Ensuring all promotions and advertisements are clear, concise, and transparent can prevent misunderstandings and maintain customer satisfaction. It's important for businesses to train their staff to communicate promotional terms effectively and ensure all marketing materials are reviewed for accuracy. Addressing any misinformation promptly and compensating affected customers can help rebuild trust. Regularly reviewing and updating promotional strategies and communication channels can help in preventing similar issues and ensure a positive customer experience.`,
        ReportedOn: '2024-08-05',
    },
    {
        ReportedBy: 'Frank White',
        ReportedPerson: 'Nancy Black',
        ReportedReview: 'I encountered issues with pricing during my last purchase. The price listed on the shelf did not match the amount charged at the checkout. I brought this to the attention of the cashier, who seemed unaware and unhelpful. I had to wait for a supervisor to resolve the issue, which took an unreasonable amount of time. This discrepancy and the handling of the situation were disappointing. It’s important for stores to ensure pricing accuracy and train staff to handle such situations effectively. I expect better service and transparency in future transactions.',
        Reason: 'Overcharging: Pricing discrepancies can result from errors in labeling, system issues, or lack of communication between departments. Such issues can lead to customer dissatisfaction and mistrust. Implementing regular audits and training employees on pricing policies can help prevent overcharging incidents. Quick resolution of issues and offering apologies or compensation can mitigate negative impacts. Transparency and proactive measures are essential in maintaining customer trust. Ensuring pricing accuracy across all platforms and channels can prevent misunderstandings and ensure customers have a consistent and positive shopping experience, leading to customer loyalty and satisfaction.',
        ReportedOn: '2024-08-06',
    },
    {
        ReportedBy: 'George Blue',
        ReportedPerson: 'Sarah Green',
        ReportedReview: 'I witnessed unprofessional conduct from a staff member during my visit. They were using inappropriate language while speaking to another employee within earshot of customers. This behavior was unsettling and reflects poorly on the company. I expect a professional environment when visiting any establishment, and this experience was disappointing. It’s important for businesses to enforce strict conduct guidelines and ensure employees adhere to them. Unprofessional behavior can damage a company’s reputation and lead to customer loss. Businesses should prioritize creating a respectful and professional work environment to ensure a positive customer experience.',
        Reason: 'Unprofessional: Inappropriate behavior or language by staff members can tarnish a company’s image and result in customer complaints. Implementing clear conduct guidelines and providing regular training can help prevent such incidents. Encouraging a positive and respectful work environment can promote professionalism among employees. Addressing any incidents of unprofessional behavior promptly and effectively can mitigate damage and maintain customer trust. Fostering a culture of respect and accountability can ensure employees represent the company positively and maintain a high standard of service, contributing to a positive customer experience and brand reputation.',
        ReportedOn: '2024-08-07',
    },
    {
        ReportedBy: 'Hannah Pink',
        ReportedPerson: 'Tom Yellow',
        ReportedReview: 'The item I purchased was not as described on the website. The color and dimensions did not match the description or images, leading to disappointment upon delivery. I contacted customer service for clarification and was informed that there was an error in the listing. This experience was frustrating, as I relied on accurate descriptions for my purchase decision. It’s important for businesses to ensure product listings are accurate and up-to-date to prevent customer dissatisfaction. I hope the company reviews its processes to avoid such discrepancies in the future.',
        Reason: 'Misleading Description: Inaccurate product descriptions can lead to customer dissatisfaction and returns. Ensuring that all product information is accurate, including images and specifications, is crucial in maintaining customer trust. Regularly updating product listings and conducting quality checks can prevent misinformation. Promptly addressing any discrepancies and offering resolutions such as returns or exchanges can help maintain customer satisfaction. Implementing clear communication channels between product teams and customer service can ensure any issues are resolved efficiently. A commitment to transparency and accuracy in product descriptions is essential for customer retention and brand reputation.',
        ReportedOn: '2024-08-08',
    }
];




function AdminDashboard() {


    //ReportedData
    const [reportedData,setReportedData] = React.useState([]);
    React.useEffect(()=>{

        const fetchReportedPerson = async()=>{
            const token = localStorage.getItem("token");
            try{
                const response = await axios.get(` http://localhost:1010/adminuser/api/reports/get`, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
                console.log(response);
                setReportedData(response.data);
                
            }catch(err){
                throw err;
            }
        
        }
        fetchReportedPerson()
    },[])
    React.useEffect(()=>{

       console.log(reportedData);
       
    },[reportedData])

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

     const handleBlockButton=async(row)=>{
        console.log(reportedData);
        console.log(row);
        
        

        // try{
        //     const response = await axios.put(`http://localhost:1010/adminuser/api/reports/${row.}`, userData,
        //     {
        //         headers: {Authorization: `Bearer ${token}`}
        //     })
        //     return response.data;
        // }catch(err){
        //     throw err;
        // }
        
     }

   





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

    const [selectedItem, setSelectedItem] = React.useState('Course');

    const handleItemClick = (item) => {
        setSelectedItem(item);
        console.log(selectedItem);

    };

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
                                                                        <Button>Delete</Button>
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
                                                                                    <Button onClick={()=>{handleBlockButton(row)}}>Block</Button>
                                                                                    <Button>Reject</Button>
                                                                                </div>
                                                                            ) : column.id === 'ReportedReview' || column.id === 'Reason' ? (
                                                                                <DahBoardReadMore text={value} maxWords={50} />
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
                                                                                <DahBoardReadMore text={value} maxWords={50} />
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
