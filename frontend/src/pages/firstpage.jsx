import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Firstpage = () => {
  const navigate = useNavigate();

  const checkTokenValidity = async () => {
  
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      
  
      const response = await axios.get("http://localhost:3000/user/check", {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
  
      if(response.data){
        navigate('/dashboard')
      } // Handle the response data here
  
    
  };
  
  // Call the function to check token validity
  checkTokenValidity();

  const goToSignUp = () => {
    navigate('/signup');
  };

  const goToSignIn = () => {
    navigate('/signin');
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-gray-100 justify-center items-center">
        <div className="font-semibold text-2xl mb-8">
          Welcome to negiPays
        </div>
        <div className="flex space-x-6">
          <div
            className="flex justify-center items-center w-28 h-8 bg-blue-500 cursor-pointer hover:bg-blue-700 text-white rounded"
            onClick={goToSignUp}
          >
            Sign Up
          </div>
          <div
            className="flex justify-center items-center w-28 h-8 bg-blue-500 text-white cursor-pointer hover:bg-blue-700 rounded"
            onClick={goToSignIn}
          >
            Sign In
          </div>
        </div>
      </div>
    </>
  );
};

export default Firstpage;
