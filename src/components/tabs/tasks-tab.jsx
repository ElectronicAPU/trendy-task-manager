import { Button, Card, CardBody, Chip, Tab, Tabs } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import NoTasks from "../TaskComponents/no-tasks";
import AllTasks from "../TaskComponents/all-tasks";
import { getAllTasks } from "@/services/taskService";
import TaskSkeleton from "../skeletons/task-skeleton";
import { NotebookTabs } from "lucide-react";
import { useAppContext } from "@/context/AppContext";

const TasksTab = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");

  const { user } = useAppContext();

  const getTasks = async () => {
    try {
      if (user) {
        const response = await getAllTasks();
        if (response.length > 0) {
          setAllTasks(response);
        }
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTasks();
  }, [refresh, user]);

  // console.log(allTasks.filter((tasks) => tasks.title.toLowerCase().includes("yo")));

  const keys = ["title", "description"];

  const search = (data) => {
    return data?.filter((tasks) =>
      keys.some((key) => tasks[key].toLowerCase().includes(query.toLowerCase()))
    );
  };
  

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
              <CardBody className="p-0">
                <div className="flex items-center gap-1 pb-2 font-semibold text-sm">
                  <div className="flex flex-col-reverse sm:flex-row gap-2 justify-between w-full h-full">
                    <div className="flex gap-2 items-center">
                      <NotebookTabs className="w-4" />
                      {allTasks?.length === 0 ? (
                        <p>Add your first task</p>
                      ) : (
                        <p>Add more tasks</p>
                      )}
                    </div>

                    <div className="h-full flex gap-1">
                      <input
                        onChange={(e) => setQuery(e.target.value)}
                        type="text"
                        placeholder="Search by title & descriptions..."
                        className="h-10 w-full outline-none border-2 placeholder:font-normal rounded-lg px-2 text-sm "
                      />
                      <Button
                        radius="sm"
                        variant="shadow"
                        color="warning"
                        className="font-semibold w-16 hidden sm:block"
                      >
                        Search
                      </Button>
                    </div>
                  </div>
                </div>
                <div className="">
                  <AllTasks
                    loading={loading}
                    allTasks={search(allTasks)}
                    refresh={refresh}
                    setRefresh={setRefresh}
                  />
                </div>
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
