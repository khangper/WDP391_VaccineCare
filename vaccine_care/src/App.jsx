import { Routes, Route } from "react-router-dom";
import { PATH_NAME } from "./constant/pathname";
import Login from "./pages/guest/login/Login";

const App = () => {
  return (
    <Routes>
      {/* Routes có Header & Footer */}
      <Route path="/" element={<Login />} />

      {/* Admin */}

      {/*staff*/}

      {/* doctor */}

      {/* Routes không có Header & Footer */}
    </Routes>
  );
};

export default App;
