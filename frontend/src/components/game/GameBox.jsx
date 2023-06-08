import { Box } from "@chakra-ui/react";

const GameBox = ({ children }) => {
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
      {children}
    </Box>
  );
};

export default GameBox;
