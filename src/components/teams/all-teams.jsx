import { useAppContext } from "@/context/AppContext";
import { Button, Card, ScrollShadow } from "@nextui-org/react";
import { FactoryIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";

const AllTeams = () => {
  const { user } = useAppContext();
  const [showButton, setShowButton] = useState(false);

  const handleMouseEnter = () => {
    setShowButton(true);
  };

  const handleMouseLeave = () => {
    setShowButton(false);
  };

  return (
    <>
      <Card className="h-full my-4 rounded-lg p-4 ">
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className="my-4 flex gap-4 w-full items-center relative"
        >
          <div className="flex gap-4 my-3 hover:bg-gray-50 w-full p-2 transition-colors duration-300 rounded-lg">
            <div className="bg-gray-100 w-12 h-12 p-3 rounded-lg flex justify-center items-center">
              <FactoryIcon className="w-4" />
            </div>
            <div>
              <h1 className="font-semibold">Products</h1>
              <p className="text-sm">2 Members</p>
            </div>
          </div>
          {showButton && (
            <div className="absolute top-1/2 transform -translate-y-1/2 right-0 px-2 transition-transform duration-300">
              <Button color="primary" >
                Join
              </Button>
            </div>
          )}
        </div>
      </Card>
    </>
  );
};

export default AllTeams;
