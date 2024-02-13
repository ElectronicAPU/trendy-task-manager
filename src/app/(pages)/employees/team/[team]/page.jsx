"use client";

import MainLayout from "@/components/layouts/main-layout";
import { getTeamUsers } from "@/services/teamService";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const TeamId = () => {
  const { team } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  console.log(teamMembers);

  useEffect(() => {
    const handleTeamMembers = async () => {
      try {
        const response = await getTeamUsers(team);
        setTeamMembers(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    handleTeamMembers();
  }, []);

  return (
    <>
      <MainLayout>
        <div>
          <div>
            <h1 className="font-semibold text-xl">Admin</h1>
            {teamMembers?.map((teamMember) => (
              <div key={teamMember._id} className="my-4 flex gap-4">
                <div>
                  <Image
                    src={teamMember.profileURL}
                    alt="logo"
                    width={38}
                    height={38}
                  />
                </div>
                <div className=" text-sm">
                  <p className="font-semibold">{teamMember.name}</p>
                  <p className=" text-gray-500">{teamMember.email}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default TeamId;
