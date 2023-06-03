import { Box } from "@chakra-ui/react";
import background from "./assets/background.mp4";
import { useEffect } from "react";
import { getPrologue } from "./services/game";
import { useToast } from "@chakra-ui/react";

function App() {
  const toast = useToast();

  const fetchData = () => {
    getPrologue()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        toast({
          position: "top",
          duration: 3_000,
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
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Box
        _after={{
          position: "fixed",
          height: "100%",
          width: "100%",
          content: '""',
          backgroundColor: "rgba(0, 0, 0, 0.45)",
          zIndex: "-1",
        }}
      >
        <Box
          position={"fixed"}
          display={"grid"}
          top={"0"}
          left={"0"}
          height={"100%"}
          width={"100%"}
          placeItems={"center"}
          zIndex={"-2"}
        >
          <Box
            as="video"
            src={background}
            height={"100%"}
            width={"100%"}
            objectFit={"cover"}
            autoPlay={true}
            muted={true}
            loop={true}
          />
        </Box>
      </Box>
    </>
  );
}

export default App;
