import React, { useState } from "react";

const EditProfile = () => {
  const [emailId, setEmailId] = useState("anurag1234@gmail.com");
  const [password, setPassword] = useState("Anurag@123");
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-base-200 ">
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold">
              Edit Profile
            </h2>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email"
                className="input w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="input w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
              />
            </div>
            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                value={emailId}
                onChange={(e) => setEmailId(e.target.value)}
                placeholder="Enter your email"
                className="input w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="text"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="input w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
              />
            </div>
            <p className="text-red-500">{error}</p>
            <button className="btn btn-primary w-full mt-6">Save</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
