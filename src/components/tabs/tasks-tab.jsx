import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import React from "react";

const TasksTab = () => {
  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs aria-label="Options" variant="bordered" radius="sm" color="warning">
          <Tab key="owned" title="Owned Tasks">
            <Card>
              <CardBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam, quis nostrud exercitation ullamco laboris
                nisi ut aliquip ex ea commodo consequat.
              </CardBody>
            </Card>
          </Tab>
          <Tab key="company" title="Company Tasks">
            <Card>
              <CardBody>
                Ut enim ad minim veniam, quis nostrud exercitation ullamco
                laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure
                dolor in reprehenderit in voluptate velit esse cillum dolore eu
                fugiat nulla pariatur.
              </CardBody>
            </Card>
          </Tab>
        </Tabs>
      </div>
    </>
  );
};

export default TasksTab;
