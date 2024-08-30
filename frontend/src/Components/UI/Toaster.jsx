import React from "react";
// import { useToast } from "@chakra-ui/react";
const Toaster = (status, message) => {
  // const toast = useToast();
  return {
    title: `${message}`,
    status: status,
    isClosable: true,
    position: "top",
    duration: 1000,
  };
};

export default Toaster;
