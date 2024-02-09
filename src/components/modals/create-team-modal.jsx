import { createTeam } from "@/services/teamService";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { toast } from "react-toastify";

const CreateTeamModal = ({
  isOpen,
  onOpenChange,
  onClose,
  refresh,
  setRefresh,
}) => {
  const [formData, setformData] = useState({
    teamName: "",
    purpose: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await createTeam(formData);
      if (response.success) {
        toast.success(response.message);
        onClose();
        setRefresh(!refresh);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Modal
        size="3xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
      >
        <ModalContent>
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">
              Create a Team
            </ModalHeader>
            <ModalBody>
              <div>
                <h1 className="text-sm font-semibold mb-1">Team Name</h1>
                <Input
                  size="sm"
                  type="text"
                  name="teamName"
                  id="teamName"
                  value={formData.teamName}
                  onChange={(e) =>
                    setformData((prevValue) => ({
                      ...prevValue,
                      teamName: e.target.value,
                    }))
                  }
                  placeholder="Enter a team name"
                />
              </div>
              <div>
                <h1 className="text-sm font-semibold mb-1">Purpose</h1>
                <Textarea
                  onChange={(e) =>
                    setformData((prevValue) => ({
                      ...prevValue,
                      purpose: e.target.value,
                    }))
                  }
                  id="purpose"
                  type="text"
                  name="purpose"
                  value={formData.purpose}
                  maxLength={200}
                  isRequired
                  placeholder="Enter your purpose"
                  className="w-full"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" type="submit">
                Create
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateTeamModal;
