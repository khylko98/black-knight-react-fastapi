import { useEffect } from "react";
import { getPrologue } from "../../../services/game";
import { errorNotification } from "../../../services/error";
import { Center, Box } from "@chakra-ui/react";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import GameMainText from "../GameMainText";
import GameNextChapter from "../GameNextChapter";
import GameTitle from "../GameTitle";
import GameBox from "../GameBox";

const Prologue = () => {
  const {
    data,
    setData,
    loading,
    setLoading,
    error,
    setError,
    getLoading,
    getError,
  } = useGameContext();

  const navigate = useNavigate();

  const fetchData = () => {
    setLoading(true);
    getPrologue()
      .then((res) => {
        const { mainText } = res.data;
        setData((prev) => [...prev, mainText]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.detail);
        errorNotification(err.response.data.detail);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return getLoading();
  }

  if (error) {
    getError();
  }

  return (
    <GameBox>
      <Center>
        <GameTitle title={"PROLOGUE"} />
      </Center>
      {data.map((block, index) => (
        <Box key={index}>
          <GameMainText mainText={block} />
        </Box>
      ))}
      <Center>
        <GameNextChapter onClick={() => navigate("/first_chapter")} />
      </Center>
    </GameBox>
  );
};

export default Prologue;
