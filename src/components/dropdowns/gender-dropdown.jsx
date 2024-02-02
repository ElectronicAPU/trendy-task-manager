import React, { useState } from "react";

const GenderDropdown = ({ gender, setGender }) => {
  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <>
      <div>
        <select
          required
          className="border w-full h-11 rounded-md px-1 outline-none font-semibold text-sm"
          value={gender}
          onChange={handleGenderChange}
        >
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
      </div>
    </>
  );
};

export default GenderDropdown;
