import { useEffect } from "react";
import { getEpilogue } from "../../../services/game";
import { errorNotification } from "../../../services/error";
import { Center, Box, Button, Text } from "@chakra-ui/react";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import GameMainText from "../GameMainText";
import GameTitle from "../GameTitle";
import GameBox from "../GameBox";

const Epilogue = () => {
  const {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    getLoading,
    getError,
  } = useGameContext();

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    getEpilogue()
      .then((res) => {
        const { mainText } = res.data;
        setData((prev) => [...prev, mainText]);
      })
      .catch((err) => {
        setError(err.response.data.detail);
        errorNotification(err.response.data.detail);
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    getLoading();
  }

  if (error) {
    getError();
  }

  return (
    <GameBox>
      <Center>
        <GameTitle title={"EPILOGUE"} />
      </Center>
      {data.map((block, index) => (
        <Box key={index}>
          <GameMainText mainText={block} />
        </Box>
      ))}
      <Center>
        <Button
          variant={"unstyled"}
          m={"20px auto"}
          display={"inline-flex"}
          alignItems={"center"}
          justifyContent={"center"}
          cursor={"pointer"}
          backgroundColor={"transparent"}
          color={"#ffffff"}
          border={"#ffffff"}
          _hover={{
            opacity: "1",
            textShadow: "0 0 6px rgba(255, 255, 255, 1)",
          }}
          onClick={() => navigate("/start")}
        >
          <Text display={"inline-block"} fontSize={"40px"}>
            To Start Page...
          </Text>
        </Button>
      </Center>
    </GameBox>
  );
};

export default Epilogue;
