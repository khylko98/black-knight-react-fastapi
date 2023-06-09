import { Text, Button, Image } from "@chakra-ui/react";

const GameOption = ({ option, image, onClick }) => {
  return option.map((parag, index) => (
    <Button
      variant="unstyled"
      m="20px 30px"
      display="inline-flex"
      alignItems="center"
      justifyContent="flex-start"
      cursor="pointer"
      backgroundColor="transparent"
      color="#ffffff"
      border="#ffffff"
      _hover={{
        opacity: 1,
        filter: "drop-shadow(0 0 6px white)",
      }}
      onClick={onClick}
      key={index}
      size="auto"
    >
      <Image src={image} alt="Option Image" w="40px" mr="10px" />
      <Text
        display="inline-block"
        textAlign="left"
        whiteSpace="initial"
        fontSize="24px"
      >
        {parag}
      </Text>
    </Button>
  ));
};

export default GameOption;
