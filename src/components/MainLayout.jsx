import React, { useState, useEffect, useRef } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import api from "../axiosSingleton";

const MainLayout = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const cart = useSelector((state) => state?.cart?.items);
  const totalItems = cart.reduce((acc, item) => acc + (item?.quantity ?? 0), 0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await api.get("customer/details");
        const user = response?.data;
        console.log("user", user);

        if (!user?.userName) {
          // handle not logged-in case
          setIsLoggedIn(false);
        } else {
          // handle logged-in case
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Failed to fetch customer details", error);
      }
    };

    fetchCustomerDetails();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8000/customer/logout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });
      toast.success("Logged out successfully!");
      setIsLoggedIn(false)
    } catch (err) {
      alert("Logout failed.");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans bg-neutral-900 text-gold border-x border-neutral-800">
      <header className="bg-neutral-950 border-b border-neutral-800 shadow-md">
        <div className="flex justify-between items-center px-6 py-4 gap-4 flex-wrap">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img
              src="https://freevector-images.s3.amazonaws.com/uploads/vector/preview/36682/36682.png"
              width="50"
              alt="logo"
              className="border border-gold rounded-lg shadow-md"
            />
            <span className="text-2xl font-semibold tracking-tight text-gold">VEGAS TABLES</span>
          </Link>

          {/* Search */}
          <form onSubmit={handleSearch} className="flex flex-grow max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search poker tables..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 border border-neutral-700 bg-neutral-800 text-white rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gold"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-gold text-black font-semibold border border-gold rounded-r-lg hover:bg-white transition"
            >
              Search
            </button>
          </form>

          {/* Nav */}
          <nav className="flex items-center space-x-4 text-sm uppercase font-medium tracking-wide relative">
            <Link
              to="/cart"
              className="relative border border-gold px-4 py-2 rounded-lg hover:bg-gold hover:text-black transition"
            >
              Cart
              <span className="absolute -top-2 -right-2 bg-gold text-black text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg">
                {totalItems}
              </span>
            </Link>

            <Link
              to="/orders"
              className="border border-gold px-4 py-2 rounded-lg hover:bg-gold hover:text-black transition"
            >
              Orders
            </Link>

            {/* Popup Trigger */}
            <button
              onClick={() => setShowMenu((prev) => !prev)}
              className="border border-gold px-4 py-2 rounded-lg hover:bg-gold hover:text-black transition"
            >
              Account ▾
            </button>

            {/* Dropdown */}
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute right-0 top-16 z-50 bg-neutral-800 text-white border border-gold rounded-md shadow-lg w-48"
              >
                {isLoggedIn ? (
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white"
                  >
                    Logout (Customer)
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      navigate("/onboard/signup");
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-red-600 hover:text-white"
                  >
                    Login
                  </button>
                )}
                <button
                  onClick={() => navigate("/sellerLogin")}
                  className="block w-full text-left px-4 py-2 hover:bg-yellow-600 hover:text-black"
                >
                  Switch to Seller
                </button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-grow p-8 bg-neutral-900 text-white">
        <Outlet />
      </main>

      <footer className="bg-neutral-950 border-t border-neutral-800 text-center py-4 text-xs text-neutral-400 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Vegas Tables. All rights reserved.
      </footer>
    </div>
  );
};

export default MainLayout;
