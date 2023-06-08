import { useEffect, useState } from "react";
import { getChapter } from "../../../services/game";
import { errorNotification } from "../../../services/error";
import { Center, Box } from "@chakra-ui/react";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import talk from "../../../assets/talk.png";
import GameBox from "../GameBox";
import GameTitle from "../GameTitle";
import GameMainText from "../GameMainText";
import GameOption from "../GameOption";
import GameOptionResult from "../GameOptionResult";
import GameNextChapter from "../GameNextChapter";

const FifthChapter = () => {
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

  const CHAPTER = 5;
  const [part, setPart] = useState(1);
  const MAX_PARTS = 3;
  const TO_NEXT_CHAPTER = part > MAX_PARTS;

  const navigate = useNavigate();

  const fetchData = () => {
    if (part <= MAX_PARTS) {
      setLoading(true);
      getChapter(CHAPTER, part)
        .then((res) => {
          const { mainText, talkOption, talkOptionResult } = res.data;
          const newData = {
            mainText,
            talkOption,
            talkOptionResult,
            isTalkOptionVisible: true,
            isTalkOptionResultVisible: false,
          };
          setData((prev) => [...prev, newData]);
        })
        .catch((err) => {
          setError(err.response.data.detail);
          errorNotification(err.response.data.detail);
        })
        .finally(setLoading(false));
    }
  };

  useEffect(() => {
    fetchData();
  }, [part]);

  if (loading) {
    getLoading();
  }

  if (error) {
    getError();
  }

  return (
    <GameBox>
      <Center>
        <GameTitle title={"FIFTH CHAPTER"} />
      </Center>
      {data.map((block, index) => (
        <Box key={index}>
          <GameMainText mainText={block.mainText} />
          {block.isTalkOptionVisible && (
            <GameOption
              option={block.talkOption}
              image={talk}
              onClick={() => {
                setPart((prev) => prev + 1);
                block.isSwordOptionVisible = false;
                block.isTalkOptionVisible = false;
                block.isTalkOptionResultVisible = true;
              }}
            />
          )}
          {block.isTalkOptionResultVisible && (
            <GameOptionResult optionResult={block.talkOptionResult} />
          )}
        </Box>
      ))}
      {TO_NEXT_CHAPTER && (
        <Center>
          <GameNextChapter onClick={() => navigate("/sixth_chapter")} />
        </Center>
      )}
    </GameBox>
  );
};

export default FifthChapter;
