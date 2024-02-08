import { employeeArray } from "@/array/employeeArray";
import MainLayout from "@/components/layouts/main-layout";
import { Button, Card, CardBody, CardHeader, Tooltip } from "@nextui-org/react";
import { PlusCircleIcon, Shield, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React from "react";

const Employess = () => {
  const docArray = Array(2).fill(0);

  return (
    <>
      <MainLayout>
        <Card>
          <CardHeader className="justify-between items-center">
            <div className="flex items-center">
              <ShieldCheck />
              <h1 className="font-bold text-xl ml-1">Total Team</h1>
            </div>
            <Tooltip
              showArrow
              content="Create a team"
              className="bg-warning-500"
            >
              <Button
                size="sm"
                radius="full"
                isIconOnly
                variant="shadow"
                className="bg-warning-500"
              >
                <PlusCircleIcon className="w-4" />
              </Button>
            </Tooltip>
          </CardHeader>
          <CardBody>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {employeeArray.map((doc, id) => (
                <Link
                  key={doc.id}
                  href={`${doc.route}/team/${doc.id}`}
                  className="h-64 border dark:border-gray-800  rounded-xl p-2 w-full"
                >
                  <h1 className="font-semibold text-xl">{doc.title}</h1>
                  <p className="mt-2 text-sm">
                    {" "}
                    <span className="font-semibold">Summery:</span> {doc.desc}
                  </p>
                </Link>
              ))}
            </div>
          </CardBody>
        </Card>
      </MainLayout>
    </>
  );
};

export default Employess;
