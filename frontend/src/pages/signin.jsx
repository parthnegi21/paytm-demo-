import Input from "../components/inputs";
import Heading from "../components/heading";
import Subheading from "../components/subheading";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import axios from "axios";

const Signin = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");

    const navigate = useNavigate();

    const goToSignUp = () => {
        navigate('/signup');
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
                console.error('Token validation failed:', error);
                // Handle token validation errors, if needed
            }
        };

        checkTokenValidity();
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent default form submission

        try {
            const response = await axios.get("http://localhost:3000/user/signin", {
                headers: {
                    'Content-Type': 'application/json',
                
                username,
                password
          }  }, {
                
            });

            localStorage.setItem("token", response.data.token);
            console.log(response)
            navigate('/dashboard');
        } catch (error) {
            setMessage("Invalid username or password");
        }
    };

    return (
        <div className="flex justify-center items-center bg-gray-100 min-h-screen">
            <div className="flex bg-white justify-center shadow-2xl rounded-2xl" style={{ width: "40vh", height: "50vh" }}>
                <form className="w-full p-6" onSubmit={handleSubmit}>
                    <Heading label="Sign In" />
                    <Subheading label="Enter your credentials to sign in to your account" />
                    
                    <Input
                        label="Username"
                        id="username"
                        placeholder="Enter your username"
                        type="email"
                        onchange={(e) => setUsername(e.target.value)}
                        autocomplete="username"
                    />
                    <Input
                        label="Password"
                        id="password"
                        placeholder="Enter your password"
                        type="password"
                        onchange={(e) => setPassword(e.target.value)}
                        autocomplete="current-password"
                    />
                    
                    <div className="flex flex-col text-sm text-red-500 mt-2">
                        {message}
                    </div>

                    <div className="flex items-center justify-between mt-6">
                        <button
                            className="bg-gray-700 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            style={{ width: "35vh" }}
                            type="submit"
                        >
                            Sign in
                        </button>
                    </div>
                    <div className="flex">
                        <div className="text-sm pt-3 pl-8">Don't have an account? </div>
                        <div onClick={goToSignUp} className="text-sm pt-3 pl-1 text-blue-500 cursor-pointer hover:text-blue-700 underline">
                            Sign up
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
