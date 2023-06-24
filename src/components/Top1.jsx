import React from "react";
import logo from "../assets/main_logo_eng.png";

function Top1(props) {
  return (
    <div className="flex justify-between items-center bg-white h-[139.49px]">
      <div className="flex items-center">
        <img
          src={logo}
          alt="SKKU logo"
          className="h-10 pl-[64px] pr-[16px] pb-1"
        />
        <div className="w-0.5  bg-[#DDDDDD] h-10 "></div>
        <span
          className="pl-[16px] text-[28px] text-[#1b1b1b] font-gugi"
          style={{ whiteSpace: "nowrap" }}
        >
          킹고코인
        </span>
      </div>
      <div className="pr-[62.02px] text-[20px] text-right link_text font-noto-sans-kr font-regular">
        소프트웨어학과&nbsp;&nbsp; |&nbsp;&nbsp; 율전이&nbsp;&nbsp;
        |&nbsp;&nbsp; O
      </div>
    </div>
  );
}

export default Top1;
