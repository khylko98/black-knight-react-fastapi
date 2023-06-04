import { Box } from "@chakra-ui/react";

const AuthBox = ({ children }) => {
  return (
    <Box
      display={"flex"}
      position={"relative"}
      h={"100vh"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Box
        backgroundColor={"rgba(40, 40, 40, 0.3)"}
        boxShadow={"0 3px 30px black"}
        borderRadius={"3%"}
      >
        {children}
      </Box>
    </Box>
  );
};

export default AuthBox;
