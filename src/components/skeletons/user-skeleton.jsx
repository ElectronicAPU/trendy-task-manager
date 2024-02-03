import { Skeleton } from "@nextui-org/react";
import React from "react";

const UserSkeleton = () => {
  return (
    <>
      <div className=" w-full flex items-center gap-2 sm:w-32">
        <div>
          <Skeleton className="flex rounded-full w-10 h-10" />
        </div>
        <div className="w-full flex flex-col gap-2">
          <Skeleton className="h-3 w-4/5 rounded-lg" />
          <Skeleton className="h-2 w-2/5 rounded-lg" />
        </div>
      </div>
    </>
  );
};

export default UserSkeleton;
