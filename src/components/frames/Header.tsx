import { useMatch } from "react-router-dom";
import SKKU_LOGO from "../../assets/main_logo_eng.png";
import { Logout } from "@mui/icons-material";
import { IAuth, IUserDetail, getUserDetail } from "../../common/api";
import { logout } from "../../common/apiManager";
import { useQuery } from "react-query";

interface HeaderProps {
  login?: IAuth;
}

function Header({ login }: HeaderProps) {
  const match = useMatch("main");

  // login 상태가 아닐 경우 빈 객체 반환
  const {
    isLoading: userDetailIsLoading,
    error: userDetailError,
    data: userDetail,
  } = useQuery(["userDetail", login?.userId], () =>
    login
      ? getUserDetail(login.userId)
      : new Promise<IUserDetail>((resolve, reject) =>
          resolve({
            stId: 0,
            stName: "",
            stDegree: "",
            stStatus: "",
            stDept: "",
          })
        )
  );

  return (
    <div className="flex justify-between items-center w-screen max-w-full bg-background px-16 py-8">
      <div className="flex items-center gap-4">
        <img src={SKKU_LOGO} alt="SKKU logo" className="h-8" />
        <span className=" text-lightGray text-logo">|</span>
        <span className="text-logo" style={{ whiteSpace: "nowrap" }}>
          킹고코인
        </span>
      </div>
      <div className="flex items-center gap-4 text-label-l text-onSurface">
        {!match && userDetail && (
          <>
            <span>{userDetail.stName}</span>
            <span>|</span>
            <span>{userDetail.stStatus}</span>
            <span>|</span>
            <Logout className="w-4 h-4 hover:cursor-pointer" onClick={logout} />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
