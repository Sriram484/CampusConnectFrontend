import React from "react";
import ProfilePic from "../Assets/Image/courseBg.jpg";
import { Button, InputAdornment, MenuItem, OutlinedInput, Select, TextField } from "@mui/material";
import { MuiFileInput } from 'mui-file-input'
import "../Assets/CSS/Profile.css"
import { useFormData } from "./Context/UserData";

const Profile = () => {

    const {formData} = useFormData();

    return (
        <div className="Profile-MainContainer">
            <div className="Profile-Basic-Container">
                <div className="Profile-Left">
                    <div className="Profile-PicContainer">
                        <img src={ProfilePic} className="Profile-Pic-Container-Images" />
                        <div className="ProfileName">{formData.name}</div>
                    </div>
                    <div className="Profile-Options">
                        <div>Profile</div>
                        <div>Photo</div>
                        <div>Account Security</div>
                        <div>Subscriptions</div>
                        <div>Payment methods</div>
                        <div>Privacy</div>
                        <div>Notifications</div>
                        <div>API clients</div>
                        <div>Close account</div>
                    </div>
                </div>
                <div className="Profile-Right">
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
                                <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="First Name" variant="outlined" value ={formData.name||""} sx={{ marginTop: "20px" }} />
                                <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="Last Name" variant="outlined" value ={formData.lastname||""}  sx={{ marginTop: "20px" }} />
                                <TextField id="outlined-basic" className="Profile-Basic-Body-Input" label="Headline" variant="outlined" value ={formData.headline||""} sx={{ marginTop: "20px" }} />
                                <TextField id="outlined-multiline-flexible" className="Profile-Basic-Body-Input" label="About Yourself" value ={formData.about||""} multiline rows={4} sx={{ marginTop: "20px",marginBottom:"20px" }} />
                                {/* <Select
                                    labelId="demo-multiple-name-label"
                                    id="demo-multiple-name"
                                    value="Sriram"
                                    input={<OutlinedInput label="Name" />}
                                    sx={{ marginTop: "20px" ,marginBottom:"20px"}} 
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select> */}
                            </div>
                            <div className="Profile-Links-Body">
                                <div className="Profile-Basic-Subheader" style={{ marginTop: "20px" }} >Links:</div>
                                <TextField id="outlined-basic" label="Your Website" variant="outlined" sx={{ marginTop: "20px" }} />
                                <TextField id="outlined-basic" label="LinkedIn" variant="outlined" sx={{ marginTop: "20px" }} />
                                <TextField id="outlined-basic" label="Twitter" variant="outlined" sx={{ marginTop: "20px" }} />
                                <TextField id="outlined-basic" label="FaceBook" variant="outlined" sx={{ marginTop: "20px" }} />
                                <TextField id="outlined-basic" label="YouTube" variant="outlined" sx={{ marginTop: "20px" }} />
                                {/* <OutlinedInput id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Email" sx={{ marginTop: "20px" }} />
                                <OutlinedInput id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>} label="LinkedIn" sx={{ marginTop: "20px" }} />
                                <OutlinedInput id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>} label="Twitter" sx={{ marginTop: "20px" }} />
                                <OutlinedInput id="outlined-adornment-amount"
                                    startAdornment={<InputAdornment position="start">$</InputAdornment>} label="YouTube" sx={{ marginTop: "20px" }} /> */}
                            </div>
                            <div className="Profile-Button">
                                <Button sx={{backgroundColor:"#2d2f31",color:"#fff",marginTop:"10px"}}>Save</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="Profile-Pic-Container">
                <div className="Profile-Headings">
                    <div className="Profile-MainHeading">
                        Public profile
                    </div>
                    <div className="Profile-SubHeading">
                        Add information about yourself
                    </div>
                </div>
                <div className="Profile-Pic-Body">
                    <div className="Profile-Pic-Preview">
                        <div className="Profile-Pic-Subheader">
                            Image Preview
                        </div>
                        <div className="Profile-Pic-Previewer-Body">

                        </div>
                    </div>
                    <div className="Profile-Pic-ButtonContainer">
                        <div className="Profile-Pic-Subheader">
                            Add / Change Image
                        </div>
                        <div className="Profile-Pic-Previewer-Body">
                            <MuiFileInput value="#" />
                        </div>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default Profile;
