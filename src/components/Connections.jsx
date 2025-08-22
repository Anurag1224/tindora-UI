import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";
import { FiMessageCircle } from "react-icons/fi"; 

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res?.data?.data));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;

  if (connections.length === 0)
    return (
      <div className="mt-24 flex justify-center">
        <h1 className="text-lg font-semibold">No connections found</h1>
      </div>
    );

  return (
  <div className="mt-24 flex flex-col items-center">
    <h1 className="text-2xl font-bold mb-6 dark:text-white">
      My Connections ({connections.length})
    </h1>

    <div
      className="flex flex-col gap-4 w-full items-center overflow-y-scroll no-scrollbar "
      style={{ maxHeight: "70vh" }} 
    >
      {connections.map((connection) => (
        <div
          key={connection._id}
          className="w-1/2 sm:w-3/4 md:w-1/2 bg-white dark:bg-gray-800 shadow-md rounded-xl p-4 flex items-center justify-between transition hover:shadow-lg"
        >
          <img
            src={connection?.photoUrl[0] || "https://via.placeholder.com/150"}
            alt={connection?.firstName}
            className="w-14 h-14 rounded-full object-cover"
          />

          <h2 className="text-lg font-semibold dark:text-white flex-1 ml-4">
            {connection?.firstName} {connection?.lastName}
          </h2>

          <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
            <FiMessageCircle size={18} />
            Chat
          </button>
        </div>
      ))}
    </div>
  </div>
);

};

export default Connections;
