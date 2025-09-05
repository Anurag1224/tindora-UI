import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { addConnections } from "../utils/connectionSlice";
import { FiMessageCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

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
      <h1 className="text-2xl font-bold mb-6">
        My Connections ({connections.length})
      </h1>

      <div
        className="flex flex-col gap-4 w-full sm:w-3/4 lg:w-1/2 items-center overflow-y-auto no-scrollbar pb-16"
        style={{ maxHeight: "70vh" }}
      >
        {connections.map((connection) => (
          <div
            key={connection._id}
            className="w-full shadow-md rounded-xl p-4 flex items-center justify-between transition hover:shadow-xl "
          >
            <img
              src={connection?.photoUrl[0] || "https://via.placeholder.com/150"}
              alt={connection?.firstName}
              className="w-14 h-14 rounded-full object-cover"
            />

            <h2 className="text-lg font-semibold flex-1 ml-4 truncate">
              {connection?.firstName} {connection?.lastName}
            </h2>

            <Link to={"/chat/" + connection._id}>
              <button className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow">
                <FiMessageCircle size={18} />
                Chat
              </button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Connections;
