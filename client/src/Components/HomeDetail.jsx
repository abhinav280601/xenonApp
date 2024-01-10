import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { selectUserStatus, selectUsers } from "../Features/userSlice";

const HomeDetail = () => {
  const userStatus = useSelector(selectUserStatus);
  const users = useSelector(selectUsers);
  return (
    <div className="home-detail-top">
      {userStatus ? <>Hey {users.name}</> : <></>} Sell Your Car At Best Price
      at Chroma Cars
    </div>
  );
};

export default HomeDetail;
