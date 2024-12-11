import axios from "axios";
import { useLoginUserStore } from "@/store/userStore";

// 10.161.119.50
const myAxios = axios.create({
  baseURL: "http://127.0.0.1:8080",
  timeout: 60000,
  withCredentials: false,
});

// 全局请求拦截器
myAxios.interceptors.request.use(
  function (config) {
    // 跳过ngrok的浏览器警告
    config.headers["ngrok-skip-browser-warning"] = true;
    const userStore = useLoginUserStore();
    if (userStore.token) {
      config.headers.token = userStore.token;
    }
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 全局响应拦截器
myAxios.interceptors.response.use(
  function (response) {
    console.log(response);
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    const { data } = response;

    // 未登录
    if (data.code === 40100) {
      // 不是获取用户信息的请求，并且用户目前不是已经在用户登录页面，则跳转到登录页面
      // if (
      //   !response.request.responseURL.includes("user/get/login") &&
      //   !window.location.pathname.includes("/user/login")
      // ) {
      //   Message.warning("请先登录");
      //   window.location.href = `/user/login?redirect=${window.location.href}`;
      // }
    }

    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
  }
);

export default myAxios;
