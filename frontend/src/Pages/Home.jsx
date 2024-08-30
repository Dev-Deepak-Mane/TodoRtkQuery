import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import TaskForm from "../Components/Task/TaskForm";
import TaskList from "../Components/Task/TaskList";

const Home = () => {
  return (
    <Flex
      mt="90px"
      direction={["column", "column", "column", "row"]}
      justify="space-between"
      gap={2}
      mx={"auto"}
      w="99%"
    >
      <TaskForm />
      <TaskList />
    </Flex>
  );
};

export default Home;
