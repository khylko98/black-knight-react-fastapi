import { Text, Button, IconButton, Image } from "@chakra-ui/react";

const GameOption = ({ option, image, onClick }) => {
  return option.map((parag, index) => (
    <Button
      variant={"unstyled"}
      m={"20px 30px"}
      display={"inline-flex"}
      alignItems={"center"}
      justifyContent={"center"}
      cursor={"pointer"}
      backgroundColor={"transparent"}
      color={"#ffffff"}
      border={"#ffffff"}
      _hover={{
        opacity: 1,
        filter: "drop-shadow(0 0 6px white)",
      }}
      onClick={onClick}
      leftIcon={
        <IconButton
          variant={"unstyled"}
          icon={<Image src={image} w={"40px"} />}
        />
      }
      key={index}
    >
      <Text
        display={"inline-block"}
        textAlign={"left"}
        whiteSpace={"initial"}
        fontSize={"24px"}
      >
        {parag}
      </Text>
    </Button>
  ));
};

export default GameOption;
