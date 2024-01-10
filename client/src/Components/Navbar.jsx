import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUserStatus, selectUsers } from "../Features/userSlice";
import { api } from "../assets/data";
import axios from "axios";
const Navbar = () => {
  const userStatus = useSelector(selectUserStatus);
  const users = useSelector(selectUsers);

  const handleLogOut = async () => {
    try {
      const response = await axios.post(`${api}logout`, null, {
        withCredentials: true, // include cookies in the request
      });

      if (response.status === 200) {
        // Logout successful
        console.log("User logged out");
        window.location.href = "/home";
      } else {
        // Handle logout failure
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  return (
    <div
      className="nav-top"
      style={{
        height: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexWrap: "wrap",
          height: "100%",
        }}
      >
        <Link to={"./home"}>
          {" "}
          <div className="nav-item">Home</div>
        </Link>

        {userStatus ? (
          <>
            <Link to={"./profile"}>
              {" "}
              <div className="nav-item">{users.name}</div>
            </Link>
          </>
        ) : (
          <></>
        )}

        <Link to={"./contactUs"}>
          {" "}
          <div className="nav-item">Contact Us</div>
        </Link>
        {!userStatus ? (
          <>
            {" "}
            <Link to={"./login"}>
              {" "}
              <div className="nav-item">Login</div>
            </Link>
          </>
        ) : (
          <Link>
            <div onClick={handleLogOut}>Logout</div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
