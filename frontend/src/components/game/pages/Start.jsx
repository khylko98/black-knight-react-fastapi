import { Center, Button, Image, Container, VStack } from "@chakra-ui/react";
import poster from "../../../assets/poster.png";
import signature from "../../../assets/signature.png";
import { useNavigate } from "react-router-dom";

const Start = () => {
  const navigate = useNavigate();

  const handlerClick = () => {
    navigate("/prologue");
  };

  return (
    <Center>
      <VStack>
        <Image
          src={poster}
          alt="poster"
          h={"65vh"}
          m={"15px"}
          mt={"25px"}
          boxShadow={"7px 7px 3px rgb(0, 0, 0, .6)"}
          borderRadius={"10px"}
        />
        <Container color={"white"} fontSize={"xl"} textAlign={"center"}>
          This is the fantasy role-playing text browser game created by Mykyta{" "}
          <Image
            src={signature}
            display={"inline"}
            h={"3vh"}
            mb={"-3px"}
            mr={"3px"}
          />
          Khylko on 2023. Story of this game is about a few characters and they
          path throw big kingdom to destroy giant dragon. In this game player
          can choose options of actions and choose options in dialogs.
        </Container>
        <Button
          m={"20px"}
          fontWeight={"600"}
          fontSize={"4xl"}
          borderStyle={"none"}
          backgroundColor={"rgb(0, 0, 0, .0)"}
          color={"white"}
          userSelect={"none"}
          _hover={{
            textShadow:
              "3px 3px 10px rgb(255, 25, 250)," +
              "3px 3px 20px rgb(255, 25, 200)," +
              "3px 3px 40px rgb(255, 25, 150)," +
              "3px 3px 80px rgb(255, 25, 100)," +
              "3px 3px 120px rgb(255, 25, 0)",
          }}
          onClick={handlerClick}
        >
          START GAME
        </Button>
      </VStack>
    </Center>
  );
};

export default Start;
