import {
  DashboardOutlined,
  PersonOutlineOutlined,
  MonetizationOnOutlined,
  ShowChartOutlined,
  PolicyOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  // 권한에 따라 보여줄 메뉴 수정

  const menuItem = [
    {
      path: "/main/dashboard",
      name: "대시보드",
      icon: <DashboardOutlined />,
    },
    {
      path: "/main/admin/users",
      name: "사용자 관리",
      icon: <PersonOutlineOutlined />,
    },
    {
      path: "/main/admin/coin",
      name: "코인 부여",
      icon: <MonetizationOnOutlined />,
    },
    {
      path: "/main/admin/analysis",
      name: "코인 분석",
      icon: <ShowChartOutlined />,
    },
    {
      path: "/main/admin/policies",
      name: "정책 관리",
      icon: <PolicyOutlined />,
    },
  ];

  return (
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
            className={({ isActive, isPending }) =>
              isPending
                ? "flex gap-1 p-4 w-full items-center rounded-l-lg bg-onPrimary text-primary transition-all"
                : isActive
                ? "flex gap-1 p-4 w-full items-center rounded-l-lg bg-onPrimary text-primary transition-all"
                : "flex gap-1 p-4 w-full items-center rounded-l-lg text-onPrimary hover:bg-onPrimary hover:text-primary transition-all"
            }
          >
            <div className="icon">{item.icon}</div>
            <div className="text-label-l">{item.name}</div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
