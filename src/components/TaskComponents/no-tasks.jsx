import { Button, Card, CardBody, useDisclosure } from "@nextui-org/react";
import { NotebookTabs, Plus } from "lucide-react";
import React from "react";
import TaskModal from "../modals/task-modal";

const NoTasks = ({ tasks }) => {
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  console.log(isOpen);

  const handleAddTasks = () => {
    console.log("click");
    onOpen();
  };

  return (
    <>
      {isOpen && (
        <TaskModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onOpen={onOpen}
          onClose={onClose}
        />
      )}
      <div>
        <div className="flex items-center gap-1 pb-2 font-semibold text-sm">
          <NotebookTabs className="w-4" />
          {tasks.length === 0 ? (
            <p>Add your first task</p>
          ) : (
            <p>Add more tasks</p>
          )}
        </div>
        <Card
          radius="sm"
          isHoverable
          className="border w-64 h-64 flex justify-center items-center cursor-pointer"
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
      </div>
    </>
  );
};

export default NoTasks;
