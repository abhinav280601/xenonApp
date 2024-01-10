import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./assets/style.css";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Profile from "./Pages/Profile";
import Navbar from "./Components/Navbar";
import Home from "./Pages/Home";
import ContactUs from "./Pages/ContactUs";
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import { api } from "./assets/data";
import { useDispatch, useSelector } from "react-redux";
import { addUser, selectUserStatus } from "./Features/userSlice";
import axios from "axios";

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch();
  const user = useSelector(selectUserStatus);
  const getData = async () => {
    try {
      const apiUrl = `${api}getUser`;

      const { data } = await axios.get(apiUrl, { withCredentials: true });
      const userData = {
        name: data.name,
        email: data.username,
        phoneNumber: data.phoneNumber,
      };
      dispatch(addUser(userData));
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    getData(); // Fetch data when the component mounts
  }, []);
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={user ? <Profile /> : <Login />} />
          <Route path="/login" element={user ? <Home /> : <Login />} />
          <Route path="/signup" element={user ? <Home /> : <Signup />} />
          <Route path="/contactUs" element={<ContactUs />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
