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
import PrivateRoute from "./routes/PrivateRoute";

const App = () => {
  return (
    <Routes>
      {/* Routes có Header & Footer */}
      <Route element={<LayoutCustomer />}>
        <Route path="/" element={<HomePage />} />
        <Route path={PATH_NAME.LISTVACCINE}element={<VaccineListPage />} />
        <Route path= {PATH_NAME.DETAILVACCINE} element={<DetailPage />} />
        <Route path={PATH_NAME.REGISTER} element={<RegisterPage />} />
        <Route path={PATH_NAME.LOGIN} element={<LoginPage />} />
        <Route path={PATH_NAME.BOOKING} element={<PrivateRoute element={<BookingPage />} />} />
        <Route path={PATH_NAME.BILL} element={<PrivateRoute element={<BillPage />} />} />
        <Route path={PATH_NAME.PROFILE_CHILD} element={<ProfileChildPage />} />
        <Route path={PATH_NAME.VACCINATION_SCHEDULE} element={<VaccinationSchedule />} />
        <Route path={PATH_NAME.ABOUT_US} element={<AboutPage />} />
        <Route path={PATH_NAME.VACCINE_PRICE} element={<VaccinePrice />} />
        <Route path={PATH_NAME.CAM_NANG} element={<CamNangPage />} />
        <Route path={PATH_NAME.BILL_PAYMENT} element={<CusPaymentPage />} />
        <Route path={PATH_NAME.TRANSACTION} element={<VaccineTransactionPage />} />
        <Route path={PATH_NAME.VACCINATION_SCHEDULE_STATUS} element={<VaccinationScheduleStatus />} />

      </Route>

      {/* Admin */}

      {/*staff*/}

      {/* doctor */}

       {/* Routes không có Header & Footer */}
       <Route path={PATH_NAME.CREATE_CHILD} element={<CreatechildPage />} />
      <Route path={PATH_NAME.SUCCESS_REGIS} element={<SuccessRegis />} />
      <Route path={PATH_NAME.SUCCESS_CREATE_PROFILE} element={<SuccesCreateprofile />} />
      <Route path={PATH_NAME.SUCCESS_BOOKING} element={<SuccesBooking />} />

    </Routes>
  );
};

export default App;
