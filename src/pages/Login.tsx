import { useNavigate, useSearchParams } from "react-router-dom";
import {
  JWT_COOKIE,
  USER_ROLE,
  check,
  setAccessCookie,
  setRefreshCookie,
} from "../common/apiManager";
import { useQuery } from "react-query";

const Login = () => {
  /* Auth */
  // 토큰을 전달받았을 경우 파싱
  const [searchParams] = useSearchParams();
  const accessTokenParam = searchParams.get(JWT_COOKIE.ACCESS_TOKEN);
  const refreshTokenParam = searchParams.get(JWT_COOKIE.REFRESH_TOKEN);

  if (accessTokenParam) setAccessCookie(accessTokenParam);
  if (refreshTokenParam) setRefreshCookie(refreshTokenParam);

  // 권한에 따라 리다이렉션
  const {
    isLoading: loginIsLoading,
    error: loginError,
    data: login,
  } = useQuery("login", check);

  const navigate = useNavigate();

  const redirectionByRole = (role: USER_ROLE) => {
    switch (role) {
      case USER_ROLE.ADMIN:
        navigate("/main/admin/users");
        break;
      case USER_ROLE.USER:
        navigate("/main/dashboard");
        break;
      default:
        navigate("/main");
    }
  };

  if (!loginIsLoading && login) redirectionByRole(login.role);

  return <div>login</div>;
};

export default Login;
