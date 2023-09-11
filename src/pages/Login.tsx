import { useNavigate, useSearchParams, useMatch } from "react-router-dom";
import { getDevToken } from "./../common/api";

import {
  JWT_COOKIE,
  USER_ROLE,
  check,
  setAccessCookie,
  setRefreshCookie,
} from "../common/apiManager";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";

const Login = () => {
  const matchLogin = useMatch("/login");
  if (matchLogin) {
    getDevToken();
    console.log("11");
  }
  console.log("22");

  useEffect(() => {
    navigate("/dashboard"); // Or any other route
  }, []);

  const [tokensSet, setTokensSet] = useState(false);
  /* Auth */
  // 토큰을 전달받았을 경우 파싱
  const [searchParams] = useSearchParams();
  const accessTokenParam = searchParams.get(JWT_COOKIE.ACCESS_TOKEN);
  const refreshTokenParam = searchParams.get(JWT_COOKIE.REFRESH_TOKEN);

  // if (accessTokenParam) setAccessCookie(accessTokenParam);
  // if (refreshTokenParam) setRefreshCookie(refreshTokenParam);

  useEffect(() => {
    if (accessTokenParam) {
      setAccessCookie(accessTokenParam);
    }
    if (refreshTokenParam) {
      setRefreshCookie(refreshTokenParam);
    }
    if (accessTokenParam && refreshTokenParam) {
      setTokensSet(true);
    }
  }, [accessTokenParam, refreshTokenParam, setAccessCookie, setRefreshCookie]);

  // 권한에 따라 리다이렉션
  const {
    isLoading: loginIsLoading,
    error: loginError,
    data: login,
  } = useQuery("login", check);

  const navigate = useNavigate();

  // const redirectionByRole = (role: USER_ROLE) => {
  //   switch (role) {
  //     case USER_ROLE.ADMIN:
  //       navigate("/admin/users");
  //       break;
  //     case USER_ROLE.USER:
  //       navigate("/dashboard");
  //       break;
  //     default:
  //       navigate("/");
  //   }
  // };

  // if (!loginIsLoading && login) redirectionByRole(login.role);

  useEffect(() => {
    const redirectionByRole = (role: USER_ROLE) => {
      switch (role) {
        case USER_ROLE.ADMIN:
          navigate("/admin/users");
          break;
        case USER_ROLE.USER:
          navigate("/dashboard");
          break;
        default:
          navigate("/");
      }
    };
    if (tokensSet && !loginIsLoading && login) {
      redirectionByRole(login.role);
    }
  }, [tokensSet, loginIsLoading, login]);

  return <div>login</div>;
};

export default Login;
