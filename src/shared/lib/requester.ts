import axios from "axios";
import type { AxiosInstance } from "axios";
import { BASE_URL } from "shared/consts/consts";

const createApi = (): AxiosInstance => axios.create({ baseURL: BASE_URL });

const $mainApi: AxiosInstance = createApi();

$mainApi.interceptors.request.use((config) => {
  return config;
});

export { $mainApi };
