import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests } from "../utils/requesrSlice";
import { FaCheck, FaTimes } from "react-icons/fa";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequests(res?.data?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!requests || requests.length === 0)
    return <div className="mt-24">No Pending Request</div>;

  return (
    <div className="mt-24">
      <h1 className="text-2xl font-bold mb-6 text-center dark:text-white">
        Pending Requests
      </h1>
      <div className="flex flex-col gap-4 w-full items-center">
        {requests.map((request) => (
          <div
            key={request._id}
            className="gap-6 w-1/2 sm:w-3/4 md:w-1/2 bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex items-center justify-between transition hover:shadow-lg"
          >
            {/* Left Section */}
            <div className="flex flex-row">
              <img
                src={
                  request?.fromUserId?.photoUrl[0] ||
                  "https://via.placeholder.com/150"
                }
                alt={request?.fromUserId?.firstName}
                className="w-14 h-14 rounded-full object-cover"
              />

              <div className="flex flex-col ml-4">
                <h2 className="text-lg font-semibold dark:text-white">
                  {request?.fromUserId?.firstName} {request?.fromUserId?.lastName},{" "}
                  <span className="font-normal text-[16px] text-pink-400">
                    {request?.fromUserId?.age}{" "}
                    {request?.fromUserId?.gender === "female"
                      ? "F"
                      : request?.fromUserId?.gender === "male"
                      ? "M"
                      : "O"}
                  </span>
                </h2>

                <p className="text-xs dark:text-gray-300 text-justify mt-1">
                  {request?.fromUserId?.about ||
                    "No bio available"}
                </p>

                
                <div className="flex flex-wrap gap-2 mt-2">
                  {request?.fromUserId?.skills?.length > 0 ? (
                    request.fromUserId.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">
                      No skills added
                    </span>
                  )}
                </div>
              </div>
            </div>

            
            <div className="flex flex-wrap gap-4">
              <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md">
                <FaCheck />
              </button>
              <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md">
                <FaTimes />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Requests;
