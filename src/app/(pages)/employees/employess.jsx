"use client";

import MainLayout from "@/components/layouts/main-layout";
import CreateTeamModal from "@/components/modals/create-team-modal";
import { getTeams } from "@/services/teamService";
import { Button, Tooltip, useDisclosure } from "@nextui-org/react";
import { FactoryIcon, Plus } from "lucide-react";
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
        <div className="flex justify-between items-center">
          <h1 className="font-bold text-xl ml-1">Teams</h1>
          <Tooltip content="Create a team" showArrow>
            <Button
              onClick={handleOpenModal}
              isIconOnly
              size="sm"
              variant="shadow"
              color="warning"
            >
              <Plus className="w-5" />
            </Button>
          </Tooltip>
        </div>
        {teams.map((team) => (
          <Link key={team._id} href={`/employees/team/${team.teamName}`}>
            <div className=" flex gap-4 my-3 hover:bg-gray-50 w-64 max-w-full p-2 transition-colors duration-300 rounded-lg">
              <div className="bg-gray-100 w-12 h-12 p-3 rounded-lg flex justify-center items-center">
                <FactoryIcon className="w-4" />
              </div>
              <div className="">
                <h1 className="font-semibold">{team.teamName}</h1>
                <p className="text-sm">{team.users.length} Members</p>
              </div>
            </div>
          </Link>
        ))}
      </MainLayout>
    </>
  );
};

export default Employess;
