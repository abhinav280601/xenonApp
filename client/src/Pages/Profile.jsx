import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUserStatus, selectUsers } from "../Features/userSlice";

const Profile = () => {
  const userStatus = useSelector(selectUserStatus);
  const users = useSelector(selectUsers);
  return (
    <div className="profile-top">
      <div className="profile-inner-top">
        <div className="profile-image">
          <img
            src="https://www.w3schools.com/howto/img_avatar.png"
            alt=""
            srcset=""
          />
        </div>
        <div className="profile-details">
          <div className="profile-name"> Name: {users.name}</div>
          <div className="profile-email">Email: {users.email}</div>
          <div className="profile-phone">Phone: {users.phoneNumber}</div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
