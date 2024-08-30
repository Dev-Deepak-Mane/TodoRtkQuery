import React, { useRef, useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Box,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useAddTaskMutation } from "../../Redux/Api/taskApi";
// Import the addTask mutation

const TaskForm = () => {
  const ref = useRef(null);
  const [addTask, { isLoading, isSuccess, isError, error, data }] =
    useAddTaskMutation();
  const toast = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: ref.current[0].value,
      description: ref.current[1].value,
    };
    await addTask(payload);
  };

  if (isError && error.data?.message) {
    toast({
      title: "Error",
      description: error.data.message,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  }

  if (isSuccess && data) {
    toast({
      title: "Success",
      description: "Task added successfully!",
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    ref.current.reset(); // Clear the form after successful submission
  }

  return (
    <Box maxW={["100%", "100%", "100%", "33.33%"]}>
      <Box>
        <Flex align={"center"} justify={"center"}>
          <Stack spacing={8} mx={"auto"} py={5} px={6}>
            <Heading
              size="lg"
              mb="20px"
              textAlign="center"
              bg="#4299E1"
              color="white"
              py="10px"
              borderRadius="8px"
            >
              Add New Task
            </Heading>
            <Box
              rounded={"lg"}
              minW={["300px", "400px"]}
              boxShadow={"lg"}
              p={8}
            >
              <form ref={ref} onSubmit={handleSubmit}>
                <Stack spacing={4}>
                  <FormControl id="title" isRequired>
                    <FormLabel>Title of task</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <FormControl id="description" isRequired>
                    <FormLabel>Description of task</FormLabel>
                    <Input type="text" />
                  </FormControl>
                  <Stack spacing={10}>
                    <Button
                      isDisabled={isLoading}
                      type="submit"
                      bg={"blue.400"}
                      color={"white"}
                      _hover={{
                        bg: "blue.500",
                      }}
                    >
                      {isLoading ? (
                        <Spinner
                          thickness="2px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="blue.500"
                        />
                      ) : (
                        "Add"
                      )}
                    </Button>
                  </Stack>
                </Stack>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Box>
    </Box>
  );
};

export default TaskForm;
