import Axios from "axios";

export const axiosAnstance = Axios.create({
  baseURL: 'http://localhost:5001'
});
