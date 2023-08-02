import { useCallback } from "react";
import { useQuery } from "react-query";
import { getJWTClaims } from "../common/api";
import { deleteCookie, getCookie } from "../common/utils";

export const JWT_COOKIE = "accessToken";

const useAuth = () => {
  const cookie = getCookie(JWT_COOKIE);

  const {
    isLoading,
    error,
    data: auth,
  } = useQuery("auth", () => {
    getJWTClaims(cookie!);
  });

  const logout = useCallback(() => {
    deleteCookie(JWT_COOKIE);
    window.location.reload(); // 새로고침
  }, []);

  return { isLoading, error, auth, logout };
};
// useAuth 사용 예제

const { isLoading: authIsLoading, error: authError, auth, logout } = useAuth();

export default useAuth;
