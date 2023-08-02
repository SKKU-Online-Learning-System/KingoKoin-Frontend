import { useMatch } from "react-router-dom";
import SKKU_LOGO from "../../assets/main_logo_eng.png";
import { Logout } from "@mui/icons-material";

function Header() {
  // TODO: 로그인 상태 확인 및 정보를 state로 전달받아 표시
  // TODO: null 값일 경우 로그인을 표시한다.
  // TODO: main 화면일 경우 보여주지 않는다.
  const match = useMatch("main");

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
        {!match && (
          <>
            <span>소프트웨어학과</span>
            <span>|</span>
            <span>율전이</span>
            <span>|</span>
            <Logout className="w-6 h-6" />
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
