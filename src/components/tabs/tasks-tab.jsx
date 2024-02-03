import { Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import React from "react";
import NoTasks from "../TaskComponents/no-tasks";
import AllTasks from "../TaskComponents/all-tasks";

const TasksTab = () => {
  const tasks = [];

  console.log(tasks);

  return (
    <>
      <div className="flex w-full flex-col">
        <Tabs
          aria-label="Options"
          variant="bordered"
          radius="sm"
          color="warning"
        >
          <Tab key="owned" title="Owned Tasks">
            <Card radius="sm" shadow="none">
              <CardBody>
                {tasks.length === 0 ? <NoTasks tasks={tasks} /> : <AllTasks />}
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
