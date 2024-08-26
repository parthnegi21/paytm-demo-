import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [firstname, setFirstname] = useState("user");
  const [lastname, setLastname] = useState("user");
  const [username, setUsername] = useState("user@user");

  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/'); // Redirect to login if no token is found
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/account/balance', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setData(response.data.balance);
      } catch (error) {
        console.error('Error fetching data:', error);
        navigate('/'); // Redirect to login if fetching data fails (e.g., token expired)
      }
    };

    fetchData();
  }, [navigate]);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
    
      try {
        const response = await axios.get("http://localhost:3000/user/info", {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setFirstname(response.data.user.firstname);
        setLastname(response.data.user.lastname);
        setUsername(response.data.user.username);
      } catch (error) {
        console.error('Error fetching user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get("http://localhost:3000/user/bulk?filter=" + filter, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
        setUsers(response.data.users);
      } catch (error) {
        console.error('Error fetching all users:', error);
      }
    };

    fetchAllUsers();
  }, [filter]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const goToTransfer = (user) => {
    // Create query parameters
    const queryParams = new URLSearchParams({
      id: user._id,
      name: user.firstname
    }).toString();
    
    // Navigate to the new route with query parameters
    navigate(`/transfer?${queryParams}`);
  };

  return (
    <>
      <div className="px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-xl pt-3 text-gray-700">negiPays App</div>
          <div className="flex items-center space-x-4 mt-3 mb-2">
            <div className="flex rounded-full border-inherit cursor-pointer border-2 bg-green-500 text-2xl items-center justify-center font-semibold w-12 h-12 md:w-10 md:h-10">
              {username.charAt(0).toUpperCase()}
            </div>
            <div className="flex flex-col text-center md:text-left">
              <div className="font-semibold text-xl">{firstname} {lastname}</div>
              <div className="text-sm">{username}</div>
              <div onClick={handleLogout} className="mt-2 px-4 py-2 rounded bg-gray-500 text-white font-semibold hover:bg-gray-700 cursor-pointer">
                Log out
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gray-300 mt-5 w-full h-0.5"></div>

        <div className="text-gray-900 font-semibold text-xl mt-5 mx-4 md:mx-10">
          Your balance: ₹ {data !== null ? data.toFixed(2) : 'Loading...'}
        </div>
        <div className="text-gray-900 font-semibold text-xl mt-5 mx-4 md:mx-10">Users</div>

        <input onChange={(e) => setFilter(e.target.value)}
          className="shadow appearance-none border rounded w-full md:w-11/12 py-2 px-4 mx-4 md:mx-7 mt-3 text-gray-700 leading-tight font-semibold focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Search Users..."
        />

        <div className="flex flex-col mx-4 md:mx-10 mt-5 space-y-8">
          {users.map((user, index) => (
            <div key={index} className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center w-full md:w-auto">
                <div className="flex rounded-full bg-slate-500 w-12 h-12 border-inherit border-2 text-2xl items-center justify-center font-semibold bg-gray-300 mr-4">
                  {user.firstname ? user.firstname.charAt(0).toUpperCase() : ''}
                </div>
                <div className="flex flex-col">
                  <div className="text-xl">{user.firstname} {user.lastname}</div>
                  <div className="text-sm">{user.username}</div>
                </div>
              </div>

              <div onClick={() => goToTransfer(user)} className="bg-gray-700 cursor-pointer hover:bg-gray-900 text-white w-full md:w-28 rounded h-8 flex items-center justify-center mt-4 md:mt-0">
                Send Money
              </div>
              
            </div>
            
          ))}
          
        </div>
      </div>
    </>
  );
};

export default Dashboard;
