import axios from "axios";

const axiosBack = axios.create({
  // baseURL: "https://test.usenft.io:3002/",
  baseURL: "https://tminter.donative.in:3005/",
  // process.env.NODE_ENV === 'development'
  //   ? process.env.REACT_APP_END_POINT_URL_DEV
  //   : process.env.REACT_APP_END_POINT_URL_PROD,
  headers: {
    "Content-Type": "application/json",
  },
});
export default axiosBack;
