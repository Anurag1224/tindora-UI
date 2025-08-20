import React, { useState } from "react";

const UserCard = ({ user}, {showActions = true}, {noMargin = false  }) => {
  const { firstName, lastName, photoUrl = [], age, gender, about, skills = [] } = user;

  const [current, setCurrent] = useState(0);

  const nextPhoto = () => {
    setCurrent((prev) => (prev + 1) % photoUrl.length);
  };

  const prevPhoto = () => { 
    setCurrent((prev) => (prev - 1 + photoUrl.length) % photoUrl.length);
  };

  return (
    <div className={noMargin? "w-[350px] md:w-[400px] bg-base-100 dark:bg-gray-800 shadow-xl text-white rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 mt-0 h-[510px]": "w-[350px] md:w-[400px] bg-base-100 shadow-xl rounded-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300 mt-24"}>
      {/* Image Section */}
      <figure className="relative w-full h-80">
        {photoUrl.length > 0 ? (
          <img
            src={photoUrl[current]}
            alt="User"
            className="object-cover w-full h-full"
          />
        ) : (
          <img
            src="https://via.placeholder.com/400x300"
            alt="Default"
            className="object-cover w-full h-full"
          />
        )}

        {/* Carousel Buttons */}
        {photoUrl.length > 1 && (
          <>
            <button
              className="absolute left-3 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm bg-base-100/70"
              onClick={prevPhoto}
            >
              ❮
            </button>
            <button
              className="absolute right-3 top-1/2 transform -translate-y-1/2 btn btn-circle btn-sm bg-base-100/70"
              onClick={nextPhoto}
            >
              ❯
            </button>
          </>
        )}
      </figure>

      {/* Info Section */}
      <div className="p-5">
        <h2 className="text-xl font-semibold">
          {firstName} {lastName}, <span className="font-normal">{age}</span>
        </h2>
        <p className="text-sm opacity-70">{gender}</p>

        <p className="mt-3 text-sm leading-relaxed">
          {about || "This user hasn’t written a bio yet."}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.length > 0 ? (
            skills.map((skill, idx) => (
              <span key={idx} className="badge badge-primary badge-outline">
                {skill}
              </span>
            ))
          ) : (
            <p className="text-sm opacity-50">No skills added yet</p>
          )}
        </div>

        {/* Action Buttons */}
        {showActions && (<div className="flex justify-between mt-6">
          <button className="btn btn-error w-32">❌ Ignore</button>
          <button className="btn btn-primary w-32">❤️ Interested</button>
        </div>)}
      </div>
    </div>
  );
};

export default UserCard;
