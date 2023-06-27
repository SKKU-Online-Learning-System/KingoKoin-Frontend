import React from "react";
import logo from "../assets/main_logo_eng.png";
import { AiOutlineLogout } from "react-icons/ai";

function Top1() {
  return (
    <div className="flex justify-between items-center bg-background px-16 py-8">
      <div className="flex items-center gap-4">
        <img src={logo} alt="SKKU logo" className="h-12" />
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
        <AiOutlineLogout className="w-6 h-6" />
      </div>
    </div>
  );
}

export default Top1;
