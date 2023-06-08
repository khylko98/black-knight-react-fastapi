import axios from "axios";

const getAuthConfig = () => ({
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export const getPrologue = async () => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/prologue`,
      getAuthConfig()
    );
  } catch (error) {
    throw error;
  }
};

export const getChapter = async (chapter, part) => {
  try {
    return await axios.get(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/v1/chapters?chapter=${chapter}&part=${part}`,
      getAuthConfig()
    );
  } catch (error) {
    throw error;
  }
};

export const getEpilogue = async () => {
  try {
    return await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/epilogue`,
      getAuthConfig()
    );
  } catch (error) {
    throw error;
  }
};
