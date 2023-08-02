import Header from "./Header";
import Footer from "./Footer";
import { Outlet, useMatch, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import useLogin from "../../hooks/useLogin";
import { USER_ROLE } from "../../common/apiManager";
import Loader from "../feedback/Loader";
import Status from "../feedback/Status";

interface FrameProps {
  children?: React.ReactNode;
}

const Frame = ({ children }: FrameProps) => {
  /* Auth */

  // 권한에 따라 리다이렉션
  const matchAdmin = useMatch("/main/admin/*");

  const {
    isLoading: loginIsLoading,
    error: loginError,
    data: login,
  } = useLogin();

  const navigate = useNavigate();

  const checkAdmin = (role: USER_ROLE) => {
    switch (role) {
      case USER_ROLE.USER:
        navigate("/main/dashboard");
        break;
      case USER_ROLE.ADMIN:
        break;
      default:
        navigate("/main");
    }
  };

  if (!loginIsLoading && !login) navigate("/main");
  if (!loginIsLoading && login && matchAdmin) checkAdmin(login.role);

  const render = !loginIsLoading && !loginError && login;

  return (
    <>
      <Header />
      <div className="flex bg-primary pt-16">
        <Sidebar />
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
      {children}
      <Footer />
    </>
  );
};

export default Frame;
