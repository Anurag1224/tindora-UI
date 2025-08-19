import React from 'react'

const UserCard = ({user}) => {
    const {firstName, lastName, photoUrl, age, gender,about} = user;
    console.log(user);
  return (
   <div className="card w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md mx-auto mt-16 shadow-xl bg-base-100 dark:bg-base-200">
      
      {/* Full Profile Image */}
      <figure className="w-full">
        <img
          src={
            photoUrl ||
            "https://cdn-icons-png.flaticon.com/512/149/149071.png"
          }
          alt={`${firstName} ${lastName}`}
          className="w-full h-72 object-cover rounded-t-xl"
        />
      </figure>

      {/* Card Body */}
      <div className="card-body items-center text-center">
        <h2 className="card-title text-lg sm:text-xl md:text-2xl">
          {firstName} {lastName}
        </h2>

        <p className="text-sm sm:text-base opacity-80">
          {about || "This user hasn’t added a bio yet."}
        </p>

        {/* Extra Info */}
        <div className="flex gap-6 mt-4 flex-wrap justify-center text-sm sm:text-base">
          <p>
            <span className="font-medium">Age:</span> {age}
          </p>
          <p>
            <span className="font-medium">Gender:</span> {gender}
          </p>
        </div>

        {/* Button */}
        <div className="card-actions mt-5 ">
          <button className="btn btn-primary px-6 rounded-xl font-bold">
            Ignore
          </button>
          <button className="btn btn-secondary px-6 rounded-xl font-bold">
            Interested
          </button>
        </div>
      </div>
    </div>
  )
}

export default UserCard;