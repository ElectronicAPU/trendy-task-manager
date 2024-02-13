import MainLayout from "@/components/layouts/main-layout";
import { Card, CardHeader } from "@nextui-org/react";
import React from "react";

const TeamId = () => {
  return (
    <>
      <MainLayout>
        <Card>
          <CardHeader>
            <h1 className="font-semibold text-xl">Admin</h1>
          </CardHeader>
        </Card>
      </MainLayout>
    </>
  );
};

export default TeamId;
