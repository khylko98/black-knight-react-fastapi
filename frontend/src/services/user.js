import axios from "axios";

// TODO: Make .env and put this url to it
const URL = "http://localhost:8080";

export const registration = async (usernameAndPassword) => {
  try {
    return await axios.post(`${URL}/api/v1/registration`, usernameAndPassword);
  } catch (error) {
    throw error;
  }
};

export const login = async (usernameAndPassword) => {
  try {
    return await axios.post(`${URL}/api/v1/login`, usernameAndPassword);
  } catch (error) {
    throw error;
  }
};
