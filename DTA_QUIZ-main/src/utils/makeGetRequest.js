import { appAxios } from "src/api/AppAxios";
const makeGetRequest = async (endpoint, body) => {
  const { data } = await appAxios.get(endpoint, body);
  return data;
};

export default makeGetRequest;
