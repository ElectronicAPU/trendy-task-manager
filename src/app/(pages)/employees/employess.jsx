"use client";
import { employeeArray } from "@/array/employeeArray";
import MainLayout from "@/components/layouts/main-layout";
import CreateTeamModal from "@/components/modals/create-team-modal";
import { getTeams } from "@/services/teamService";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { PlusCircleIcon, Shield, ShieldCheck } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Employess = () => {
  const [teams, setTeams] = useState([]);
  const [refresh, setRefresh] = useState(false);

  console.log(teams);

  const { isOpen, onClose, onOpen, onOpenChange } = useDisclosure();

  const handleOpenModal = () => {
    onOpen();
  };

  const handleGetTeams = async () => {
    try {
      const response = await getTeams();
      if (response.success) {
        setTeams(response.data);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    } 
  };

  useEffect(() => {
    handleGetTeams();
  }, [refresh]);

  return (
    <>
      {isOpen && (
        <CreateTeamModal
          isOpen={isOpen}
          onClose={onClose}
          onOpenChange={onOpenChange}
          refresh={refresh}
          setRefresh={setRefresh}
        />
      )}
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
                onClick={handleOpenModal}
              >
                <PlusCircleIcon className="w-4" />
              </Button>
            </Tooltip>
          </CardHeader>
          <CardBody>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
              {teams?.map((team) => (
                <Card
                  key={team._id}
                  className="h-64 border dark:border-gray-800  rounded-xl p-2 w-full flex flex-col justify-between"
                >
                  <div>
                    <h1 className="font-semibold text-xl">{team.teamName}</h1>
                    <p className="mt-2 text-sm">
                      {" "}
                      <span className="font-semibold">Purpose:</span>{" "}
                      {team.purpose}
                    </p>
                    <span>
                      <h1 className="font-semibold mt-2 text-sm">
                        Invitaion Code:
                      </h1>
                      <input
                        className="text-sm border outline-none w-full p-1 mt-1 rounded-lg"
                        readOnly
                        value={team.invitationCode}
                      />
                    </span>
                  </div>
                  <div className="w-full flex">
                    <Link
                      href={`/employees/team/${team._id}`}
                      className="w-full border text-sm px-1 py-2 text-center text-white font-medium rounded-lg bg-primary-500"
                    >
                      View Team
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>
      </MainLayout>
    </>
  );
};

export default Employess;
