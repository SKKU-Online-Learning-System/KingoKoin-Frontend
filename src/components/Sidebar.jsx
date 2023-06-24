import { FaTh, FaBars } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const menuItem = [
    {
      path: "/page1",
      name: "smallbutton",
      icon: <FaTh />,
    },
    {
      path: "/dashboard",
      name: "대시보드",
      icon: <FaTh />,
    },
    {
      path: "/page3",
      name: "smallbutton",
      icon: <FaTh />,
    },
  ];

  return (
    <div className="flex h-screen bg-[#2b6653]">
      <div className="w-[200px]">
        <div className="top_section">
          <span
            className="pt-[32px] text-[28px] pb-8 text-4xl text-white pl-[67px] font-gugi"
            style={{ whiteSpace: "nowrap" }}
          >
            킹고코인
          </span>
        </div>
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className="link mb-[16px] flex items-center h-[53px]"
            activeClassName="active"
          >
            <div className="icon ml-[19px]">{item.icon}</div>
            <div className="text-2xl link_text font-noto-sans-kr font-regular pl-[7px] text-[20px] ">
              {item.name}
            </div>
          </NavLink>
        ))}
      </div>
      <main className="bg-[#f2f2f2]  rounded-tl-xl flex-grow p-3">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
