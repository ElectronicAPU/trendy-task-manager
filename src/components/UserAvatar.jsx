"use client";
import { useAppContext } from "@/context/AppContext";
import { User } from "@nextui-org/react";
import React from "react";

const UserAvatar = () => {
  const { user } = useAppContext();

  return (
    <>
      <User
        name={user?.name}
        description={user?.tagName}
        avatarProps={{
          src: user?.profileURL,
        }}
      />
    </>
  );
};

export default UserAvatar;
