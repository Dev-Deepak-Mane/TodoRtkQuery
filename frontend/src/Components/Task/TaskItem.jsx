import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Text,
  Flex,
  IconButton,
  Kbd,
  useToast,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Draggable } from "react-beautiful-dnd";
import { format, parseISO } from "date-fns";
import { EditTaskModal } from "./EditTaskModal";
import { useDeleteTaskMutation } from "../../Redux/Api/taskApi";
import Toaster from "../UI/Toaster";

const getRandomColor = () => {
  const colors = [
    "yellow.200",
    "green.200",
    "blue.200",
    "pink.200",
    "orange.200",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

const StickyNote = ({ task, index }) => {
  const [bgColor, setBgColor] = useState("");
  const [deleteTask, { data, isError, isSuccess }] = useDeleteTaskMutation();
  const toast = useToast();
  const formattedDate = format(
    parseISO(task.createdAt),
    "dd/MM/yyyy  HH:mm:ss'"
  );
  useEffect(() => {
    setBgColor(getRandomColor());
  }, []);

  const handleDelete = async () => {
    try {
      await deleteTask(task._id);
      toast(Toaster("success", "Task Deleted successfully!"));
    } catch (error) {
      toast(Toaster("error", error.data.message));
      console.log(error);
    }
  };

  return (
    <Draggable draggableId={task._id} index={index}>
      {(provided) => (
        <Box
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          bg={bgColor}
          p={3}
          borderRadius="md"
          boxShadow="md"
          position="relative"
          color={"gray.800"}
          _hover={{
            animation: "smoothShake 0.5s ease-in-out",
            transform: "rotate(1deg) scale(1.05)",
            transition: "transform 0.2s ease-in-out",
          }}
          cursor="pointer"
        >
          <Box position="absolute" top="5px" right="5px">
            <IconButton
              size="sm"
              icon={<EditTaskModal task={task} />}
              aria-label="Edit note"
              variant="ghost"
              colorScheme="gray"
              _hover={{ color: "blue.600" }}
            />

            <IconButton
              size="sm"
              icon={<DeleteIcon />}
              aria-label="Delete note"
              variant="ghost"
              colorScheme="gray"
              _hover={{ color: "red.600" }}
              ml={1}
              onClick={handleDelete}
            />
          </Box>
          <Text fontSize={{ base: "sm", md: "md" }}>{task?.title}</Text>

          <Kbd mt="7px" h="20px" bg={"bgColor"}>
            {formattedDate}
          </Kbd>
          <Text pt="5" fontSize="sm">
            Description: {task?.description}
          </Text>
        </Box>
      )}
    </Draggable>
  );
};

const TaskItem = ({ tasks }) => {
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      justifyContent="center"
      alignItems="center"
      p={4}
      gap={4}
    >
      <Box w="100%">
        <Grid
          templateColumns={{
            base: "repeat(auto-fill, minmax(120px, 1fr))",
            md: "repeat(auto-fill, minmax(150px, 1fr))",
            lg: "repeat(auto-fill, minmax(200px, 1fr))",
          }}
          gap={4}
        >
          {tasks?.map((tas, index) => (
            <StickyNote key={tas._id} task={tas} index={index} />
          ))}
        </Grid>
      </Box>
    </Flex>
  );
};

export default TaskItem;
