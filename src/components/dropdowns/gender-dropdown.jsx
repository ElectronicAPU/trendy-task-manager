import React, { useMemo, useState } from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

const GendeDropdown = () => {
  const [selectedKeys, setSelectedKeys] = useState(new Set(["Male"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );

  return (
    <Dropdown className="">
      <DropdownTrigger>
        <Button variant=""  className="capitalize border">
          {selectedValue}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
      
        aria-label="Single selection example"
        variant="flat"
        disallowEmptySelection
        selectionMode="single"
        selectedKeys={selectedKeys}
        onSelectionChange={setSelectedKeys}
      >
        <DropdownItem key="male">Male</DropdownItem>
        <DropdownItem key="female">Female</DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
};

export default GendeDropdown;
