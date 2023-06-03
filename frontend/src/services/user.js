import axios from "axios";

// TODO: Make .env and put this url to it
const URL = "http://localhost:8080";

export const registration = async (usernameAndPassword) => {
  return await axios.post(`${URL}/api/v1/registration`, usernameAndPassword);
};

export const login = async (usernameAndPassword) => {
  return await axios.post(`${URL}/api/v1/login`, usernameAndPassword);
};
