import { Outlet } from "react-router-dom/dist";
import {
  MdOutlineDashboard,
  MdPerson,
  MdPolicy,
  MdShowChart,
  MdOutlineMonetizationOn,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import Header from "./Header";

const Sidebar = ({ children }) => {
  // 권한에 따라 보여줄 메뉴 수정
  const menuItem = [
    {
      path: "/main/dashboard",
      name: "대시보드",
      icon: <MdOutlineDashboard />,
    },
    {
      path: "/main/admin/users",
      name: "사용자 관리",
      icon: <MdPerson />,
    },
    {
      path: "/main/admin/coin",
      name: "코인 부여",
      icon: <MdOutlineMonetizationOn />,
    },
    {
      path: "/main/admin/analysis",
      name: "코인 분석",
      icon: <MdShowChart />,
    },
    {
      path: "/main/admin/policies",
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
              <div className="text-label-l">{item.name}</div>
            </NavLink>
          ))}
        </div>
      </div>
      <main className="bg-surface rounded-tl-lg flex-grow">{children}</main>
    </div>
  );
};

const Frame = () => {
  return (
    <>
      <Header />
      <div className="bg-primary h-16" />
      <Sidebar>
        <Outlet />
      </Sidebar>
    </>
  );
};

export default Frame;
