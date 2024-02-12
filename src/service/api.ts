import axios from "axios";

const BASE_URL = "http://localhost:8080/api/";

export const authApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authApi.defaults.headers.common["Content-Type"] = "application/json";

type User = {
  email: string;
  password?: string;
};

export const signUpUser = async (user: User) => {
  const response = await axios.post(BASE_URL + "account", {
    ...user,
    championshipId: 1,
  });
  return response.data;
};

export const getUserByEmail = async (email: string) => {
  const response = await authApi.get(`/email/${email}`);
  return response.data;
};

export const getUsers = async () => {
  const response = await authApi.get("account");
  return response.data;
};

export const addChamp = async (champ) => {
  const response = await authApi.post("championship", champ);
  return response.data;
};
