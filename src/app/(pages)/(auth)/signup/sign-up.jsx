"use client";
import GendeDropdown from "@/components/dropdowns/gender-dropdown";
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import React, { useMemo, useState } from "react";

const SignUp = () => {
  const [userData, setUserData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Male"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Card className="border rounded-xl w-full sm:w-7/12 md:w-6/12 xl:w-4/12 2xl:w-3/12">
        <div shadow isHoverable className="">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex-col items-start">
              <h1 className="uppercase font-bold text-2xl">
                Create an account
              </h1>
              <p className="text-sm">Enter email to create a account</p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-semibold">Name</label>
                  <input
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="outline-none border w-full rounded-md h-11 p-2 font-semibold placeholder:font-normal placeholder:text-sm"
                  />
                </div>
                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    required
                    type="email"
                    placeholder="Enter your email"
                    className="outline-none border w-full rounded-md h-11 p-2 font-semibold placeholder:font-normal placeholder:text-sm"
                  />
                </div>
                <div className="">
                  <label className="font-semibold">Password</label>
                  <div className="flex items-center border rounded-md h-11">
                    <input
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your email"
                      className="outline-none w-full p-2 rounded-md font-semibold placeholder:font-normal placeholder:text-sm"
                    />

                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-2 cursor-pointer"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <label className="font-semibold">Gender</label>
                  <GendeDropdown />
                </div>
              </div>
            </CardBody>
          </form>
        </div>
      </Card>
    </>
  );
};

export default SignUp;
