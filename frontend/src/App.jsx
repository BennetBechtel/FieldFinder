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
import Booking from "./pages/Booking";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import MyBookings from "./pages/MyBookings";

const App = () => {
  const { isLoggedIn } = useAppContext();

  const initialOptions = {
    "client-id":
      "Aa9CsxFP_Drv5z9IN8VFT7rEK92KCw6sMxM9USpBdABVetpolbBgXpdOdqHzR6LQnac4JWQPyRaMV6vr",
    currency: "EUR",
    intent: "capture",
    // "data-client-token": "abc123xyz==",
  };

  return (
    <PayPalScriptProvider options={initialOptions}>
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/detail/:gymId" element={<Detail />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            {isLoggedIn && (
              <>
                <Route path="/my-gyms" element={<MyGyms />} />
                <Route path="/edit-gym/:gymId" element={<EditGym />} />
                <Route path="/add-gym" element={<AddGym />} />
                <Route path="/gym/:gymId/booking" element={<Booking />} />
                <Route path="/my-bookings" element={<MyBookings />} />
              </>
            )}

            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PayPalScriptProvider>
  );
};

export default App;
