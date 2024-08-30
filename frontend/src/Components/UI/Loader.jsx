import { Box, Image } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <Box
      backgroundColor={"#1e91f3"}
      display={"flex"}
      justifyContent="center"
      minHeight={"100vh"}
    >
      <Image
        src="https://www.zilliondesigns.com/blog/wp-content/uploads/note-loader.gif"
        alt="loader not img found"
      />
    </Box>
  );
};

export default Loader;
