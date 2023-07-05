import { FaTh } from "react-icons/fa";
import { MdPerson, MdPolicy, MdOutlineMonetizationOn } from "react-icons/md";
import { NavLink } from "react-router-dom";
import React from "react";

const Sidebar = ({ children }) => {
  const menuItem = [
    {
      path: "/dashboard",
      name: "대시보드",
      icon: <FaTh />,
    },
    {
      path: "/users",
      name: "사용자 관리",
      icon: <MdPerson />,
    },
    {
      path: "/koin",
      name: "코인 분석",
      icon: <MdOutlineMonetizationOn />,
    },
    {
      path: "/policy",
      name: "정책 관리",
      icon: <MdPolicy />,
    },
  ];

  return (
    <div className="flex bg-primary">
      <div className="w-[200px] flex flex-col p-8 pr-0 gap-8 text-center">
        <span
          className="text-logo text-onPrimary"
          style={{ whiteSpace: "nowrap" }}
        >
          킹고코인
        </span>
        <div className="flex flex-col gap-4">
          {menuItem.map((item, index) => (
            <NavLink
              to={item.path}
              key={index}
              className="link flex gap-1 p-4 w-full items-center hover:"
            >
              <div className="icon">{item.icon}</div>
              <div className="text-label-l link_text font-noto-sans-kr font-light">
                {item.name}
              </div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className="bg-surface rounded-tl-lg flex-grow">{children}</main>
    </div>
  );
};

export default Sidebar;