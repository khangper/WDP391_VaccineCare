import "../../staff/sidebar/Sidebar.css"
import { NavLink, useLocation } from 'react-router-dom';
import { PATH_NAME } from '../../../constant/pathname';
import { IoPersonOutline, IoSettingsOutline } from "react-icons/io5";
import { MdOutlineVaccines } from "react-icons/md";
import { FaPowerOff } from 'react-icons/fa6';

const Sidebar = ({ isCollapsed }) => {
  const location = useLocation();
  return (
    <aside className={`sidebar_staff ${isCollapsed ? "collapsed" : ""}`}>
      <div className="sidebar_main_staff">
        <ul className="sidebar_menu_container_staff">
          <li className={location.pathname === PATH_NAME.INJECTION_INFORMATION ? "active" : ""}>
            <NavLink
              to={PATH_NAME.INJECTION_INFORMATION}
              
            >
              <IoPersonOutline className="icon" /> {!isCollapsed && "Thông tin tiêm"}
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
}

export default Sidebar