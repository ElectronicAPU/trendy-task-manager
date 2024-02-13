"use client";
import MainLayout from "@/components/layouts/main-layout";
import TasksTab from "@/components/tabs/tasks-tab";
import { useAppContext } from "@/context/AppContext";
import { loggedInUser } from "@/services/userService";
import { Button, Card, CardBody, Chip, Input } from "@nextui-org/react";
import { LayoutDashboard } from "lucide-react";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { setUser } = useAppContext();

  return (
    <>
      <MainLayout>
        <div className="h-full flex items-center gap-1">
          <LayoutDashboard />
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
        <Card className=" h-full my-4  rounded-lg p-4 ">
          <div className="flex justify-between">
            <div className="flex gap-4 items-center">
              <Button
                variant="faded"
                radius="sm"
                className="p-2 items-center w-fit"
              >
                <h1 className="text-sm font-bold">Team :</h1>
                <p className="text-sm font-semibold">Front End Developers</p>
              </Button>
              <div className="h-full flex gap-1">
                <input
                  type="text"
                  placeholder="Enter invitation code"
                  className="h-full outline-none border rounded-lg px-2 text-sm"
                />
                <Button radius="sm" variant="shadow" color="warning" className="font-semibold">
                  Join
                </Button>
              </div>
            </div>
            <Chip
              color="warning"
              radius="sm"
              variant="dot"
              className="border-warning"
            >
              <h1 className="font-semibold ">Tasks</h1>
            </Chip>
          </div>

          <div className="mt-2 flex gap-2">
            <TasksTab />
          </div>
        </Card>
      </MainLayout>
    </>
  );
};

export default Dashboard;
