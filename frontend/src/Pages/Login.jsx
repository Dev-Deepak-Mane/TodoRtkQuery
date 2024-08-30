import React, { useRef, useState, useEffect } from "react";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Button,
  Heading,
  Text,
  useToast,
  IconButton,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../Redux/Api/userApi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import Toaster from "../Components/UI/Toaster";

const Login = () => {
  const ref = useRef(null);
  const [loginUser, { isLoading, isSuccess, isError, error, data }] =
    useLoginUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Handle success and error side effects
  useEffect(() => {
    if (isError && error?.data?.message) {
      toast(Toaster("error", error.data.message));
    }

    if (isSuccess && data) {
      toast(Toaster("success", `Welcome back, ${data.user.name}`));
      navigate("/");
    }
  }, [isError, isSuccess, error, data, navigate, toast]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const payload = {
      email: ref.current[0].value,
      password: ref.current[1].value,
    };
    await loginUser(payload);
  };

  return (
    <Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Login to your account</Heading>
            <Flex gap={"5px"}>
              <Text fontSize={"lg"} color={"gray.600"}>
                Don't have an account?
              </Text>
              <Link to="/signup">
                <Text color={"blue.400"}> Sign up here ✌️</Text>
              </Link>
            </Flex>
          </Stack>

          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <form ref={ref} onSubmit={handleLogin}>
              <Stack spacing={4}>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" placeholder="Email" />
                </FormControl>
                <FormControl id="password" isRequired>
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Password"
                    />
                    <InputRightElement>
                      <IconButton
                        variant="link"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </InputRightElement>
                  </InputGroup>
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
                      <>Log in</>
                    )}
                  </Button>
                </Stack>
              </Stack>
            </form>
          </Box>
        </Stack>
      </Flex>
    </Box>
  );
};

export default Login;
