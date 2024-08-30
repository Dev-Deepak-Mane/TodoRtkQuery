import React, { useEffect } from "react";
import {
  Box,
  Flex,
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorModeValue,
  Stack,
  useColorMode,
  Center,
  Text,
  useToast,
} from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Link, Outlet, useNavigate } from "react-router-dom";

import {
  useGetProfileQuery,
  useLogoutUserMutation,
} from "../../Redux/Api/userApi";
import Toaster from "./Toaster";
import userImage from "../User/user.png";
function Navbar() {
  const { data: user, refetch, isSuccess } = useGetProfileQuery();
  const [logoutUser, { isLoading }] = useLogoutUserMutation();
  const { colorMode, toggleColorMode } = useColorMode();
  const toast = useToast();
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const response = await logoutUser().unwrap();
      refetch();
      toast(Toaster("warning", response.message || "Logout successful"));
      navigate("/login");
    } catch (error) {
      console.error("Failed to logout: ", error);

      //Display the error message from the server or a default message
      toast(
        Toaster(
          "error",
          error.data?.message || "Logout failed. Please try again."
        )
      );
    }
  };
  // Re-fetch user data on mount or after logout
  useEffect(() => {
    refetch();
  }, [refetch]);
  return (
    <>
      <Box
        bg={useColorModeValue("#4299E1", "#4299E1")}
        px={4}
        position="fixed"
        top={0}
        minW="100%"
        zIndex={100}
      >
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <Link to="/">
            <Box fontSize={"20px"} fontWeight="bold">
              Let's DO
            </Box>
          </Link>

          <Flex alignItems={"center"}>
            <Stack direction={"row"} spacing={6} mr="30px">
              <Button onClick={toggleColorMode}>
                {colorMode === "light" ? <MoonIcon /> : <SunIcon />}
              </Button>
              {isSuccess && user ? (
                <Menu>
                  <MenuButton
                    as={Button}
                    rounded={"full"}
                    variant={"ghost"}
                    cursor={"pointer"}
                    p={0}
                    _focus={{ boxShadow: "blue.200", outline: "none" }} // Remove focus ring and outline
                    _focusVisible={{ boxShadow: "blue.200", outline: "none" }} // Double check focusVisible
                  >
                    <Avatar size={"sm"} src={userImage} />
                  </MenuButton>
                  <MenuList alignItems={"center"}>
                    <br />
                    <Center>
                      <Avatar size={"2xl"} src={userImage} />
                    </Center>
                    <br />
                    <Center>
                      <Text fontWeight="bold">{user?.name}</Text>
                    </Center>
                    <br />
                    <MenuDivider />
                    <Link to="/profile">
                      <MenuItem>Profile</MenuItem>
                    </Link>
                    <MenuDivider />
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </MenuList>
                </Menu>
              ) : (
                <>
                  <Link to="/login">
                    <Button>Login</Button>
                  </Link>
                  <Link to="/signup">
                    <Button>SignUp</Button>
                  </Link>
                </>
              )}
            </Stack>
          </Flex>
        </Flex>
      </Box>
      <Outlet />
    </>
  );
}

export default Navbar;
