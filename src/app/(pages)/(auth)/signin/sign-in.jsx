"use client";
import { useAppContext } from "@/context/AppContext";
import { signIn } from "@/services/userService";
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
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const SignIn = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { user } = useAppContext();
  const router = useRouter();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const result = await signIn(loginData);
      if (result.success) {
        toast.success(result.message);
        router.push("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (user?.email) {
      router.replace("/");
    }
  }, []);

  return (
    <>
      <Card className="border rounded-xl w-full sm:w-7/12 md:w-6/12 xl:w-4/12 2xl:w-3/12">
        <div className="">
          <form onSubmit={handleSubmit}>
            <CardHeader className="flex-col items-start">
              <h1 className=" font-bold text-2xl uppercase">Sign IN</h1>
              <p className="text-sm">Enter email & password to sign in</p>
            </CardHeader>
            <CardBody>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="font-semibold">Email</label>
                  <input
                    name="user_email"
                    required
                    type="email"
                    placeholder="Enter your email"
                    className="outline-none border w-full rounded-md h-11 p-2 font-semibold placeholder:font-normal placeholder:text-sm"
                    onChange={(e) =>
                      setLoginData({
                        ...loginData,
                        email: e.target.value,
                      })
                    }
                    value={loginData.email}
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
                        setLoginData({
                          ...loginData,
                          password: e.target.value,
                        })
                      }
                      value={loginData.password}
                    />

                    <div
                      onClick={() => setShowPassword(!showPassword)}
                      className="pr-2 cursor-pointer"
                    >
                      {showPassword ? <Eye /> : <EyeOff />}
                    </div>
                  </div>
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
            Doesn&apos;t have an account? Please{" "}
            <Link
              className="px-1 font-semibold hover:underline text-blue-600"
              href="/signup"
            >
              Sign Up
            </Link>
          </CardFooter>
        </div>
      </Card>
    </>
  );
};

export default SignIn;
