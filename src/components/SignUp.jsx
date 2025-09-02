import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignUp = async () => {
    try {
        setError("");
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          lastName,
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data?.error);
    }
  };
  return (
    <div className="min-h-screen flex flex-col bg-base-200 ">
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold">
              Sign Up to Find Matches
            </h2>

            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">First Name</span>
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                placeholder="Enter your first name"
                className="input w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
              />
            </div>

            <div className="form-control mt-6">
              <label className="label">
                <span className="label-text">Last Name</span>
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Enter your last name"
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
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="input w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
              />
            </div>

            {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
            <button
              className="btn btn-primary w-full mt-6"
              onClick={handleSignUp}
            >
              SignUp
            </button>

            {/* Divider */}
            {/* <div className="divider">OR</div> */}

            {/* Social Login */}
            {/* <div className="flex justify-center gap-4">
              <button className="btn btn-outline flex items-center gap-2">
                <FaGoogle /> Google
              </button>
              <button className="btn btn-outline flex items-center gap-2">
                <FaGithub /> GitHub
              </button>
            </div> */}

            {/* <p className="text-center mt-6 text-sm">
              Have an account?
              <Link href="/login"  className="link link-primary">
                Login
              </Link>
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
