import { useQuery } from "react-query";
import { isLogin } from "../common/apiManager";

const useLogin = () => {
  const { isLoading, error, data } = useQuery("auth", isLogin);
  return { isLoading, error, data };
};
// useLogin 사용 예제
// const {
//   isLoading: loginIsLoading,
//   error: loginError,
//   data: login,
// } = useLogin();

export default useLogin;
