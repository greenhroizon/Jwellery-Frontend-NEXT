import axios from "axios";
import { API } from "./dashboardService";


export const getAboutUsApi = async () => {
  const res = await axios.get(`${API}/api/v1/user/about-us`);
  return res.data;
};