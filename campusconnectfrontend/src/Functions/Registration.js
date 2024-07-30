import axios from 'axios';
import { fetchUserData } from './Fetcher';


export async function checkUsernameAndEmail(username, email, url) {
    try {
        const url = "ss";
        // Fetch user data from the provided URL
        const userDataList = await fetchUserData(url);

        // Check if username or email already exists in the fetched user data
        const usernameExists = userDataList.map(user => user.userName === username);
        const emailExists = userDataList.map(user => user.email === email);

        // Check if any username or email matches
        const isUsernameExists = usernameExists.includes(true);
        const isEmailExists = emailExists.includes(true);

        return { usernameExists: isUsernameExists, emailExists: isEmailExists };
    } catch (error) {
        console.error("Error checking username and email:", error);
        throw new Error("Failed to check username and email");
    }
}

export async function handleRegistration(userData, setUserData, navigate) {
    try {
        const url = ""
        // Check if username or email already exists
        const { usernameExists, emailExists } = await checkUsernameAndEmail(userData.user_name, userData.email, url);

        // If either username already exists, show an alert
        if (usernameExists) {
            alert("Username already exists. Please choose a different one.");
            return; 
        }
        
        // If either email already exists, show an alert
        if (emailExists) {
            alert("Email already exists. Please choose a different one.");
            return; 
        }

        // Proceed with registration if username and email are unique
        const responseUser = await axios.post("https://riddle-romeo-login-api-8.onrender.com/api/v1/userData/save", {
            userName: userData.user_name,
            scoreId: "",
            name: userData.name,
            email: userData.email,
            password: userData.password,
            image: "",
            phone: "",
            country: "",
            birthDay: ""
        });

        const currentUserId = responseUser.data;

        const responseScore = await axios.post("https://riddle-romeo-login-api-8.onrender.com/api/v1/score/save", {
            userId: currentUserId,
            overAllScore: 0,
            weeklyScore: 0,
            eventScore: 0,
            rank: 0
        });

        const currentScoreId = responseScore.data;

        await axios.put(`https://riddle-romeo-login-api-8.onrender.com/api/v1/userData/edit/${currentUserId}`, {
            userName: userData.user_name,
            scoreId: currentScoreId,
            name: userData.name,
            email: userData.email,
            password: userData.password,
            phone: "",
            country: "",
            birthDay: ""
        });

        setUserData(prevState => ({
            user_name: "",
            name: "",
            email: "",
            password: ""
        }));

        navigate("/log");
    } catch (err) {
        console.error("User registration failed:", err);
        alert("User registration failed");
    }
}
