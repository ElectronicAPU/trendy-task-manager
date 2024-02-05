import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import { NotebookTabs, Plus } from "lucide-react";
import React from "react";
import TaskModal from "../modals/task-modal";

const NoTasks = ({ tasks, refresh, setRefresh }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleAddTasks = () => {
    onOpen();
  };

  return (
    <>
      {isOpen && (
        <TaskModal
          refresh={refresh}
          setRefresh={setRefresh}
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
        <Card
          radius="sm"
          isHoverable
          className="border h-64 w-full flex justify-center items-center cursor-pointer"
        >
          <CardBody className="justify-center items-center p-1">
            <Button
              onClick={handleAddTasks}
              color="warning"
              variant="bordered"
              className="w-full h-full bg-warning-100"
            >
              <Plus className="w-36" />
            </Button>
          </CardBody>
        </Card>
    </>
  );
};

export default NoTasks;
