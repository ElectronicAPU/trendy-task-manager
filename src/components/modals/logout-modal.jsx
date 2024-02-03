import { useAppContext } from "@/context/AppContext";
import { logoutUser } from "@/services/userService";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import React from "react";
import { toast } from "react-toastify";

const LogoutModal = ({ isOpen, onOpenChange, onClose }) => {
  const { setUser } = useAppContext();

  const handelLogout = async () => {
    try {
      const result = await logoutUser();

      if (result.success) {
        toast.success(result.message);
        setUser(undefined);
      }
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Logout</ModalHeader>
              <ModalBody>
                <p>Are you sure you want to log out from this website?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button
                  onClick={handelLogout}
                  color="primary"
                  // onPress={onClose}
                >
                  Logout
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
