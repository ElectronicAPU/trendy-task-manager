"use client";
import { navArray } from "@/array/navArray";
import { useAppContext } from "@/context/AppContext";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import UserAvatar from "./UserAvatar";
import UserSkeleton from "./skeletons/user-skeleton";

const Header = () => {
  const { user, loading } = useAppContext();
  // console.log("user",user);

  const router = useRouter();
  const pathname = usePathname();

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
            <div className="flex gap-6">
              {navArray.map((nav, id) => (
                <Link
                  href={nav.route}
                  key={id}
                  className={`font-bold hover:underline hover:text-indigo-700 tracking-wide ${
                    pathname == nav.route ? "text-indigo-500 underline" : ""
                  }`}
                >
                  {nav.title}
                </Link>
              ))}
            </div>
            {loading ? (
              <UserSkeleton />
            ) : user ? (
              <UserAvatar />
            ) : (
              <Button
                onClick={handleNavigate}
                color="warning"
                radius="sm"
                className="uppercase font-semibold w-32"
              >
                Sign Up
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
