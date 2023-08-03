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

export const getAccessCookie = () => 
  getCookie(JWT_COOKIE.ACCESS_TOKEN)

export const getRefreshCookie = () =>
  getCookie(JWT_COOKIE.REFRESH_TOKEN)


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
  // 오류 발생시 accessToken, refreshToken 확인
  check().then((auth) =>{
    if (!auth) window.location.href = "/main/login";
  }).catch((reason) => Promise.reject(reason))

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
  headers: { Authorization: `bearer ${getAccessCookie()}` },
});

clientWithToken.interceptors.response.use(handleAxiosSuccess, handleAxiosError);

export const refreshClientToken = () => {
  clientWithToken.defaults.headers.common[
    "Authorization"
  ] = `bearer ${getAccessCookie()}`;
};

export const logout = () => {
  deleteCookie(JWT_COOKIE.ACCESS_TOKEN);
  deleteCookie(JWT_COOKIE.REFRESH_TOKEN);
  window.location.replace(PROD_HOST + "logout");
};

export const check = async () => {
  const accessToken = getAccessCookie();
  if (!accessToken) return null;

  let auth = await getJWTClaims(accessToken);
  if (auth) return auth;

  const refreshToken = getRefreshCookie();
  if (!refreshToken) return null;

  const newAccessToken = await refreshAccessToken(refreshToken);
  if (!newAccessToken) return null;

  setAccessCookie(newAccessToken);
  refreshClientToken();

  auth = await getJWTClaims(accessToken);
  return auth;
};