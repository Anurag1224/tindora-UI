import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";


const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
   const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post(BASE_URL + "/login", {
        emailId,
        password,
      }, {withCredentials: true});

      dispatch(addUser(res.data));
      return navigate("/");
      
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-base-200 ">
      <div className="flex flex-grow items-center justify-center px-4">
        <div className="card w-full max-w-md bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl font-bold">
              Sign in to Your Account
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
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                placeholder="Enter your password"
                className="input w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
            </div>
                <p className="text-red-500">{error}</p>
            <button
              className="btn btn-primary w-full mt-6"
              onClick={handleLogin}
              
            >
              Login
            </button>

            {/* Extra Options */}
            <div className="text-center mt-4">
              <a href="#" className="link link-hover text-sm">
                Forgot password?
              </a>
            </div>

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

            {/* Sign Up */}
            <p className="text-center mt-6 text-sm">
              Don’t have an account?
              <Link to = "/signup" className="link link-primary">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
