"use client";
import MainLayout from "@/components/layouts/main-layout";
import TasksTab from "@/components/tabs/tasks-tab";
import { useAppContext } from "@/context/AppContext";
import { loggedInUser } from "@/services/userService";
import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { LayoutDashboard } from "lucide-react";
import React, { useEffect } from "react";

const Dashboard = () => {
  const { setUser } = useAppContext();

  useEffect(() => {
    const handleUser = async () => {
      try {
        const reuslt = await loggedInUser();
        if (reuslt.success) {
          setUser(reuslt.data);
        }
      } catch (error) {
        // toast.error(error.respose.data.message);
        console.log(error);
      }
    };
    handleUser();
  }, []);

  return (
    <>
      <MainLayout>
        <div className="h-full flex items-center gap-1">
          <LayoutDashboard />
          <h1 className="font-bold text-xl">Dashboard</h1>
        </div>
        <Card className=" h-full my-4  rounded-lg p-4 ">
          <div className="flex justify-between">
            <Button
              variant="faded"
              radius="sm"
              className="p-2 items-center w-fit"
            >
              <h1 className="text-sm font-bold">Team :</h1>
              <p className="text-sm font-semibold">Front End Developers</p>
            </Button>
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
