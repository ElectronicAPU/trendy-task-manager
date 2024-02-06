import { Spinner } from "@nextui-org/react";
import React from "react";

const Loader = () => {
  return (
    <>
      <div className="absolute bg-white dark:bg-black backdrop-blur-sm top-0 left-0 w-full h-full z-50 flex flex-col gap-4 justify-center items-center">
        <Spinner size="lg" />
        <p className="font-semibold">Loading...</p>
      </div>
    </>
  );
};

export default Loader;
