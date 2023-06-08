import { Text, Button } from "@chakra-ui/react";

const GameNextChapter = ({ onClick }) => {
  return (
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
      onClick={onClick}
    >
      <Text display={"inline-block"} fontSize={"40px"}>
        Next Chapter...
      </Text>
    </Button>
  );
};

export default GameNextChapter;
