import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "./constant/pathname";
import Login from "./pages/guest/loginPage/LoginPage";
import LayoutCustomer from "./components/customer/LayoutCustomer/LayoutCustomer";
import HomePage from "./pages/guest/HomePage/HomePage";
import VaccineListPage from "./pages/guest/VaccineListPage/VaccineListPage";
import DetailPage from "./pages/guest/DetailPage/DetailPage";
import RegisterPage from "./pages/guest/RegisterPage/RegisterPage";
import LoginPage from "./pages/guest/loginPage/LoginPage";
import BookingPage from "./pages/cutomer/BookingPage/BookingPage";
import BillPage from "./pages/cutomer/BillPage/BillPage";
import ProfileChildPage from "./pages/cutomer/ProfileChildPage/ProfileChildPage";
import VaccinationSchedule from "./pages/cutomer/VaccinationSchedule/VaccinationSchedule";
import AboutPage from "./pages/guest/AboutPage/AboutPage";
import VaccinePrice from "./pages/guest/VaccinePrice/VaccinePrice";
import CamNangPage from "./pages/guest/CamNangPage/CamNangPage";
import CusPaymentPage from "./pages/cutomer/CusPaymentPage/CusPaymentPage";
import VaccineTransactionPage from "./pages/cutomer/VaccineTransactionPage/VaccineTransactionPage";
import VaccinationScheduleStatus from "./pages/cutomer/VaccinationScheduleStatus/VaccinationScheduleStatus";
import CreatechildPage from "./pages/cutomer/Success/CreatechildPage/CreatechildPage";
import SuccessRegis from "./pages/cutomer/Success/SuccessRegis/SuccessRegis";
import SuccesCreateprofile from "./pages/cutomer/Success/SuccesCreateprofile/SuccesCreateprofile";
import SuccesBooking from "./pages/cutomer/Success/SuccesBooking/SuccesBooking";

const App = () => {
  return (
    <Routes>
      {/* Routes có Header & Footer */}
      <Route element={<LayoutCustomer />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/vaccine-list" element={<VaccineListPage />} />
        <Route path="/vaccine/:id" element={<DetailPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/bill" element={<BillPage />} />
        <Route path="/profilechild" element={<ProfileChildPage />} />
        <Route path="/vaccination" element={<VaccinationSchedule />} />
        <Route path="/aboutus" element={<AboutPage />} />
        <Route path="/priceVaccine" element={<VaccinePrice />} />
        <Route path="/camNang" element={<CamNangPage />} />
        <Route path="/billpayment" element={<CusPaymentPage />} />
        <Route path="/transaction" element={<VaccineTransactionPage />} />
        <Route path="/vaccinationScheduleStatus" element={<VaccinationScheduleStatus />} />

      </Route>

      {/* Admin */}

      {/*staff*/}

      {/* doctor */}

       {/* Routes không có Header & Footer */}
       <Route path="/createchild" element={<CreatechildPage />} />
      <Route path="/successregis" element={<SuccessRegis />} />
      <Route path="/successbaby" element={<SuccesCreateprofile />} />
      <Route path="/successbooking" element={<SuccesBooking />} />

    </Routes>
  );
};

export default App;
