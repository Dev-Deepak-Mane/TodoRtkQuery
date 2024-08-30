import { Box, Spacer, VStack } from "@chakra-ui/react";
import React from "react";

import { Flex, Heading, Avatar } from "@chakra-ui/react";

import { useGetProfileQuery } from "../Redux/Api/userApi";
import userImage from "../Components/User/user.png";
const Profile = () => {
  const {
    data: { user: user },
  } = useGetProfileQuery();

  return (
    <Box padding="70px">
      {/* <UserProfileEdit /> */}
      <Flex maxW={"100vw"} align={"center"} justify={"center"}>
        <VStack
          spacing={5}
          w={"full"}
          maxW={"md"}
          // bg={useColorModeValue("white", "gray.700")}
          rounded={"xl"}
          boxShadow={"lg"}
          p={6}
          my={12}
          textAlign="center"
          minW={["300px", "auto"]}
          h={"400px"}
        >
          <Flex gap={"20px"}>
            <Heading lineHeight={1.1} fontSize={{ base: "2xl", sm: "3xl" }}>
              User Profile
            </Heading>
            <Spacer />
            {/* <BasicUsage /> */}
          </Flex>
          <Avatar size="xl" src={userImage}></Avatar>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            {user?.name}
          </Heading>
          <Heading lineHeight={1.1} fontSize={{ base: "xl", sm: "2xl" }}>
            {user?.email}
          </Heading>
        </VStack>
      </Flex>
    </Box>
  );
};

export default Profile;
