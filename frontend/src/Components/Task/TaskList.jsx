// import React from "react";
// import { useDispatch } from "react-redux";
// import { DragDropContext, Droppable } from "react-beautiful-dnd";
// import { Box, Flex, Grid, Heading, Spinner, Text } from "@chakra-ui/react";
// import {
//   useGetMyTasksQuery,
//   useUpdateTaskMutation,
// } from "../../Redux/Api/taskApi";
// import TaskItem from "./TaskItem";

// const TaskList = () => {
//   const dispatch = useDispatch();
//   const { data, error, isLoading } = useGetMyTasksQuery();
//   const [updateTask] = useUpdateTaskMutation();

//   if (isLoading) {
//     return <Spinner />;
//   }

//   if (error) {
//     return <Text>Error loading tasks</Text>;
//   }

//   const tasks = data?.tasks || [];
//   const incompleteTasks = tasks.filter((task) => !task.completed);
//   const completedTasks = tasks.filter((task) => task.completed);

//   const handleDragEnd = async (result) => {
//     if (!result.destination) return;
//     const { source, destination } = result;
//     const task = tasks.find((task) => task._id === result.draggableId);
//     const [updateTask, { data, isError, isSuccess }] = useUpdateTaskMutation();

//     const updatedTask = {
//       ...task,
//       completed: destination.droppableId === "completedTasks",
//     };
//     console.log(updateTask);
//     try {
//       await updateTask(updatedTask);
//     } catch (error) {
//       console.log(erro);
//     }
//   };

//   return (
//     <DragDropContext onDragEnd={handleDragEnd}>
//       <Flex
//         minW={["100%", "100%", "100%", "66.66%"]}
//         gap={2}
//         direction={["column", "column", "column", "row"]}
//       >
//         <Grid
//           templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]}
//           gap={2}
//           w="100%"
//         >
//           {/* Incomplete Tasks Box */}
//           <Droppable droppableId="incompleteTasks">
//             {(provided) => (
//               <Box
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 w="100%"
//                 p="20px"
//                 borderRadius="8px"
//                 boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
//               >
//                 <Heading
//                   size="lg"
//                   mb="20px"
//                   textAlign="center"
//                   bg="#4299E1"
//                   color="white"
//                   py="10px"
//                   borderRadius="8px"
//                 >
//                   Incomplete Tasks
//                 </Heading>
//                 <TaskItem tasks={incompleteTasks} />
//                 {provided.placeholder}
//               </Box>
//             )}
//           </Droppable>

//           {/* Completed Tasks Box */}
//           <Droppable droppableId="completedTasks">
//             {(provided) => (
//               <Box
//                 {...provided.droppableProps}
//                 ref={provided.innerRef}
//                 w="100%"
//                 p="20px"
//                 borderRadius="8px"
//                 boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
//               >
//                 <Heading
//                   size="lg"
//                   mb="20px"
//                   textAlign="center"
//                   bg="#4299E1"
//                   color="white"
//                   py="10px"
//                   borderRadius="8px"
//                 >
//                   Completed Tasks
//                 </Heading>
//                 <TaskItem tasks={completedTasks} />
//                 {provided.placeholder}
//               </Box>
//             )}
//           </Droppable>
//         </Grid>
//       </Flex>
//     </DragDropContext>
//   );
// };

// export default TaskList;

import React from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import {
  Box,
  Flex,
  Grid,
  Heading,
  Spinner,
  Text,
  useToast,
} from "@chakra-ui/react";
import {
  useGetMyTasksQuery,
  useUpdateTaskMutation,
} from "../../Redux/Api/taskApi";
import TaskItem from "./TaskItem";
import Toaster from "../UI/Toaster";

const TaskList = () => {
  const { data, error, isLoading } = useGetMyTasksQuery();
  const [updateTask] = useUpdateTaskMutation();
  const toast = useToast();
  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <Text>Error loading tasks</Text>;
  }

  const tasks = data?.tasks || [];
  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const task = tasks.find((task) => task._id === result.draggableId);
    const updatedTask = {
      ...task,
      completed: result.destination.droppableId === "completedTasks",
    };

    try {
      await updateTask(updatedTask);
    } catch (error) {
      toast(Toaster("error", "Failed to update task"));
      console.error("error", "Failed to update task:", error);
    }
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Flex
        minW={["100%", "100%", "100%", "66.66%"]}
        gap={2}
        direction={["column", "column", "column", "row"]}
      >
        <Grid
          templateColumns={["1fr", "1fr", "1fr", "1fr 1fr"]}
          gap={2}
          w="100%"
        >
          {/* Incomplete Tasks Box */}
          <Droppable droppableId="incompleteTasks">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                p="20px"
                borderRadius="8px"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              >
                <Heading
                  size="lg"
                  mb="20px"
                  textAlign="center"
                  bg="#4299E1"
                  color="white"
                  py="10px"
                  borderRadius="8px"
                >
                  Incomplete Tasks
                </Heading>
                <TaskItem tasks={incompleteTasks} />
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          {/* Completed Tasks Box */}
          <Droppable droppableId="completedTasks">
            {(provided) => (
              <Box
                {...provided.droppableProps}
                ref={provided.innerRef}
                w="100%"
                p="20px"
                borderRadius="8px"
                boxShadow="0 4px 8px rgba(0, 0, 0, 0.1)"
              >
                <Heading
                  size="lg"
                  mb="20px"
                  textAlign="center"
                  bg="#4299E1"
                  color="white"
                  py="10px"
                  borderRadius="8px"
                >
                  Completed Tasks
                </Heading>
                <TaskItem tasks={completedTasks} />
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </Grid>
      </Flex>
    </DragDropContext>
  );
};

export default TaskList;
