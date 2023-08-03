import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { USER_ROLE, check } from "../../common/apiManager";
import Status from "../feedback/Status";
import { useCallback } from "react";
import { useQuery } from "react-query";
import { getDevToken } from "../../common/api";

const Frame = () => {
  /* Auth */
  // TODO: 개발용 토큰 발급 코드 삭제
  const matchLogin = useMatch("/main/login");
  if (matchLogin) getDevToken();

  // 권한에 따라 리다이렉션
  const matchAdmin = useMatch("/main/admin/*");

  const {
    isLoading: loginIsLoading,
    error: loginError,
    data: login,
  } = useQuery("login", check);

  const navigate = useNavigate();

  const checkAdmin = useCallback(
    (role: USER_ROLE) => {
      switch (role) {
        case USER_ROLE.USER:
          navigate("/main/dashboard");
          break;
        case USER_ROLE.ADMIN:
          break;
        default:
          navigate("/main");
      }
    },
    [navigate]
  );

  if (!loginIsLoading && !login) navigate("/main");

  if (!loginIsLoading && login && matchAdmin) checkAdmin(login.role);

  const render = !loginIsLoading && !loginError && login;

  return (
    <>
      <Header login={login || undefined} />
      <div className="flex bg-primary pt-16">
        <Sidebar login={login || undefined} />
        <main className="flex items-center py-16 justify-center bg-surface rounded-tl-lg flex-grow">
          <div className="flex flex-col gap-6 w-[1152px] min-h-screen">
            <Status
              isLoading={loginIsLoading}
              error={loginError}
              isData={login ? true : false}
              className="w-screen max-w-full h-full"
            />
            {render && <Outlet />}
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Frame;
