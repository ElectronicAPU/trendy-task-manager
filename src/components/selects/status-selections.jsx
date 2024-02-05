import React from "react";

const statusArray = [
  {
    status: "Starting soon",
    color: "bg-gray-500",
  },
  {
    status: "Work in progress",
    color: "bg-yellow-500",
  },
  {
    status: "Done",
    color: "bg-green-500",
  },
];

const StatusSelctions = ({ selectStatus, setSelectStatus }) => {
  const selectedStatus = statusArray.find((status) => status.status === selectStatus);

  return (
    <>
      <div className="relative">
        <div
          className={`w-72 border-2 h-12 rounded-md px-2 bg-white flex items-center`}
        >
          <div
            className={`w-2 h-2 rounded-full ${selectedStatus ? selectedStatus.color : ''}`}
          ></div>
          <span className="ml-2">{selectStatus}</span>
        </div>
        <select
          onChange={(e) => setSelectStatus(e.target.value)}
          className="absolute inset-0 opacity-0 cursor-pointer w-72"
        >
          {statusArray.map((status, id) => (
            <option key={id} value={status.status} className="text-sm">
              {status.status}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default StatusSelctions;
