import { useEffect, useState } from "react";
import { getChapter } from "../../../services/game";
import { errorNotification } from "../../../services/error";
import { Center, Box } from "@chakra-ui/react";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import sword from "../../../assets/sword.png";
import talk from "../../../assets/talk.png";
import GameTitle from "../GameTitle";
import GameBox from "../GameBox";
import GameMainText from "../GameMainText";
import GameOption from "../GameOption";
import GameOptionResult from "../GameOptionResult";
import GameNextChapter from "../GameNextChapter";

const FirstChapter = () => {
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

  const CHAPTER = 1;
  const [part, setPart] = useState(1);
  const MAX_PARTS = 1;
  const TO_NEXT_CHAPTER = part > MAX_PARTS;

  const navigate = useNavigate();

  const fetchData = () => {
    if (part <= MAX_PARTS) {
      getChapter(CHAPTER, part)
        .then((res) => {
          const {
            mainText,
            swordOption,
            swordOptionResult,
            talkOption,
            talkOptionResult,
          } = res.data;
          const newData = {
            mainText,
            swordOption,
            swordOptionResult,
            talkOption,
            talkOptionResult,
            isSwordOptionVisible: true,
            isSwordOptionResultVisible: false,
            isTalkOptionVisible: true,
            isTalkOptionResultVisible: false,
          };
          setData((prev) => [...prev, newData]);
          setLoading(false);
        })
        .catch((err) => {
          setError(err.response.data.detail);
          errorNotification(err.response.data.detail);
        });
    }
  };

  useEffect(() => {
    fetchData();
  }, [part]);

  if (loading) {
    return getLoading();
  }

  if (error) {
    getError();
  }

  return (
    <GameBox>
      <Center>
        <GameTitle title={"FIRST CHAPTER"} />
      </Center>
      {data.map((block, index) => (
        <Box key={index}>
          <GameMainText mainText={block.mainText} />
          {block.isSwordOptionVisible && (
            <GameOption
              option={block.swordOption}
              image={sword}
              onClick={() => {
                setPart((prev) => prev + 1);
                block.isSwordOptionVisible = false;
                block.isTalkOptionVisible = false;
                block.isSwordOptionResultVisible = true;
              }}
            />
          )}
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
          {block.isSwordOptionResultVisible && (
            <GameOptionResult optionResult={block.swordOptionResult} />
          )}
          {block.isTalkOptionResultVisible && (
            <GameOptionResult optionResult={block.talkOptionResult} />
          )}
        </Box>
      ))}
      {TO_NEXT_CHAPTER && (
        <Center>
          <GameNextChapter onClick={() => navigate("/second_chapter")} />
        </Center>
      )}
    </GameBox>
  );
};

export default FirstChapter;
