// import { useContext } from "react";
// import { Navigate } from "react-router-dom";
// import { AuthContext } from "../context/AuthContext";

// const PrivateRoute = ({ element }) => {
//   const { isLoggedIn } = useContext(AuthContext);

//   return isLoggedIn ? element : <Navigate to="/login" replace />;
// };

// export default PrivateRoute;
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import jwtDecode from "jwt-decode";

const PrivateRoute = ({ element, allowedRoles }) => {
  const { token, isLoggedIn } = useContext(AuthContext);

  if (!isLoggedIn || !token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const userRole = decodedToken.role; 

    if (!userRole) {
      console.error("❌ Không tìm thấy role trong token!");
      return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(userRole)) {
      console.warn(`⛔ User với role "${userRole}" không có quyền truy cập.`);
      return <Navigate to="/unauthorized" replace />;
    }

    return element;
  } catch (error) {
    console.error("❌ Lỗi khi giải mã token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
