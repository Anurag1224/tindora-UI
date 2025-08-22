import React from "react";
import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);
  
  if(!user || user === null) return(
    <div className="flex justify-center items-center h-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    user && (
      <div>
        <EditProfile user={user?.data} />
      </div>
    )
  );
};

export default Profile;
