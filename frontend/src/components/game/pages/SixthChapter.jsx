import { useEffect, useState } from "react";
import { getChapter } from "../../../services/game";
import { errorNotification } from "../../../services/error";
import { Center, Box, Text, Button, IconButton, Image } from "@chakra-ui/react";
import { useGameContext } from "../../context/GameContext";
import { useNavigate } from "react-router-dom";
import talk from "../../../assets/talk.png";

const SixthChapter = () => {
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

  const chapter = 6;
  const [part, setPart] = useState(1);
  const maxPart = 5;
  const toNextChapter = part > maxPart;

  const navigate = useNavigate();

  const fetchData = () => {
    if (part <= maxPart) {
      setLoading(true);
      getChapter(chapter, part)
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

  const handlerClick = () => {
    navigate("/seventh_chapter");
  };

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
      <Center>
        <Text
          maxWidth={"1000px"}
          m={"20px"}
          fontSize={"50px"}
          fontWeight={"700"}
          textAlign={"center"}
          color={"transparent"}
        >
          SIXTH CHAPTER
        </Text>
      </Center>
      {data.map((block, index) => (
        <Box key={index}>
          {block.mainText.map((mTparag, mTindex) => (
            <Text
              maxWidth={"1000px"}
              m={"20px 0"}
              textAlign={"justify"}
              textIndent={"1.5em"}
              fontSize={"24px"}
              fontWeight={"700"}
              color={"transparent"}
              key={mTindex}
            >
              {mTparag}
            </Text>
          ))}
          {block.isTalkOptionVisible &&
            block.talkOption.map((tOparag, tOindex) => (
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
                onClick={() => {
                  setPart((prev) => prev + 1);
                  block.isTalkOptionVisible = false;
                  block.isTalkOptionResultVisible = true;
                }}
                leftIcon={
                  <IconButton
                    variant={"unstyled"}
                    icon={<Image src={talk} w={"40px"} />}
                  />
                }
                key={tOindex}
              >
                <Text
                  display={"inline-block"}
                  textAlign={"left"}
                  whiteSpace={"initial"}
                  fontSize={"24px"}
                >
                  {tOparag}
                </Text>
              </Button>
            ))}
          {block.isTalkOptionResultVisible &&
            block.talkOptionResult.map((tORparag, tORndex) => (
              <Text
                maxWidth={"1000px"}
                m={"20px 0"}
                textAlign={"justify"}
                textIndent={"1.5em"}
                fontSize={"24px"}
                fontWeight={"700"}
                color={"transparent"}
                key={tORndex}
              >
                {tORparag}
              </Text>
            ))}
        </Box>
      ))}
      {toNextChapter && (
        <Center>
          <Button
            variant={"unstyled"}
            m={"20px auto"}
            display={"inline-flex"}
            alignItems={"center"}
            justifyContent={"center"}
            cursor={"pointer"}
            backgroundColor={"transparent"}
            color={"#ffffff"}
            border={"#ffffff"}
            _hover={{
              opacity: "1",
              textShadow: "0 0 6px rgba(255, 255, 255, 1)",
            }}
            onClick={handlerClick}
          >
            <Text display={"inline-block"} fontSize={"40px"}>
              Next Chapter...
            </Text>
          </Button>
        </Center>
      )}
    </Box>
  );
};

export default SixthChapter;
