import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import UserCard from "./UserCard";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
 

  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [skills, setSkills] = useState(user?.skills || []);
  const [skillInput, setSkillInput] = useState("");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || []);
  const [photoInput, setPhotoInput] = useState("");
  const [about, setAbout] = useState(user?.about || "");
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const handleAddSkill = () => {
    if (!skillInput.trim()) return;
    if (skills.includes(skillInput.trim())) {
      setError("Skill already added");
      return;
    }
    if (skills.length >= 10) {
      setError("Maximum 10 skills allowed");
      return;
    }
    setSkills([...skills, skillInput.trim()]);
    setSkillInput("");
    setError("");
  };

  const handleRemoveSkill = (skill) => {
    setSkills(skills.filter((s) => s !== skill));
  };

  const handleAddPhoto = () => {
    if (!photoInput.trim()) return;
    if (photoUrl.length >= 3) {
      setError("Maximum 3 photos allowed");
      return;
    }
    setPhotoUrl([...photoUrl, photoInput.trim()]);
    setPhotoInput("");
    setError("");
  };

  const handleRemovePhoto = (url) => {
    setPhotoUrl(photoUrl.filter((p) => p !== url));
  };

  const saveProfile = async () => {
    try {
      setError("");
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          age,
          gender,
          about,
          skills,
          photoUrl,
        },
        { withCredentials: true }
      );
      
      dispatch(addUser(res?.data));
      setShowToast(true);
      setTimeout(() => {setShowToast(false)},2000);
    } catch (err) {
      setError(err?.response?.data?.error);
    }
  };

  if (!user) return (
    <div className="flex justify-center items-center h-full">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent border-solid rounded-full animate-spin"></div>
    </div>
  );

  return (
    <>
      <div className="min-h-screen flex flex-col bg-base-200 transition-colors">
        <div className="flex flex-grow items-center justify-center px-4 py-10">
          <div className="flex flex-wrap gap-10 ">
            <div className="card w-full max-w-4xl bg-base-100 shadow-xl p-6 ">
              <div className="card-body">
                <h2 className="card-title justify-center text-2xl font-bold">
                  Edit Profile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">
                            First Name
                          </span>
                        </label>
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="Enter your first name"
                          className="input input-bordered w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                        />
                      </div>

                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">
                            Last Name
                          </span>
                        </label>
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Enter your last name"
                          className="input input-bordered w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">
                            Gender
                          </span>
                        </label>
                        <select
                          value={gender}
                          onChange={(e) => setGender(e.target.value)}
                          className="select select-bordered w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                        >
                          <option value="" disabled>
                            Select your gender
                          </option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="form-control flex-1">
                        <label className="label">
                          <span className="label-text">
                            Age
                          </span>
                        </label>
                        <input
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Enter your age"
                          className="input input-bordered w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          About
                        </span>
                      </label>
                      <textarea
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        placeholder="Write something about yourself..."
                        className="textarea textarea-bordered w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                        rows="4"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-4">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Photos (Max 3)
                        </span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={photoInput}
                          onChange={(e) => setPhotoInput(e.target.value)}
                          placeholder="Enter a valid Photo URL"
                          className="input input-bordered w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                        />
                        <button
                          className="btn btn-success"
                          onClick={handleAddPhoto}
                        >
                          Add
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {photoUrl.map((url, index) => (
                          <span
                            key={index}
                            className="flex items-center bg-secondary text-white px-3 py-1 rounded-full text-sm shadow-sm"
                          >
                            {url.length > 20 ? url.slice(0, 20) + "..." : url}
                            <MdClose
                              className="ml-2 w-4 h-4 cursor-pointer hover:text-red-300"
                              onClick={() => handleRemovePhoto(url)}
                            />
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text">
                          Skills
                        </span>
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          placeholder="Enter a skill and click Add"
                          className="input input-bordered w-full focus:border-primary/50 focus:ring-0 focus:outline-none"
                        />
                        <button
                          className="btn btn-success"
                          onClick={handleAddSkill}
                        >
                          Add
                        </button>
                      </div>

                      <div className="flex flex-wrap gap-2 mt-2">
                        {skills.map((skill, index) => (
                          <span
                            key={index}
                            className="flex items-center bg-primary text-white px-3 py-1 rounded-full text-sm shadow-sm"
                          >
                            {skill}
                            <MdClose
                              className="ml-2 w-4 h-4 cursor-pointer hover:text-red-300"
                              onClick={() => handleRemoveSkill(skill)}
                            />
                          </span>
                        ))}
                      </div>
                    </div>
                    {error && (
                      <p className="text-red-500 text-sm mt-1">{error}</p>
                    )}
                  </div>
                </div>

                <button
                  className="btn btn-primary w-full mt-6"
                  onClick={saveProfile}
                >
                  Save
                </button>
              </div>
            </div>
            <div className="pb-16 md:pb-0 w-full sm:w-auto justify-center flex">
              <UserCard user={user} showActions={false} noMargin />
            </div>
          </div>
          {showToast && (<div className="toast toast-top toast-center">
            <div className="alert alert-success mt-16">
              <span>Profile updated successfully.</span>
            </div>
          </div>)}
        </div>
      </div>
    </>
  );
};

export default EditProfile;
