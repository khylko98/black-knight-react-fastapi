import { useState, useEffect } from "react";
import { getPrologue } from "../../../services/game";
import { errorNotification } from "../../../services/error";
import { Center, Spinner, Box, Container, Text } from "@chakra-ui/react";
import { useGameContext } from "../../context/GameContext";

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

  const fetchData = () => {
    setLoading(true);
    getPrologue()
      .then((res) => {
        const { mainText } = res.data;
        setData((prev) => [...prev, mainText]);
      })
      .catch((err) => {
        setError(err.response.data.detail);
        errorNotification(err.response.data.detail);
      })
      .finally(setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    getLoading();
  }

  if (error) {
    getError();
  }

  return (
    <Box
      sx={{
        margin: "auto 17%",
        position: "absolute",
        color: "rgb(255, 255, 255)",
        backgroundImage:
          "linear-gradient(" +
          "transparent 0%," +
          "currentColor 10%," +
          "currentColor 95%," +
          "transparent 100%)",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundAttachment: "fixed",
      }}
    >
      {data.map((text, index) => (
        <Box key={index}>
          {text.map((textp, index) => (
            <Text key={index}>{textp}</Text>
          ))}
        </Box>
      ))}
    </Box>
  );
};

export default Prologue;
