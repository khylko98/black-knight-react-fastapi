import { Box } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();

export const errorNotification = (err) => {
  toast({
    position: "top",
    duration: 3000,
    render: () => (
      <Box
        p={3}
        backgroundColor={"rgba(100, 0, 0, 0.3)"}
        boxShadow={"0 3px 30px black"}
        borderRadius={"2xl"}
        fontSize={"2xl"}
        textColor={"red"}
        textAlign={"center"}
      >
        {`${err}`}
      </Box>
    ),
  });
};
