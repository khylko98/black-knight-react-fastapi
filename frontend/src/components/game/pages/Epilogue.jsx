import { useEffect } from "react";
import { getEpilogue } from "../../../services/game";
import { errorNotification } from "../../../services/error";
import { Center, Box, Text, Button } from "@chakra-ui/react";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";

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

  const handlerClick = () => {
    navigate("/start");
  };

  return (
    <Box
      m={"auto 17%"}
      position={"absolute"}
      background={
        "linear-gradient(" +
        "transparent 0%," +
        "currentColor 10%," +
        "currentColor 95%," +
        "transparent 100%)"
      }
      backgroundClip={"text"}
      WebkitBackgroundClip={"text"}
      backgroundAttachment={"fixed"}
      color={"white"}
    >
      <Center>
        <Text
          maxWidth={"1000px"}
          m={"20px"}
          fontSize={"50px"}
          fontWeight={"700"}
          textAlign={"center"}
          color={"transparent"}
        >
          EPILOGUE
        </Text>
      </Center>
      {data.map((block, index) => (
        <Box key={index}>
          {block.map((text, index) => (
            <Text
              maxWidth={"1000px"}
              m={"20px 0"}
              textAlign={"justify"}
              textIndent={"1.5em"}
              fontSize={"24px"}
              fontWeight={"700"}
              color={"transparent"}
              key={index}
            >
              {text}
            </Text>
          ))}
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
          onClick={handlerClick}
        >
          <Text display={"inline-block"} fontSize={"40px"}>
            To Start Page...
          </Text>
        </Button>
      </Center>
    </Box>
  );
};

export default Epilogue;
