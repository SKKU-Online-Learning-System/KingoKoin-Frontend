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
  // const matchLogin = useMatch("/login");
  // if (matchLogin) getDevToken();

  // 권한에 따라 리다이렉션
  const matchAdmin = useMatch("/admin/*");

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
          navigate("/dashboard");
          break;
        case USER_ROLE.ADMIN:
          break;
        default:
          navigate("/");
      }
    },
    [navigate]
  );

  if (!loginIsLoading && !login) navigate("/");

  if (!loginIsLoading && login && matchAdmin) checkAdmin(login.role);

  const render = !loginIsLoading && !loginError && login;

  return (
    <>
      <Header login={login || undefined} />
      <div className="flex pt-16 bg-primary">
        <Sidebar login={login || undefined} />
        <main className="flex items-center justify-center flex-grow py-16 rounded-tl-lg bg-surface">
          <div className="flex flex-col gap-6 w-[1152px] min-h-screen">
            <Status
              isLoading={loginIsLoading}
              error={loginError}
              isData={login ? true : false}
              className="w-screen h-full max-w-full"
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
