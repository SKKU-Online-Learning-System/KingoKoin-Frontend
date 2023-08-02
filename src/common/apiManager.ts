import { Dayjs } from "dayjs";
import { dayjsToStamp, deleteCookie, getCookie, setCookie } from "./utils";
import { PLATFORMS, getJWTClaims, refreshAccessToken } from "./api";
import axios, { AxiosError, AxiosResponse } from "axios";

// TODO: PL_ID_MANUAL -> PL_CODE_MANUAL
export const PL_ID_MANUAL = "2";

export const PROD_HOST = "https://kingocoin.cs.skku.edu/";

export enum POLICY_REQUEST_TYPE {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  READ = "READ",
  DEACTIVATE = "DEACTIVATE",
  ACTIVATE = "ACTIVATE",
  DELETE = "DELETE",
  EMPTY = "EMPTY",
}

export enum POLICY_TYPE {
  ACTIVE = "활성",
  INACTIVE = "비활성",
}

export enum USER_ROLE {
  USER = "ROLE_USER",
  ADMIN = "ROLE_ADMIN",
}

export enum JWT_COOKIE {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

export interface IGrantedCoinForm {
  stId: string;
  stName: string;
  plId: string;
  pfName: string;
  title: string;
  point: number;
  adId: number;
  gainedDate: Dayjs;
}

export const formToGrantedCoin = ({
  stId,
  stName,
  plId,
  title,
  point,
  adId,
  gainedDate,
}: IGrantedCoinForm) => {
  const result = {
    stId: parseInt(stId),
    stName,
    plId: parseInt(plId),
    title,
    plus: point >= 0,
    point,
    adId,
    gainedDate: dayjsToStamp(gainedDate),
  };
  return result;
};

export interface IPolicyRequestForm {
  plId: string;
  pfId: number;
  pfName: string;
  rqName: string;
  rqPlus: boolean;
  rqPoint: number;
  rqAvailable: boolean;
  rqReason: string;
  rqType: POLICY_REQUEST_TYPE;
}

export const formToPolicyRequest = ({
  plId,
  pfId,
  pfName,
  rqName,
  rqPlus,
  rqPoint,
  rqReason,
  rqType,
}: IPolicyRequestForm) => {
  const result = {
    plId: parseInt(plId),
    pfId: pfId,
    rqName,
    rqPlus,
    rqPoint,
    rqReason,
    rqType,
  };
  return result;
};

export const getPlatformByPfId = (pfId: number) =>
  PLATFORMS.find((it) => it.pfId === pfId);

export const getPlatformByPfName = (pfName: string) =>
  PLATFORMS.find((it) => it.pfName === pfName);

const handleAxiosSuccess = (response: AxiosResponse) => {
  return response;
};

const handleAxiosError = async (error: AxiosError) => {
  if (error.response) {
    console.log("Server Error:", error.response.data);
  } else if (error.request) {
    console.log("No response received:", error.request);
  } else {
    console.log("Error:", error.message);
  }
  // 토큰 재발급
  const refreshToken = getCookie(JWT_COOKIE.REFRESH_TOKEN);
  if (!refreshToken) return Promise.reject(error);

  const newAccessToken = await refreshAccessToken(refreshToken);
  setAccessCookie(newAccessToken);
  refreshClientToken();

  return Promise.reject(error);
};

/* axios */

const HOST = "https://kingocoin.cs.skku.edu";

export const client = axios.create({
  baseURL: HOST,
});

axios.interceptors.response.use(handleAxiosSuccess, handleAxiosError);

export const clientWithToken = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: { Authorization: `bearer ${getCookie(JWT_COOKIE.ACCESS_TOKEN)}` },
});

clientWithToken.interceptors.response.use(handleAxiosSuccess, handleAxiosError);

export const refreshClientToken = () => {
  clientWithToken.defaults.headers.common[
    "Authorization"
  ] = `bearer ${getCookie(JWT_COOKIE.ACCESS_TOKEN)}`;
};

export const logout = () => {
  deleteCookie(JWT_COOKIE.ACCESS_TOKEN);
  deleteCookie(JWT_COOKIE.REFRESH_TOKEN);
  window.location.replace(PROD_HOST + "logout");
};

export const check = async () => {
  const accessToken = getCookie(JWT_COOKIE.ACCESS_TOKEN);
  if (!accessToken) return undefined;

  let auth = await getJWTClaims(accessToken);
  if (auth) return auth;

  const refreshToken = getCookie(JWT_COOKIE.REFRESH_TOKEN);
  if (!refreshToken) return undefined;

  const newAccessToken = await refreshAccessToken(refreshToken);
  if (!newAccessToken) return undefined;

  setAccessCookie(newAccessToken);
  refreshClientToken();

  auth = await getJWTClaims(accessToken);
  return auth;
};

export const setAccessCookie = (token: string) => {
  setCookie(JWT_COOKIE.ACCESS_TOKEN, token, {
    "max-age": 60 * 60,
    path: "/main",
    secure: true,
    samesite: "strict",
  });
};

export const setRefreshCookie = (token: string) => {
  setCookie(JWT_COOKIE.REFRESH_TOKEN, token, {
    "max-age": 60 * 60 * 24 * 14,
    path: "/main",
    secure: true,
    samesite: "strict",
  });
};
