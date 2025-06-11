import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductListing from "./pages/ProductListing";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Order from "./pages/Order";
import MainLayout from "./components/MainLayout";
import { ToastContainer } from "react-toastify";
import Search from "./pages/Search";
import "react-toastify/dist/ReactToastify.css";
import OnboardLayout from "./components/OnboardLayout";
import Auth from "./pages/user/Login";
import OrdersPage from "./pages/OrdersPage";
import RequireSellerDetails from "./pages/seller/RequireSellerDetails";
import SellerPage from "./pages/seller/ProductCrud";
import SellerLoginPage from "./pages/seller/Login";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route path="/" element={<ProductListing />} />
            <Route path="/details/:id" element={<ProductDetails />} />
            <Route path="/Cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/search" element={<Search />} />
            <Route path="/orders" element={<OrdersPage />} />
          </Route>
          <Route path="/onboard" element={<OnboardLayout />}>
            <Route path="/onboard/signup" element={<Auth />} />
          </Route>
          <Route path="/sellerLogin" element={<SellerLoginPage/>} />
          <Route element={<RequireSellerDetails />}>
            <Route path="/seller/dashboard" element={<SellerPage />} />
          </Route>
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="!bg-neutral-900 !text-gold !border !border-gold !shadow-lg font-mono rounded-lg"
        bodyClassName="text-sm"
      />
    </>
  );
}

export default App;
