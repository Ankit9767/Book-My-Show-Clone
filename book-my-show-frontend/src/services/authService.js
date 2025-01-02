import axios from "axios";

const API_URL = "http://localhost:8080/api/";

const register = (registerData) => {
  return axios.post(API_URL + "register", registerData);
};

const login = (loginData) => {
  return axios.post(API_URL + "login", loginData);
};

export default {
  register,
  login,
};
