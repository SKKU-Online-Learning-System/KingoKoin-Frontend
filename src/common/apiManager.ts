import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";
import { deleteCookie, getCookie, setCookie } from "./utils";
import { getJWTClaims, refreshAccessToken } from "./api";
import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";
import { useCookies } from "react-cookie";

/** 직접 입력에 해당하는 plId */
export const PL_ID_MANUAL = "2";

export const PROD_HOST = "https://kingocoin.cs.skku.edu";

export enum POLICY_REQUEST_TYPE {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  DEACTIVATE = "DEACTIVATE",
  ACTIVATE = "ACTIVATE",
  DELETE = "DELETE",

  // READ = "READ",
  EMPTY = "EMPTY",
}

export enum POLICY_TYPE {
  ACTIVE = "활성",
  INACTIVE = "비활성",
}

export enum USER_ROLE {
  USER = "ROLE_STUDENT",
  ADMIN = "ROLE_ADMIN",
}

export enum JWT_COOKIE {
  ACCESS_TOKEN = "accessToken",
  REFRESH_TOKEN = "refreshToken",
}

/* Data */

dayjs.locale("ko");
export const stampToDayjs = (stamp: string) => dayjs(stamp);

export const dayjsToFormat = (dayjs: Dayjs) => dayjs.format("YYYY.MM.DD (ddd)");

export const dayjsToStamp = (dayjs: Dayjs) =>
  dayjs.format("YYYY-MM-DDTHH:mm:ss");

export const validateStid = (stId: string) => {
  if (stId.length !== 10) return false;
  const year = parseInt(stId.slice(0, 4));
  if (year < 2000 || year > dayjs().year()) return false;
  const dept = parseInt(stId.slice(4, 6));
  if (dept !== 31 && dept !== 71 && dept !== 72 && dept !== 73) return false;
  return true;
};

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

/* 입력폼을 postManualCoin api 변수 형식으로 변환 */
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

/* 입력폼을 postPolicyRequest api 변수 형식으로 변환 */
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

/* Auth */

export const setAccessCookie = (token: string) => {
  setCookie(JWT_COOKIE.ACCESS_TOKEN, token, {
    "max-age": 60 * 60, // access token 만료 기한 (1시간)
    path: "/",
    secure: true,
    samesite: "strict",
  });
};

export const setRefreshCookie = (token: string) => {
  setCookie(JWT_COOKIE.REFRESH_TOKEN, token, {
    "max-age": 60 * 60 * 24 * 14, // refresh token 만료 기한 (2주)
    path: "/",
    secure: true,
    samesite: "strict",
  });
};

export const getAccessCookie = () => getCookie(JWT_COOKIE.ACCESS_TOKEN);

export const getRefreshCookie = () => getCookie(JWT_COOKIE.REFRESH_TOKEN);

/** 로그인 여부 확인 */
export const check = async () => {
  // accessToken 확인
  const accessToken = getAccessCookie();
  if (!accessToken) return null;
  console.log(100);
  let auth = await getJWTClaims(accessToken);

  if (auth) return auth;

  // refreshToken 확인
  const refreshToken = getRefreshCookie();
  if (!refreshToken) return null;
  const newAccessToken = await refreshAccessToken(refreshToken);
  if (!newAccessToken) return null;

  setAccessCookie(newAccessToken);
  refreshClientToken();

  auth = await getJWTClaims(accessToken);
  console.log("auth: ", auth);
  return auth;
};

export const logout = () => {
  deleteCookie(JWT_COOKIE.ACCESS_TOKEN);
  deleteCookie(JWT_COOKIE.REFRESH_TOKEN);
  window.location.replace(PROD_HOST + "/api/logout");
};

/* axios settings */

const HOST = 'https://kingocoin.cs.skku.edu/';

const axiosRequestSuccess = (config: InternalAxiosRequestConfig) => {
  console.log(config);
  return config;
};

const axiosRequestError = (error: AxiosError) => {
  if (error.request) {
    console.log("Client Error:", error.request.data);
  }
  return Promise.reject(error);
};

const axiosResponesSuccess = (response: AxiosResponse) => {
  console.log(response);
  return response;
};

const axiosResponesError = async (error: AxiosError) => {
  if (error.response) {
    console.log("Server Error:", error.response.data);
  } else if (error.request) {
    console.log("No response received:", error.request);
  } else {
    console.log("Error:", error.message);
  }

  check()
    .then((auth) => {
      if (!auth) window.location.href = "/login";
    })
    .catch((reason) => Promise.reject(reason));

  return Promise.reject(error);
};

/** JWT 없이 요청할 때 사용하는 axios client */
export const client = axios.create({
  withCredentials: true,
  baseURL: HOST,
});

axios.interceptors.request.use(axiosRequestSuccess, axiosRequestError);
axios.interceptors.response.use(axiosResponesSuccess, axiosResponesError);

/** JWT를 첨부하여 요청할 때 사용하는 axios client */
export const clientWithToken = axios.create({
  baseURL: HOST,
  withCredentials: true,
  headers: { Authorization: `bearer ${getAccessCookie()}` },
});

clientWithToken.interceptors.request.use(
  axiosRequestSuccess,
  axiosRequestError
);

clientWithToken.interceptors.response.use(
  axiosResponesSuccess,
  axiosResponesError
);

export const refreshClientToken = () => {
  clientWithToken.defaults.headers.common[
    "Authorization"
  ] = `bearer ${getAccessCookie()}`;
};
