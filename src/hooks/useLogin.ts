import { useCallback } from "react";
import { useQuery } from "react-query";
import { getJWTClaims } from "../common/api";
import { deleteCookie, getCookie } from "../common/utils";

const JWT_COOKIE = "accessToken";

const useLogin = () => {
  const cookie = getCookie(JWT_COOKIE);

  const {
    isLoading,
    error,
    data: login,
  } = useQuery("auth", () => {
    getJWTClaims(cookie!);
  });

  const logout = useCallback(() => {
    deleteCookie(JWT_COOKIE);
    window.location.reload(); // 새로고침
  }, []);

  return { isLoading, error, login, logout };
};

export default useLogin;
