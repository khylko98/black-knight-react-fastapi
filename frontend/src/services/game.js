import axios from "axios";

// TODO: Make .env and put this url to it
const URL = "http://localhost:8080";

const getAuthConfig = () => ({
  headers: {
    Authorisation: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const getPrologue = async () => {
  return await axios.get(`${URL}/api/v1/prologue`, getAuthConfig);
};

export const getChapter = async (chapter, part) => {
  return await axios.get(
    `${URL}/api/v1/chapters?chapter=${chapter}&part=${part}`,
    getAuthConfig
  );
};

export const getEpilogue = async () => {
  return await axios.get(`${URL}/api/v1/epilogue`, getAuthConfig);
};
