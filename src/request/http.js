/**
 * @ Author: zhenghui
 * @ Create Time: 2020-08-28 19:22:23
 * @ Modified by: zhenghui
 * @ Modified time: 2021-08-25 14:17:36
 * @ Description: 请求拦截、相应拦截、错误统一处理
 */

import axios from "axios";

// 环境
axios.defaults.baseURL = "https://api.nft.storage";

// 请求超时时间
axios.defaults.timeout = 20000;

// 请求拦截器
axios.interceptors.request.use(
  async (config) => {
    // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加了
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweEYwMjk2QzA5NTdiY2QzMUVGNWJDZkY1ODIxNkUwYzYzNjJFN2RiNTkiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYyOTM0NTIzODgwNSwibmFtZSI6InppbmV0ZSJ9.nHM50vl4vdc9x1_tVU1zJpKfUueloLD9sSciojU4dXs";
    token && (config.headers.Authorization = `Bearer ${token}`);

    return config;
  },
  (error) => {
    return Promise.error(error);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    // eslint-disable-next-line no-constant-condition
    if ((response.status === 200 && response.status !== 401) || 403) {
      return Promise.resolve(response);
    }
  },
  // 服务器状态码不是200的情况

  (error) => {
    if (error.response && error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        // 未登录则跳转登录页面，并携带当前页面的路径
        // 在登录成功后返回当前页面，这一步需要在登录页操作。
        case 401:
          break;
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          // UserComponent.getTodu("登录过期", 1, "info");
          break;
        // 其他错误，直接抛出错误提示
        default:
      }
      return Promise.reject(error.response);
    }
  }
);

const Axios = {
  get: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .get(url, {
          params,
        })
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  post: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .post(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
  put: (url, params) => {
    return new Promise((resolve, reject) => {
      axios
        .put(url, JSON.stringify(params))
        .then((res) => {
          resolve(res.data);
        })
        .catch((err) => {
          reject(err.data);
        });
    });
  },
};

export { Axios };
