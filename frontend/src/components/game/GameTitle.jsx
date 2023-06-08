import { Text } from "@chakra-ui/react";

const GameTitle = ({ title }) => {
  return (
    <Text
      maxWidth={"1000px"}
      m={"20px"}
      fontSize={"50px"}
      fontWeight={"700"}
      textAlign={"center"}
      color={"transparent"}
    >
      {title}
    </Text>
  );
};

export default GameTitle;
