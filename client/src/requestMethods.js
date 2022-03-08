import axios from "axios";

// const BASE_URL = "http://localhost:5000/api/";
const BASE_URL = "https://ecommerce-mern-2022.herokuapp.com/api/";

const get_token = () => {
  if (JSON.parse(localStorage.getItem("persist:root"))) {
    if (
      JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
        .currentUser
    ) {
      return JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user)
        .currentUser.accessToken;
    } else {
      return "";
    }
  } else {
    return "";
  }
};

const TOKEN = get_token();
console.log("TOKEN: ", TOKEN);

// const TOKEN =
//   JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser
//     .accessToken || "";

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const userRequest = axios.create({
  baseURL: BASE_URL,
});

userRequest.interceptors.request.use(
  async (config) => {
    const TOKEN = await get_token();
    if (TOKEN) config.headers = { token: `Bearer ${TOKEN}` };
    return config;
  },
  (error) => {
    console.log("error en interceptor");
    return Promise.reject(error);
  }
);
