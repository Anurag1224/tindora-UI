import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";


const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();
  const getFeed = async () => {
    if (feed) return;
    try {
      const res = await axios.get(BASE_URL + "/user/feed", {
        withCredentials: true,
      });

      dispatch(addFeed(res.data));
    } catch (err) {}
  };

  useEffect(() => {
    getFeed();
  }, []);

    if (!feed || !feed.data || feed.data.length === 0) return (<div className="flex items-center justify-center h-screen">
  <div className="w-3/4 sm:w-1/2 md:w-1/3 bg-white dark:bg-gray-800 shadow-md rounded-xl p-6 text-center transition hover:shadow-lg">
    <p className="text-xl font-semibold text-white"> No feed to show</p>
  </div>
</div>);
  return (
    feed && (<div className=" justify justify-items-center ">
      <UserCard user = {feed?.data[0]} />
    </div>)
  );
};


export default Feed;
