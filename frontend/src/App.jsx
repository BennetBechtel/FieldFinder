import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppContext } from "./contexts/AppContext";
import Layout from "./layouts/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MyBookings from "./pages/MyBookings";
import AddGym from "./pages/AddGym";
import MyGyms from "./pages/MyGyms";
import EditGym from "./pages/EditGym";

const App = () => {
  const { isLoggedIn } = useAppContext();

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />

          {isLoggedIn && (
            <>
              <Route path="/my-gyms" element={<MyGyms />} />
              <Route path="/edit-gym/:gymId" element={<EditGym />} />
              <Route path="/add-gym" element={<AddGym />} />
              <Route path="/bookings" element={<MyBookings />} />
            </>
          )}

          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
