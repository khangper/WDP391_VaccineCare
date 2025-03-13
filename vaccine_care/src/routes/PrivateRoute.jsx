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
    const userRole = decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

    if (!allowedRoles.includes(userRole)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return element;
  } catch (error) {
    console.error("❌ Lỗi khi giải mã token:", error);
    return <Navigate to="/login" replace />;
  }
};

export default PrivateRoute;
