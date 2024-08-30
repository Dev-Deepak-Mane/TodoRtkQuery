import React, { useRef, useState } from "react";
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
import { useDispatch } from "react-redux";
import { useRegisterUserMutation } from "../Redux/Api/userApi";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const SignUp = () => {
  const ref = useRef(null);
  const [registerUser, { isLoading, isSuccess, isError, error, data }] =
    useRegisterUserMutation();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSignup = async (e) => {
    e.preventDefault();
    const payload = {
      name: ref.current[0].value,
      email: ref.current[1].value,
      password: ref.current[2].value,
    };
    await registerUser(payload);
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
      description: `Welcome ${data.user.name}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
    navigate("/"); // Navigate to the home page
  }

  return (
    <Box>
      <Flex minH={"100vh"} align={"center"} justify={"center"}>
        <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
          <Stack align={"center"}>
            <Heading fontSize={"4xl"}>Create your account</Heading>
            <Flex gap={"5px"}>
              <Text fontSize={"lg"} color={"gray.600"}>
                Already have an account?
              </Text>
              <Link to="/login">
                <Text color={"blue.400"}> Login here ✌️</Text>
              </Link>
            </Flex>
          </Stack>

          <Box rounded={"lg"} boxShadow={"lg"} p={8}>
            <form ref={ref} onSubmit={handleSignup}>
              <Stack spacing={4}>
                <FormControl id="name" isRequired>
                  <FormLabel>Name</FormLabel>
                  <Input type="text" />
                </FormControl>
                <FormControl id="email" isRequired>
                  <FormLabel>Email address</FormLabel>
                  <Input type="email" />
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
                      <>Sign up</>
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

export default SignUp;
