import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, Link, useNavigate } from "react-router-dom";

const OnboardLayout = () => {
  const cart = useSelector((state) => state?.cart?.items);
  const totalItems = cart.reduce((acc, item) => acc + (item?.quantity ?? 0), 0);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen font-sans bg-neutral-900 text-gold border-x border-neutral-800">
      {/* Header */}
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
            <span className="text-2xl font-semibold tracking-tight text-gold">
              VEGAS TABLES
            </span>
          </Link>

          {/* Nav Links */}
          <nav className="flex items-center space-x-4 text-sm uppercase font-medium tracking-wide">
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
              to="/order"
              className="border border-gold px-4 py-2 rounded-lg hover:bg-gold hover:text-black transition"
            >
              Orders
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow p-8 bg-neutral-900 text-white">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-neutral-950 border-t border-neutral-800 text-center py-4 text-xs text-neutral-400 tracking-widest uppercase">
        &copy; {new Date().getFullYear()} Vegas Tables. All rights reserved.
      </footer>
    </div>
  );
};

export default OnboardLayout;
