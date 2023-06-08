import { Text } from "@chakra-ui/react";

const GameMainText = ({ mainText }) => {
  return mainText.map((parag, index) => (
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
      {parag}
    </Text>
  ));
};

export default GameMainText;
