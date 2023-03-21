import { appAxios } from "src/api/AppAxios";

export const makePostRequest = async (endpoint, body) => {
  const { data } = await appAxios.post(endpoint, body);

  return data;
};
