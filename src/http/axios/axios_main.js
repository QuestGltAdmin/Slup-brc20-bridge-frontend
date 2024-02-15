import axios from "axios";

const axiosMain = axios.create({
  // baseURL: "https://test.usenft.io:3002/",
  baseURL: "https://open-api-testnet.unisat.io/",
  // process.env.NODE_ENV === 'development'
  //   ? process.env.REACT_APP_END_POINT_URL_DEV
  //   : process.env.REACT_APP_END_POINT_URL_PROD,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer 19d81b78d24243a32d20f98055dfe6f784f29eb367ff8cec83fb624712ad8424`,
  },
});
export default axiosMain;
