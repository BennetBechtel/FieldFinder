import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddGym from "./pages/AddGym";
import MyGyms from "./pages/MyGyms";
import EditGym from "./pages/EditGym";
import Home from "./pages/Home";
import Detail from "./pages/Detail";
import ScrollToTop from "./contexts/ScrollToTop";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/details/:gymId" element={<Detail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {isLoggedIn && (
            <>
              <Route path="/my-gyms" element={<MyGyms />} />
              <Route path="/edit-gym/:gymId" element={<EditGym />} />
              <Route path="/add-gym" element={<AddGym />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
