"use client";
import GenderDropdown from "@/components/dropdowns/gender-dropdown";
import { useAppContext } from "@/context/AppContext";
import { signUp } from "@/services/userService";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";
import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useMemo, useState } from "react";
import { toast } from "react-toastify";

const SignUp = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    gender: "Male",
  });
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const result = await signUp(userData);
      if (result.success) {
        toast.success(result.message);
        router.push("/signin");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.response.data.message);
    }
  };

  return (
    <>
      <Card className="border rounded-xl w-full sm:w-7/12 md:w-6/12 xl:w-4/12 2xl:w-3/12">
        <div className="">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex-col items-start">
              <h1 className=" font-bold text-2xl">Create an account</h1>
              <p className="text-sm">Enter email to create a account</p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-semibold">Name</label>
                  <input
                    name="user_name"
                    required
                    type="text"
                    placeholder="Enter your name"
                    className="outline-none border w-full rounded-md h-11 p-2 font-semibold placeholder:font-normal placeholder:text-sm"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        name: e.target.value,
                      })
                    }
                    value={userData.name}
                  />
                </div>
                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    name="user_email"
                    required
                    type="email"
                    placeholder="Enter your email"
                    className="outline-none border w-full rounded-md h-11 p-2 font-semibold placeholder:font-normal placeholder:text-sm"
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        email: e.target.value,
                      })
                    }
                    value={userData.email}
                  />
                </div>
                <div className="">
                  <label className="font-semibold">Password</label>
                  <div className="flex items-center border rounded-md h-11">
                    <input
                      name="user_password"
                      required
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your email"
                      className="outline-none w-full p-2 rounded-md font-semibold placeholder:font-normal placeholder:text-sm"
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          password: e.target.value,
                        })
                      }
                      value={userData.password}
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
                  <GenderDropdown
                    gender={userData.gender}
                    setGender={(value) =>
                      setUserData((prevUserData) => ({
                        ...prevUserData,
                        gender: value,
                      }))
                    }
                  />
                </div>
                <div className="w-full mt-10">
                  <Button
                    type="submit"
                    radius="sm"
                    className="w-full bg-warning font-semibold text-md"
                  >
                    Submit
                  </Button>
                </div>
              </div>
            </CardBody>
          </form>
          <CardFooter className="justify-center">
            Already have an account? Please{" "}
            <Link
              className="px-1 font-semibold hover:underline text-blue-600"
              href="/signin"
            >
              Sign In
            </Link>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default SignUp;
