"use client";
import MainLayout from "@/components/layouts/main-layout";
import { useAppContext } from "@/context/AppContext";
import { Button, Card, Chip } from "@nextui-org/react";
import { LayoutDashboard } from "lucide-react";
import React from "react";

const Dashboard = () => {
  const { hello, setHello } = useAppContext();

  console.log(hello);
  return (
    <>
      <MainLayout>
        <div className="h-full flex items-center gap-1">
          <LayoutDashboard />
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
        <Card className=" h-full my-4  rounded-lg p-4 ">
          <Button variant="faded" radius="sm" className="p-2 items-center w-fit">
            <h1 className="text-sm font-bold">Team :</h1>
            <p className="text-sm font-semibold">Front End Developers</p>
          </Button>
          <div className="mt-2">
            <Chip color="warning" radius="sm" variant="dot" className="border-warning">
              <h1 className="font-semibold ">Tasks</h1>
            </Chip>
          </div>
        </Card>
      </MainLayout>
    </>
  );
};

export default Dashboard;
