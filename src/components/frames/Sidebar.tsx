import {
  DashboardOutlined,
  MonetizationOnOutlined,
  PersonOutlineOutlined,
  PolicyOutlined,
  ShowChartOutlined,
} from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import { USER_ROLE } from "../../common/apiManager";
import { IAuth } from "../../common/api";

interface SidebarProps {
  login?: IAuth;
}

const Sidebar = ({ login }: SidebarProps) => {
  const isAdmin = login?.role === USER_ROLE.ADMIN;

  const menuItem = isAdmin
    ? [
        {
          path: "/admin/users",
          name: "사용자 조회",
          icon: <PersonOutlineOutlined />,
        },
        {
          path: "/admin/coin",
          name: "코인 부여",
          icon: <MonetizationOnOutlined />,
        },
        {
          path: "/admin/policies",
          name: "정책 관리",
          icon: <PolicyOutlined />,
        },
        {
          path: "/admin/analysis",
          name: "코인 분석",
          icon: <ShowChartOutlined />,
        },
      ]
    : [
        {
          path: "/dashboard",
          name: "대시보드",
          icon: <DashboardOutlined />,
        },
      ];

  return (
    <div className="w-[200px] flex flex-col p-8 pr-0 gap-8 text-center">
      <span className="text-logo text-onPrimary">킹고코인</span>
      <div className="flex flex-col gap-4">
        {menuItem.map((item, index) => (
          <NavLink
            to={item.path}
            key={index}
            className={({ isActive, isPending }) =>
              isPending
                ? "flex gap-1 p-4 w-full items-center rounded-l-lg bg-surface text-onSurface transition-all"
                : isActive
                ? "flex gap-1 p-4 w-full items-center rounded-l-lg bg-surface text-onSurface transition-all"
                : "flex gap-1 p-4 w-full items-center rounded-l-lg text-surface hover:bg-surface hover:text-onSurface transition-all"
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
