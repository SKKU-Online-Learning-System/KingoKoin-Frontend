import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ko";

export function getCookie(name: string) {
  let matches = document.cookie.match(
    new RegExp(
      "(?:^|; )" + name.replace(/([.$?*|{}()[\]\\/+^])/g, "\\$1") + "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export interface ICookieOptions {
  path?: string | undefined;
  domain?: string | undefined;
  expires?: Date | string | undefined;
  "max-age"?: number | undefined;
  secure?: boolean | undefined;
  samesite?: true | false | "lax" | "strict" | "none" | undefined;
  httpOnly?: boolean | undefined;
  priority?: "low" | "medium" | "high" | undefined;
  encode?(value: string): string;
}

export function setCookie(
  name: string,
  value: string,
  options: ICookieOptions
) {
  options = {
    path: "/",
    // 필요한 경우, 옵션 기본값을 설정할 수도 있습니다.
    ...options,
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }

  let updatedCookie =
    encodeURIComponent(name) + "=" + encodeURIComponent(value);

  Object.entries(options).forEach(([optionKey, optionValue]) => {
    updatedCookie += "; " + optionKey;
    if (optionValue !== true) {
      updatedCookie += "=" + optionValue;
    }
  });

  document.cookie = updatedCookie;
}

export function deleteCookie(name: string) {
  setCookie(name, "", {
    "max-age": -1,
  });
}

export function deleteAllCookies() {
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    deleteCookie(name.trim());
  }
  console.log("all cookies deleted !");
}

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
