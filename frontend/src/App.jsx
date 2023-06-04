import { Box } from "@chakra-ui/react";
import background from "./assets/background.mp4";
import { useEffect } from "react";
import { getPrologue } from "./services/game";
import { errorNotification } from "./services/error";

function App() {
  const fetchData = () => {
    getPrologue()
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        errorNotification(err);
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
