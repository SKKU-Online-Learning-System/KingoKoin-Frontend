import SKKU_LOGO from "../assets/main_logo_eng.png";
import { Logout } from "@mui/icons-material";

function Header() {
  return (
    // 로그인시, 로그아웃시 표현할 정보

    <div className="flex justify-between items-center bg-background px-16 py-8">
      <div className="flex items-center gap-4">
        <img src={SKKU_LOGO} alt="SKKU logo" className="h-12" />
        <span className=" text-lightGray text-logo">|</span>
        <span className="text-logo" style={{ whiteSpace: "nowrap" }}>
          킹고코인
        </span>
      </div>
      <div className="flex p-1 gap-4 text-label-l text-right font-light items-center text-onSurface">
        <span>소프트웨어학과</span>
        <span>|</span>
        <span>율전이</span>
        <span>|</span>
        <Logout className="w-6 h-6" />
      </div>
    </div>
  );
}

export default Header;
