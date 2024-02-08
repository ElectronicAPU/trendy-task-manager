import { useAppContext } from "@/context/AppContext";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  User,
  useDisclosure,
} from "@nextui-org/react";
import React from "react";
import LogoutModal from "../modals/logout-modal";
import logical from "@/utils/logics";

const LogoutDropdown = () => {
  const { user } = useAppContext();
  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  const handleClick = (event) => {
    if (event === "logout") {
      onOpen();
    }
  };
  return (
    <>
      {isOpen && (
        <LogoutModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={onClose}
        />
      )}
      <Dropdown radius="sm">
        <DropdownTrigger>
          <Button variant="light" className="p-1 w-full">
            <User
              name={user?.name}
              description={user?.tagName}
              avatarProps={{
                src: user?.profileURL,
              }}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => handleClick(key)}
        >
          <DropdownItem key="logout">Log Out</DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </>
  );
};

export default LogoutDropdown;
