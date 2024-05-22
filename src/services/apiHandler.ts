/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import Cache from "../utils/cache";
const hostURL = `${process.env.NEXT_PUBLIC_BASE_URL}`;

async function handleRequest(req: AxiosRequestConfig & AxiosResponse) {
  const currentuser = getCurrentSession();
  const access_token = currentuser?.access_token;

  req.headers.Accept = "application/json";
  req.headers["Content-Type"] =
    req.headers["Content-Type"] = "application/json";
  req.headers.language = "en";
  // req.headers.Token = "6e5c1f64-c066-4e20-9ed3-7b14ea6dd019";
  req.headers.Host = "qt.organogram.app";
  if (access_token) {
    req.headers.Authorization = access_token;
    req.headers.Token = access_token;
  }

  return req;
}

type SessionReturnType = null | {
  access_token?: string;
};

export const getCurrentSession = (): SessionReturnType => {
  const access_token = Cache.get("token");

  if (!access_token) {
    return null;
  }

  return {
    access_token,
  };
};

const onRequest = (config: any): any => {
  return handleRequest(config);
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: any): any => {
  return handleRequest(response);
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  if (error?.response?.status == 401 || error?.response?.status == 403) {
    try {
      if (typeof window !== "undefined") {
        // Cache.removeCookie("token");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    } catch (e) {
      return Promise.reject(error);
    }
  } else if (error?.response?.status == 500) {
    return Promise.reject(error);
  } else {
    return Promise.reject(error);
  }
};

axios.interceptors.request.use(onRequest, onRequestError);
axios.interceptors.response.use(onResponse, onResponseError);

type Handler = {
  post: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>;
  put: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>;
  patch: (
    url: string,
    data?: any,
    options?: AxiosRequestConfig,
  ) => Promise<AxiosResponse>;
  delete: (url: string, options?: AxiosRequestConfig) => Promise<AxiosResponse>;
  get: (url: string, options?: AxiosRequestConfig) => Promise<AxiosResponse>;
};

const ApiHandler: Handler = {
  post: async (url, data, options) =>
    axios.post(`${hostURL}${url}`, data, options ? options : {}),

  put: async (url, data, options) =>
    axios.put(`${hostURL}${url}`, data, options ? options : {}),

  patch: async (url, data, options) =>
    axios.patch(`${hostURL}${url}`, data, options ? options : {}),

  delete: async (url, options) =>
    axios.delete(`${hostURL}${url}`, options ? options : {}),

  get: async (url, options) =>
    axios.get(`${hostURL}${url}`, options ? options : {}),
};

export default ApiHandler;

