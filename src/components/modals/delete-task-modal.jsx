import { deleteTask } from "@/services/taskService";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-toastify";

const DeleteTaskModal = ({ isOpen, onClose, onOpenChange }) => {
  const { taskId } = useParams();
  const router = useRouter();

  const handleDeleteTask = async () => {
    try {
      const response = await deleteTask(taskId);
      if (response.success) {
        toast.success(response.message);
        router.push("/");
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Delete Task
            </ModalHeader>
            <ModalBody>Are you sure you want to delete this task?</ModalBody>
            <ModalFooter>
              <Button
                radius="sm"
                color="danger"
                variant="light"
                onPress={onClose}
              >
                No
              </Button>
              <Button radius="sm" color="primary" onPress={handleDeleteTask}>
                Yes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default DeleteTaskModal;
