import "./Sidebar.css";
import { NavLink, useLocation } from "react-router-dom";
import { PATH_NAME } from "../../../constant/pathname";
import { BiInjection } from "react-icons/bi";
import { MdOutlineVaccines } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { FaPowerOff } from "react-icons/fa6";


const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  return (
    <aside className={`sidebar_staff ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar_main_staff">
        <ul className="sidebar_menu_container_staff">
          <li className={location.pathname === PATH_NAME.INJECTION ? "active" : ""}>
            <NavLink
              to={PATH_NAME.INJECTION}
              
            >
              <BiInjection className="icon" /> {!isCollapsed && "Thông tin đăng ký tiêm"}
            </NavLink>
          </li>
          <li className={location.pathname === PATH_NAME.VACCINE ? "active" : ""}>
            <NavLink
              to={PATH_NAME.VACCINE}
              
            >
              <MdOutlineVaccines className="icon" /> {!isCollapsed && "Vắc xin"}
            </NavLink>
          </li>
        </ul>
        <ul className="sidebar_menu_container_1">
          <li className={location.pathname === PATH_NAME.SETTING ? "active" : ""}>
            <NavLink
              to={PATH_NAME.SETTING}
              
            >
              <IoSettingsOutline className="icon" /> {!isCollapsed && "Cài đặt"}
            </NavLink>
          </li>
          <li className={location.pathname === PATH_NAME.LOGOUT ? "active" : ""}>
            <NavLink
              to={PATH_NAME.HOME} 
            >
              <FaPowerOff className="icon" /> {!isCollapsed && "Đăng xuất"}
            </NavLink>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
