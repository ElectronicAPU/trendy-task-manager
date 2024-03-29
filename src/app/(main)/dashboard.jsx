"use client";
import React, { useState } from "react";

import MainLayout from "@/components/layouts/main-layout";
import TasksTab from "@/components/tabs/tasks-tab";
import AllTeams from "@/components/teams/all-teams";
import { Button, Card, Chip } from "@nextui-org/react";
import { LayoutDashboard, Users } from "lucide-react";

const Dashboard = () => {

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
        <div className="h-full flex items-center gap-1 mt-8">
          <Users />
          <h1 className="font-bold text-xl">Teams</h1>
        </div>
        <AllTeams />
      </MainLayout>
    </>
  );
};

export default Dashboard;
