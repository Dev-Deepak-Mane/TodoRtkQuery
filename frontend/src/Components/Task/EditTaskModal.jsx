import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  FormControl,
  Input,
  FormLabel,
  Icon,
  Box,
  useToast,
} from "@chakra-ui/react";
import React, { useRef } from "react";

import { EditIcon } from "@chakra-ui/icons";
import { useEditTaskMutation } from "../../Redux/Api/taskApi";
import Toaster from "../UI/Toaster";

export const EditTaskModal = ({ task }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editTask, { data, isError, isSuccess }] = useEditTaskMutation();
  const formRef = useRef();
  const toast = useToast();

  const handleEdit = async () => {
    const updatedTask = {
      ...task,
      title: formRef.current[0].value,
      description: formRef.current[1].value,
    };
    if (updatedTask.title.trim() && updatedTask.description.trim()) {
      try {
        await editTask(updatedTask);
        if (isSuccess && data) {
          console.log(data);
          toast(Toaster("success", data?.message));
        }
      } catch (error) {
        if (isError && error?.data?.message) {
          toast(Toaster("error", error.data.message));
        }
      }
      onClose();
    }
  };

  return (
    <>
      <Icon as={EditIcon} onClick={onOpen} />

      <Modal initialFocusRef={formRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Task</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form ref={formRef}>
              <FormControl>
                <FormLabel>Title</FormLabel>
                <Input
                  placeholder="Title..."
                  name="title"
                  defaultValue={task.title}
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Description</FormLabel>
                <Input
                  placeholder="Description..."
                  name="description"
                  defaultValue={task.description}
                />
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEdit}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
