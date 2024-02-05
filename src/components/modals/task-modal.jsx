import React, { useState, useCallback, useMemo, memo } from "react";
import StartDatePicker from "../datepickers/start-date-picker";
import EndDatePicker from "../datepickers/end-date-picker";
import PrioritySelection from "../selects/priority-selection";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import StatusSelctions from "../selects/status-selections";
import dynamic from "next/dynamic";
import dayjs from "dayjs";
import { createTask } from "@/services/taskService";
import { toast } from "react-toastify";

// Import JoditEditor dynamically
const JoditEditor = dynamic(() => import("jodit-react"), {
  ssr: false,
});

const config = {
  toolbarAdaptive: false,
  buttons: "bold,italic,underline,|,ul,ol,|,outdent,indent,|,link,|,source",
};

const TaskModal = ({ isOpen, onOpenChange, onClose, refresh, setRefresh }) => {
  const [title, setTitle] = useState("");
  const [selectPriority, setSelectPriority] = useState("High");
  const [selectStatus, setSelectStatus] = useState("Starting soon");
  const [description, setDescription] = useState("");

  const [startDateTime, setStartDateTime] = useState(dayjs());
  const [endDateTime, setEndDateTime] = useState(dayjs());

  const setStartDateTimeMemoized = useCallback(
    (newValue) => setStartDateTime(newValue),
    []
  );

  const setEndDateTimeMemoized = useCallback(
    (newValue) => setEndDateTime(newValue),
    []
  );

  const startDateTimeInMilliseconds = useMemo(
    () => startDateTime?.valueOf() || null,
    [startDateTime]
  );
  const endDateTimeInMilliseconds = useMemo(
    () => endDateTime?.valueOf() || null,
    [endDateTime]
  );

  const handleJoditChange = useCallback((newContent) => {
    setDescription(newContent);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!description.trim()) {
      toast.error("Description is required");
      return;
    }

    const formData = {
      title,
      priority: selectPriority,
      status: selectStatus,
      startdate: startDateTimeInMilliseconds,
      enddate: endDateTimeInMilliseconds,
      description,
    };

    const response = await createTask(formData);

    if (response.success) {
      toast.success(response.message);
      setRefresh(!refresh);
      onClose();
    } else {
      toast.error(response.message);
    }
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
          <form onSubmit={handleSubmit}>
            <ModalHeader className="flex flex-col gap-1">Add Task</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-4">
                {/* Title */}
                <div className="flex flex-col">
                  <h1 className="text-sm font-semibold pb-1">Title</h1>
                  <Input
                    type="text"
                    id="titleInput"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    radius="sm"
                    variant="bordered"
                    placeholder="Enter Title *"
                  />
                </div>
                {/* Priority selection */}
                <div className="flex flex-col">
                  <h1 className="text-sm font-semibold pb-1">Priority</h1>
                  <PrioritySelection
                    selectPriority={selectPriority}
                    setSelectPriority={setSelectPriority}
                  />
                </div>
                {/* Status selection */}
                <div className="flex flex-col">
                  <h1 className="text-sm font-semibold pb-1">Status</h1>
                  <StatusSelctions
                    selectStatus={selectStatus}
                    setSelectStatus={setSelectStatus}
                  />
                </div>
                {/* Date picker */}
                <div className="flex gap-4">
                  <div>
                    <h1 className="text-sm font-semibold pb-1">Start Date</h1>
                    <div className="-mt-2">
                      <StartDatePicker
                        startDateTime={startDateTime}
                        setStartDateTime={setStartDateTimeMemoized}
                      />
                    </div>
                  </div>
                  <div>
                    <h1 className="text-sm font-semibold pb-1">End Date</h1>
                    <div className="-mt-2">
                      <EndDatePicker
                        endDateTime={endDateTime}
                        setEndDateTime={setEndDateTimeMemoized}
                      />
                    </div>
                  </div>
                </div>
                {/* Descriptions */}
                <div className="flex flex-col">
                  <h1 className="text-sm font-semibold pb-1">Descriptions</h1>
                  <JoditEditor
                    required
                    className="min-h-72"
                    config={config}
                    value={description}
                    onChange={handleJoditChange}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                // onPress={onClose}
                type="submit"
              >
                Save Task
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default TaskModal;
