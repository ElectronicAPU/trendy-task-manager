import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import AddTaskForm from "../TaskComponents/add-task-form";

const TaskModal = ({ isOpen, onOpenChange, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <Modal
        size="3xl"
        backdrop="blur"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        // classNames={{
        //   backdrop:
        //     "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        // }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Add Task
              </ModalHeader>
              <ModalBody>
                <AddTaskForm handleSubmit={handleSubmit} />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  // onPress={onClose}
                >
                  Save Task
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskModal;
