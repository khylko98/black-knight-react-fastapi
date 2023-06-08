import axios from "axios";

export const registration = async (usernameAndPassword) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/registration`,
      usernameAndPassword
    );
  } catch (error) {
    throw error;
  }
};

export const login = async (usernameAndPassword) => {
  try {
    return await axios.post(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/login`,
      usernameAndPassword
    );
  } catch (error) {
    throw error;
  }
};
