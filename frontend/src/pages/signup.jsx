import Input from "../components/inputs";
import Heading from "../components/heading";
import Subheading from "../components/subheading";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Signup = () => {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const validatePassword = (password) => {
        if (password && password.length < 8) {
            return "Password should be at least 8 characters long";
        } else {
            return '';
        }
    };

    useEffect(() => {
        const checkTokenValidity = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const response = await axios.get("http://localhost:3000/user/check", {
                        headers: {
                            'Authorization': `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        }
                    });

                    if (response.data) {
                        navigate('/dashboard');
                    }
                }
            } catch (error) {
                console.error('Token check failed:', error);
            }
        };

        checkTokenValidity();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationMessage = validatePassword(password);
        if (validationMessage) {
            setMessage(validationMessage);
            return;
        }

        if (!username || !firstname || !lastname || !password) {
            setMessage("All fields are required");
            return;
        }

        try {
            const response = await axios.post("http://localhost:3000/user/signup", {
                username,
                firstname,
                lastname,
                password
            });

            localStorage.setItem("token", response.data.token);
            navigate('/dashboard');
        } catch (error) {
            console.error("Signup error:", error);
            if (error.response && error.response.data) {
                setMessage(error.response.data.msg || "Signup failed");
            } else {
                setMessage("An unexpected error occurred");
            }
        }
    };

    const goToSignIn = () => {
        navigate('/signin');
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="flex bg-white justify-center shadow-2xl rounded-2xl" style={{ width: "40vh", height: "65vh" }}>
                <form className="w-full p-6" onSubmit={handleSubmit}>
                    <Heading label="Sign Up" />
                    <Subheading label="Enter your information to create an account" />
                    
                    <Input 
                        label="Username" 
                        id="username" 
                        placeholder="Enter your username" 
                        type="email" 
                        onchange={(e) => setUsername(e.target.value)} 
                        autocomplete="username" 
                    />
                    <Input 
                        label="First Name" 
                        id="first" 
                        placeholder="Enter your First Name" 
                        type="text" 
                        onchange={(e) => setFirstname(e.target.value)} 
                        autocomplete="given-name" 
                    />
                    <Input 
                        label="Last Name" 
                        id="last" 
                        placeholder="Enter your Last Name" 
                        type="text" 
                        onchange={(e) => setLastname(e.target.value)} 
                        autocomplete="family-name" 
                    />
                    <Input 
                        label="Password" 
                        id="password" 
                        placeholder="Enter your password" 
                        type="password" 
                        onchange={(e) => setPassword(e.target.value)} 
                        autocomplete="current-password" 
                    />
                    <div className="flex flex-col text-sm text-red-500 mt-1">
                        {message}
                    </div>

                    <div className="flex items-center justify-between mt-1">
                        <button className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" style={{ width: "35vh" }} type="submit">
                            Sign Up
                        </button>
                    </div>
                    <div className="flex">
                        <div className="text-sm pt-2 pl-8">Already have an account? </div>
                        <div onClick={goToSignIn} className="text-sm pt-2 pl-1 text-blue-500 cursor-pointer hover:text-blue-700 underline">Sign In</div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
