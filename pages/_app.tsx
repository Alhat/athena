// pages/_app.tsx

import { ChakraProvider, Box, Heading, Input, Button } from "@chakra-ui/react";
import theme from "../styles/theme";
import { useState } from "react";
import axios from "axios"; // Import axios for making HTTP requests

const MyApp: React.FC = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (username: string, password: string) => {
    try {
      // Make a POST request to your backend endpoint
      const response = await axios.post(
        "http://localhost:3001/api/user/set-user",
        {
          user_id: username,
        }
      );

      // Assuming the backend returns a token upon successful authentication
      // const token = response.data.token;
      if (
        response.data.message === "User added and set successfully" ||
        response.data.message === "User found and set successfully"
      ) {
        // Set the token in local storage or session storage for future requests
        //localStorage.setItem("token", token);
        // Set isLoggedIn to true indicating successful login
        setIsLoggedIn(true);
      }
    } catch (error) {
      // Handle errors, such as incorrect credentials or server errors
      alert("Incorrect username or password. Please try again.");
      console.error("Login failed:", error);
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={0} maxW="100%" mx="auto">
        {isLoggedIn ? (
          // Render the app content if user is logged in
          <Component {...pageProps} />
        ) : (
          // Render login page if user is not logged in
          <Box bg="gray.100" p={6} borderRadius="md" boxShadow="md">
            <Heading as="h1" mb={4} textAlign="center">
              Login
            </Heading>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const enteredUsername = e.target.username.value;
                const enteredPassword = e.target.password.value;
                handleLogin(enteredUsername, enteredPassword);
              }}
            >
              <Input
                type="text"
                id="username"
                placeholder="Enter Username"
                mb={2}
                required
              />
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
                mb={4}
                required
              />
              <Button type="submit" colorScheme="teal" size="md" w="100%">
                Login
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default MyApp;

/*
// pages/_app.tsx
import { ChakraProvider, Box, Heading, Input, Button } from "@chakra-ui/react";
import theme from "../styles/theme";
import { useState } from "react";
import axios from "axios";

const MyApp: React.FC = ({ Component, pageProps }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username: string, password: string) => {
    if (username === "username" && password === "password") {
      setIsLoggedIn(true);
    } else {
      alert("Incorrect username or password. Please try again.");
    }
  };

  return (
    <ChakraProvider theme={theme}>
      <Box p={0} maxW="100%" mx="auto">
        {isLoggedIn ? (
          // Render the app content if user is logged in
          <Component {...pageProps} />
        ) : (
          // Render login page if user is not logged in
          <Box bg="gray.100" p={6} borderRadius="md" boxShadow="md">
            <Heading as="h1" mb={4} textAlign="center">
              Login
            </Heading>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const enteredUsername = e.target.username.value;
                const enteredPassword = e.target.password.value;
                handleLogin(enteredUsername, enteredPassword);
              }}
            >
              <Input
                type="text"
                id="username"
                placeholder="Enter Username"
                mb={2}
                required
              />
              <Input
                type="password"
                id="password"
                placeholder="Enter Password"
                mb={4}
                required
              />
              <Button type="submit" colorScheme="teal" size="md" w="100%">
                Login
              </Button>
            </form>
          </Box>
        )}
      </Box>
    </ChakraProvider>
  );
};

export default MyApp;
"""
*/
