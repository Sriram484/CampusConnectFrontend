import React, { useEffect, useRef, useState } from "react";
import ProfilePic from "../Assets/Image/courseBg.jpg";
import { Alert, Box, Button, Checkbox, FormControlLabel, Input, InputAdornment, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";

import "../Assets/CSS/Profile.css"
import { useFormData } from "./Context/UserData";
import { HashLoader } from "react-spinners";
import Avatar from '@mui/material/Avatar';
import axios from "axios";
import ImageVideoPlaceholder from "../Assets/Image/ImageVideoPlaceholder.jpg";

const Profile = () => {
    //  Account
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [alert, setAlert] = useState({ message: '', severity: 'success' });

    const handleSavePassword = async () => {

        if (currentPassword !== confirmNewPassword) {
            setAlert({ message: 'New passwords do not match!', severity: 'error' });
            setConfirmNewPassword("");
            setNewPassword("");
            setCurrentPassword("")
            return;
        }
        console.log("%");

        try {
            // Retrieve the token from localStorage
            const token = localStorage.getItem('token');
            console.log(token);


            // Make the API request using axios
            const response = await axios.post('http://localhost:1010/adminuser/reset-password', {
                email: formData.userEmailId,       // Include the email in the request body
                currentPassword,   // Include the current password
                newPassword        // Include the new password
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Include the token in the Authorization header
                },
            });



            // Handle the response
            if (response.status === 200) {
                setAlert({ message: 'Password successfully updated!', severity: 'success' });
                setConfirmNewPassword("");
                setNewPassword("");
                setCurrentPassword("")
            } else {
                setAlert({ message: response.data.message || 'Failed to update password.', severity: 'error' });
                setConfirmNewPassword("");
                setNewPassword("");
                setCurrentPassword("")
            }
        } catch (error) {
            console.log(error);
            setAlert({ message: 'An error occurred while updating the password.', severity: 'error' });
        }
    };
    useEffect(() => {
        console.log(currentPassword);

    }, [currentPassword])

    // Clear alert after 5 seconds
    useEffect(() => {
        if (alert.message) {
            const timer = setTimeout(() => setAlert({ message: '', severity: 'success' }), 5000);
            return () => clearTimeout(timer);
        }
    }, [alert.message]);

    const { formData, setFormData } = useFormData();

    const [loading, setLoading] = useState(false);
    const [currentProf, setCurrentProf] = useState("Profile");

    const fetchData = async () => {
        const token = localStorage.getItem("token");
        try {
            const response = await axios.get(
                `http://localhost:1010/adminuser/get-profile`,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );

            const userData = response.data.ourUsers;

            // Mapping the API response to formData structure
            const updatedFormData = {
                userId: userData.id,
                role: userData.role,
                userFirstName: userData.name,
                userLastName: userData.lastname,
                userHeadLine: userData.headline,
                userAboutYourself: userData.about,
                userWebsite: userData.website,
                userLinkedIn: userData.linkedIn,
                userTwitter: userData.twitter,
                userFaceBook: userData.faceBook,
                userYouTube: userData.youTube,
                userProfileImage: userData.userProfileImage, // Get profile image from API
                userEmailId: userData.email,
                userPassword: userData.password,
                userMobileNumber: userData.mobileNumber,
                blockedUsers: userData.blockedUsers,
                reportedUsers: userData.reportedUsers,
                isProfilePublic: userData.isProfilePublic
            };
            // Setting the updated formData
            setFormData(updatedFormData);
        } catch (err) {
            console.error(err);
        }
    };
    useEffect(() => {

        fetchData();
        console.log(formData);

    }, []);


    useEffect(() => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 3000);

    }, [])
    useEffect(() => {

    }, [currentProf])

    const fileInputRef = useRef(null);

    // Function to handle button click
    const handleButtonClick = () => {
        if (fileInputRef.current) {
            // Programmatically click the file input to open the file dialog
            fileInputRef.current.querySelector('input').click();
            console.log(fileInputRef)
        }
    };

    const [selectedFile, setSelectedFile] = useState(formData.userProfileImage);

    // Handle file input change event
    const handleFileChange = (event, fieldName) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData(prevState => ({
                    ...prevState,
                    [fieldName]: base64String // Store Base64 string for preview
                }));
                setSelectedFile(base64String);
            };

            reader.readAsDataURL(file); // This will trigger the onloadend event



        }
    };



    const handleBasicInputChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
        console.log(formData);
    };

    const handleSave = async () => {
        console.log(formData);
        const token = localStorage.getItem('token');
        console.log(token);

        const dataToSend = {
            id: formData.userId,
            email: formData.userEmailId,
            name: formData.userFirstName,
            password: formData.userPassword,
            mobileNumber: formData.userMobileNumber,
            role: formData.role,
            lastname: formData.userLastName,
            headline: formData.userHeadLine,
            about: formData.userAboutYourself,
            website: formData.userWebsite,
            linkedIn: formData.userLinkedIn,
            twitter: formData.userTwitter,
            faceBook: formData.userFaceBook,
            youTube: formData.userYouTube,
            blockedUsers: formData.blockedUsers,
            reportedUsers: formData.reportedUsers,
            userProfileImage: formData.userProfileImage,
            isProfilePublic: formData.isProfilePublic
        };

        console.log(dataToSend);
        console.log(formData.userProfileImage);


        try {
            const response = await axios.put(
                ` http://localhost:1010/adminuser/update/${formData.userId}`,
                dataToSend,
                {
                    headers: { Authorization: `Bearer ${token}` }
                }
            );
            console.log(response.data);
        } catch (err) {
            console.error(err);
        }


    }

    // Check if profile image is available
    const hasProfileImage = formData.userProfileImage && formData.userProfileImage.trim() !== "";


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
            <div className="Profile-MainContainer" style={{ visibility: loading ? 'hidden' : 'visible' }}>

                <div className="Profile-Basic-Container">
                    <div className="Profile-Left">
                        <div className="Profile-PicContainer">
                            {/* <img src={ProfilePic} className="Profile-Pic-Container-Images" />*/}
                            <Avatar
                                sx={{
                                    backgroundColor: hasProfileImage ? "transparent" : "black", // Only apply black background if no image
                                    height: "120px",
                                    width: "120px",
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                                src={hasProfileImage ? formData.userProfileImage : null}
                                aria-label="avatar"
                            >
                                {!hasProfileImage && (
                                    <span style={{ fontSize: "32px", color: "white" }}>
                                        {formData.userFirstName.charAt(0)}
                                    </span>
                                )}
                            </Avatar>

                            <div className="ProfileName">{formData.userFirstName}</div>
                        </div>
                        <div className="Profile-Options">
                            <div onClick={() => { setCurrentProf("Profile") }} style={{
                                cursor: "pointer"
                                , backgroundColor: currentProf === "Profile" ? "#6a6f73" : "white",
                                color: currentProf === "Profile" ? "#fff" : "black",
                            }}>Profile</div>
                            <div onClick={() => { setCurrentProf("Pic") }} style={{
                                cursor: "pointer"
                                , backgroundColor: currentProf === "Pic" ? "#6a6f73" : "white",
                                color: currentProf === "Pic" ? "#fff" : "black",
                            }}>Photo</div>
                            <div onClick={() => { setCurrentProf("Account") }} style={{
                                cursor: "pointer"
                                , backgroundColor: currentProf === "Account" ? "#6a6f73" : "white",
                                color: currentProf === "Account" ? "#fff" : "black",
                            }}>Account Security</div>

                            <div onClick={() => { setCurrentProf("Privacy") }} style={{
                                cursor: "pointer"
                                , backgroundColor: currentProf === "Privacy" ? "#6a6f73" : "white",
                                color: currentProf === "Privacy" ? "#fff" : "black",
                            }}>Privacy</div>
                            <div onClick={() => { setCurrentProf("Notification") }} style={{
                                cursor: "pointer"
                                , backgroundColor: currentProf === "Notification" ? "#6a6f73" : "white",
                                color: currentProf === "Notification" ? "#fff" : "black",
                            }}>Notifications</div>

                            <div onClick={() => { setCurrentProf("Close") }} style={{
                                cursor: "pointer"
                                , backgroundColor: currentProf === "Close" ? "#6a6f73" : "white",
                                color: currentProf === "Close" ? "#fff" : "black",
                            }}>Close account</div>
                        </div>
                    </div>
                    <div className="Profile-Right">
                        {currentProf === "Profile" &&
                            <div className="Profile-Container">
                                <div className="Profile-Headings">
                                    <div className="Profile-MainHeading">
                                        Public profile
                                    </div>
                                    <div className="Profile-SubHeading">
                                        Add information about yourself
                                    </div>
                                </div>
                                <div className="Profile-Body">
                                    <div className="Profile-Basic-Body">
                                        <div className="Profile-Basic-Subheader">Basics:</div>
                                        <TextField
                                            name="userFirstName"
                                            label="First Name"
                                            variant="outlined"
                                            value={formData.userFirstName || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                        <TextField
                                            name="userLastName"
                                            label="Last Name"
                                            variant="outlined"
                                            value={formData.userLastName || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                        <TextField
                                            name="userHeadLine"
                                            label="Headline"
                                            variant="outlined"
                                            value={formData.userHeadLine || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                        <TextField
                                            name="userAboutYourself"
                                            label="About Yourself"
                                            value={formData.userAboutYourself || ""}
                                            onChange={handleBasicInputChange}
                                            multiline
                                            rows={4}
                                            sx={{ marginTop: "20px", marginBottom: "20px" }}
                                        />
                                    </div>
                                    <div className="Profile-Links-Body">
                                        <div className="Profile-Basic-Subheader" style={{ marginTop: "20px" }} >Links:</div>
                                        <TextField
                                            name="userWebsite"
                                            label="Your Website"
                                            variant="outlined"
                                            value={formData.userWebsite || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                        <TextField
                                            name="userLinkedIn"
                                            label="LinkedIn"
                                            variant="outlined"
                                            value={formData.userLinkedIn || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                        <TextField
                                            name="userTwitter"
                                            label="Twitter"
                                            variant="outlined"
                                            value={formData.userTwitter || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                        <TextField
                                            name="userFaceBook"
                                            label="FaceBook"
                                            variant="outlined"
                                            value={formData.userFaceBook || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                        <TextField
                                            name="userYouTube"
                                            label="YouTube"
                                            variant="outlined"
                                            value={formData.userYouTube || ""}
                                            onChange={handleBasicInputChange}
                                            sx={{ marginTop: "20px" }}
                                        />
                                    </div>
                                    <div className="Profile-Button">
                                        <Button
                                            onClick={handleSave}
                                            sx={{
                                                backgroundColor: "#2d2f31", // Default background color
                                                color: "#fff", // Default text color
                                                marginTop: "10px",
                                                "&:hover": {
                                                    backgroundColor: "#2d2f31", // Same as default to prevent change on hover
                                                    color: "#fff" // Same as default to prevent change on hover
                                                }
                                            }}
                                        >
                                            Save
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        }
                        {currentProf === "Pic" &&
                            <div className="Profile-Pic-Container">
                                <div className="Profile-Headings">
                                    <div className="Profile-MainHeading">Public profile</div>
                                    <div className="Profile-SubHeading">Add information about yourself</div>
                                </div>
                                <div className="Profile-Pic-Body">
                                    <div className="Profile-Pic-Preview">
                                        <div className="Profile-Pic-Subheader">Image Preview</div>
                                        <div className="Profile-Pic-Previewer-Body">
                                            {formData.userProfileImage ? (
                                                <img
                                                    src={formData.userProfileImage}
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
                                        </div>
                                    </div>
                                    <div className="Profile-Pic-ButtonContainer">
                                        <div className="Profile-Pic-Subheader">Add / Change Image</div>
                                        <div className="Profile-Pic-Control-Body">
                                            <Box sx={{ display: 'flex', alignItems: 'center', gap: "20%" }}>
                                                <Input
                                                    type="file"
                                                    accept=".jpg,.jpeg,.png"
                                                    id="course-image-upload"
                                                    onChange={(e) => handleFileChange(e, 'userProfileImage')}
                                                    ref={fileInputRef}
                                                    sx={{ display: 'none' }}
                                                />
                                                <Button
                                                    variant="contained"
                                                    component="span"
                                                    sx={{ mb: 1 }}
                                                    onClick={handleButtonClick}
                                                >
                                                    Choose Image
                                                </Button>
                                            </Box>
                                        </div>
                                        <div className="Profile-Button">
                                            <Button
                                                onClick={handleSave}
                                                sx={{
                                                    backgroundColor: "#2d2f31", // Default background color
                                                    color: "#fff", // Default text color
                                                    marginTop: "10px",
                                                    "&:hover": {
                                                        backgroundColor: "#2d2f31", // Same as default to prevent change on hover
                                                        color: "#fff" // Same as default to prevent change on hover
                                                    }
                                                }}
                                            >
                                                Save
                                            </Button>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        {
                            currentProf === "Account" &&
                            <div className="Profile-Account-Container">
                                <div className="Profile-Headings">
                                    <div className="Profile-MainHeading">
                                        Account
                                    </div>
                                    <div className="Profile-SubHeading">
                                        Edit your account settings and change your password here.
                                    </div>
                                </div>
                                {alert.message && <Alert severity={alert.severity}>{alert.message}</Alert>}

                                <div className="Profile-Account-Body">
                                    <div className="Profile-Email-Division">
                                        <div className="Profile-Email-Subheader">Email</div>
                                        <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="Enter Your Email" variant="outlined" value={formData.userEmailId || ""} sx={{ marginTop: "20px" }}
                                            onChange={(e) => setFormData({ ...formData, userEmailId: e.target.value })}
                                        />
                                    </div>
                                    <div className="Profile-Password-Division">
                                        <div className="Profile-Password-Subheader">Password</div>
                                        <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="Enter Your Password" variant="outlined" value={currentPassword} sx={{ marginTop: "20px" }} onChange={(e) => setCurrentPassword(e.target.value)} />
                                        <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="Renter Your Password" variant="outlined" value={confirmNewPassword} sx={{ marginTop: "20px" }} onChange={(e) => setConfirmNewPassword(e.target.value)} />
                                        <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="New Password" variant="outlined" value={newPassword} sx={{ marginTop: "20px" }} onChange={(e) => setNewPassword(e.target.value)} />
                                        <div className="Profile-Password-Button">
                                            <Button sx={{ backgroundColor: "#2d2f31", color: "#fff", marginTop: "10px" }} onClick={handleSavePassword}>Save</Button>
                                        </div>
                                    </div>
                                    <div className="Profile-Phone-Division">
                                        <div className="Profile-Mobile-Subheader">Mobile Number</div>
                                        <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="Mobile Number" variant="outlined" value={""} sx={{ marginTop: "20px" }} />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            currentProf === "Privacy" &&
                            <div className="Profile-Privacy-Container">
                                <div className="Profile-Headings">
                                    <div className="Profile-MainHeading">
                                        Privacy
                                    </div>
                                    <div className="Profile-SubHeading">
                                        Modify your privacy settings here.
                                    </div>
                                </div>
                                <div className="Profile-Privacy-Body">
                                    <div className="Profile-PrivacyButton-Division">
                                        <div className="Profile-Mobile-Subheader">Profile page settings</div>
                                        <FormControlLabel value="end" control={<Checkbox
                                            defaultChecked
                                            sx={{
                                                color: "black",
                                                '&.Mui-checked': {
                                                    color: "black",
                                                },
                                            }} />} label="Show your profile to logged-in users" labelPlacement="end" sx={{ color: "black" }} />
                                        <FormControlLabel value="end" control={<Checkbox
                                            defaultChecked
                                            sx={{
                                                color: "black",
                                                '&.Mui-checked': {
                                                    color: "black",
                                                },
                                            }}
                                        />} label="Show courses you're taking on your profile page" labelPlacement="end" sx={{ color: "black" }} />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            currentProf === "Notification" &&
                            <div className="Profile-Notification-Container">
                                <div className="Profile-Headings">
                                    <div className="Profile-MainHeading">
                                        Notifications
                                    </div>
                                    <div className="Profile-SubHeading">
                                        Turn promotional email notifications from Campus Connect on or off
                                    </div>
                                </div>
                                <div className="Profile-Notification-Body">
                                    <div className="Profile-PrivacyButton-Division">
                                        <div className="Profile-Mobile-Subheader">I want to receive:</div>
                                        <div className="Profile-Mobile-PromotionsItem">
                                            <div className="Profile-Mobile-Left">
                                                <Checkbox defaultChecked />
                                            </div>
                                            <div className="Profile-Mobile-Right">
                                                <div className="Profile-Mobile-Right-Headers">
                                                    Promotions, course recommendations, and helpful resources from Udemy.
                                                </div>
                                            </div>
                                        </div>
                                        <div className="Profile-Mobile-PromotionsItem">
                                            <div className="Profile-Mobile-Left">
                                                <Checkbox defaultChecked />
                                            </div>
                                            <div className="Profile-Mobile-Right">
                                                <div className="Profile-Mobile-Right-Headers">
                                                    Announcements from instructors whose course(s) I'm enrolled in.
                                                </div>
                                                <div className="Profile-Mobile-Right-Para">
                                                    To adjust this preference by course, leave this box checked and go to the
                                                    course dashboard and click on "Options" to opt in or out of specific announcements.
                                                </div>

                                            </div>
                                        </div>

                                        <Button sx={{ backgroundColor: "#2d2f31", color: "#fff", marginTop: "10px", maxWidth: "100px" }}>Save</Button>
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            currentProf === "Close" &&
                            <div className="Profile-Close-Account-Container">
                                <div className="Profile-Headings">
                                    <div className="Profile-MainHeading">
                                        Close Account
                                    </div>
                                    <div className="Profile-SubHeading">
                                        To Close your account permanently.
                                    </div>
                                </div>
                                <div className="Profile-Close-Account-Body">
                                    <div className="Profile-Close-Account-Item">
                                        Warning: If you close your account, you will be unsubscribed from all {122} of your courses and will lose access to your account and data
                                        associated with your account forever, even if you choose to create a new account using the same email address in the future.
                                    </div>
                                    <div className="Profile-Close-Account-Item">
                                        Please note, if you want to reinstate your account after submitting a deletion request, you will
                                        have 14 days after the initial submission date to reach out to privacy@udemy.com to cancel this request.
                                    </div>
                                    <div className="Profile-Close-Account-Item">
                                        <Button sx={{ backgroundColor: "#2d2f31", color: "#fff", marginTop: "10px" }}>Close Account</Button>
                                    </div>

                                </div>
                            </div>
                        }
                    </div>
                </div>

            </div>
        </>
    );

};

export default Profile;
