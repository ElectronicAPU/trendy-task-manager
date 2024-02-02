"use client";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import React from "react";

const Header = () => {
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/signup");
  };
  const handleHome = () => {
    router.push("/");
  };

  return (
    <>
      <div className=" p-4 px-8 border-b rounded-b-xl ">
        <div className="flex justify-between items-center">
          <div className=" cursor-pointer" onClick={handleHome}>
            <img className="w-56" src="/images/logo.png" alt="logo" />
          </div>
          <div className="flex gap-6 items-center">
            <ul className="flex gap-6">
              <li>Tasks</li>
              <li>Employees</li>
              <li>Menage Task</li>
            </ul>
            <Button
              onClick={handleNavigate}
              color="warning"
              radius="sm"
              className="uppercase font-semibold w-32"
            >
              Sign Up
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
