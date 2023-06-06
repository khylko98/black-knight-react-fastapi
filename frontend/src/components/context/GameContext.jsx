import { useState } from "react";
import { Center, Spinner, Box, Container, Text } from "@chakra-ui/react";

export const useGameContext = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getLoading = () => {
    return (
      <Center>
        <Spinner
          m={"1.5"}
          thickness={"4px"}
          speed={"0.65s"}
          emptyColor={"gray.200"}
          color={"green.500"}
          size={"xl"}
        />
      </Center>
    );
  };

  const getError = () => {
    return (
      <Box
        display={"flex"}
        position={"relative"}
        h={"100vh"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Container color={"white"} fontSize={"7xl"} textAlign={"center"}>
          <Text>Ooops there was an error...</Text>
        </Container>
      </Box>
    );
  };

  return {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    getLoading,
    getError,
  };
};
