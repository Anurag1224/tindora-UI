import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";
import { FaCheck, FaTimes } from "react-icons/fa";

const Requests = () => {
  const requests = useSelector((store) => store.requests);
  const dispatch = useDispatch();

  const reviewRequest = async (status, _id) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

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
    return (
      <div className="mt-24 flex justify-center">
        <h1 className="text-lg font-semibold">No pending requests</h1>
      </div>
    );

  return (
    <div className="mt-24">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Pending Requests
      </h1>

      {/* Scrollable Container  */}
      <div className="flex flex-col gap-4 w-full items-center max-h-[80vh] overflow-y-auto no-scrollbar pb-20">
        {requests.map((request) => (
          <div
            key={request._id}
            className="gap-6 w-full sm:w-3/4 lg:w-1/2 
             shadow-md 
             rounded-xl p-4 flex flex-col sm:flex-row 
             items-center sm:items-start justify-between 
             transition hover:shadow-lg mb-2 "
          >
            <div className="flex flex-col sm:flex-row sm:items-start w-full sm:w-auto">
              <img
                src={
                  request?.fromUserId?.photoUrl?.[0] ||
                  "https://via.placeholder.com/150"
                }
                alt={request?.fromUserId?.firstName}
                className="w-16 h-16 rounded-full object-cover border border-gray-300 mx-auto sm:mx-0"
              />

              <div className="flex flex-col mt-3 sm:mt-0 sm:ml-4 text-center sm:text-left">
                <h2 className="text-lg font-semibold">
                  {request?.fromUserId?.firstName}{" "}
                  {request?.fromUserId?.lastName},{" "}
                  <span className="font-normal text-[15px] text-pink-400 ">
                    {request?.fromUserId?.age}{" "}
                    {request?.fromUserId?.gender === "female"
                      ? "F"
                      : request?.fromUserId?.gender === "male"
                      ? "M"
                      : "O"}
                  </span>
                </h2>

                <p className="text-xs mt-1">
                  {request?.fromUserId?.about || "No bio available"}
                </p>

                <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                  {request?.fromUserId?.skills?.length > 0 ? (
                    request.fromUserId.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 text-xs bg-gray-200
                         text-gray-800 rounded-full"
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

            <div className="flex gap-3 mt-4 sm:mt-0">
              <button
                className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-md"
                onClick={() => reviewRequest("accepted", request._id)}
              >
                <FaCheck />
              </button>
              <button
                className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-md"
                onClick={() => reviewRequest("rejected", request._id)}
              >
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
