import React from "react";

const prioritiesArray = [
  {
    priority: "High",
    color: "bg-red-500",
  },
  {
    priority: "Medium",
    color: "bg-yellow-500",
  },
  {
    priority: "Low",
    color: "bg-green-500",
  },
];

const PrioritySelection = ({selectPriority,setSelectPriority }) => {

  return (
    <>
      <div className="relative">
        <div
          className={`w-72 border-2 h-12 rounded-md px-2 bg-white flex items-center`}
        >
          <div
            className={`w-2 h-2 rounded-full ${prioritiesArray.find(
              (priority) => priority.priority === selectPriority
            ).color}`}
          ></div>
          <span className="ml-2">{selectPriority}</span>
        </div>
        <select
          onChange={(e) => setSelectPriority(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-72"
        >
          {prioritiesArray.map((priority, id) => (
            <option key={id} value={priority.priority} className="text-sm">
              {priority.priority}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default PrioritySelection;
