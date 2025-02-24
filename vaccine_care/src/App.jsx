import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "./constant/pathname";
import Login from "./pages/guest/login/Login";
import AdminDashboard from "./components/admin/admin";
import Dashboard from "./components/admin/dashboard/dashboard";
import Staff from "./components/admin/staff/staff";
import Vaccine from "./components/admin/vaccine/Vaccine";
import PaymentHistory from "./components/admin/payment_history/payment";
import AccInfo from "./components/admin/profile/acc_info";

const App = () => {
  return (
    <Routes>
      {/* Routes có Header & Footer */}
      <Route path="/" element={<Login />} />

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminDashboard />}>
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="staff" element={<Staff />} />
        <Route path="vaccine" element={<Vaccine />} />
        <Route path="payment-history" element={<PaymentHistory />} />
        <Route path="profile" element={<AccInfo />} />
      </Route>

      {/*staff*/}

      {/* doctor */}

      {/* Routes không có Header & Footer */}
    </Routes>
  );
};

export default App;
