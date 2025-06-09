import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, clearCart, decreaseFromCart, removeFromCart } from "../redux/slices/cartSlice";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state?.cart?.items || []);

  if (!cart.length) {
    return (
      <div className="p-12 text-2xl font-bold font-mono border-4 border-neutral-800 text-center text-gold bg-neutral-900 rounded-xl mx-6 mt-10">
        No products added in cart!
      </div>
    );
  }

  const totalPrice = cart
    .reduce((acc, item) => {
      const price = item.discountedPrice ?? item.price;
      return acc + price * item.quantity;
    }, 0)
    .toFixed(2);

  return (
    <div className="p-8 font-mono bg-neutral-900 min-h-screen text-white">
      <h1 className="text-4xl font-extrabold mb-8 border-b-4 border-gold pb-3 text-gold">
        Your Cart
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {cart.map((item, index) => (
          <div
            key={index}
            className="relative bg-neutral-950 border border-neutral-800 p-5 w-64 rounded-2xl shadow-lg transition-transform hover:scale-[1.03]"
          >
            {/* Trash Icon */}
            <button
              onClick={() => dispatch(removeFromCart(item?.id))}
              className="absolute top-3 right-3 p-1 rounded border border-gold text-gold hover:bg-gold hover:text-neutral-900 transition"
              title="Remove item"
            >
              <Trash2 size={18} />
            </button>

            <img
              src={item.image ?? "http://via.placeholder.com/150"}
              alt={item.name ?? "default name"}
              className="w-full h-36 object-cover rounded-xl border border-neutral-700 shadow-md"
            />

            <h2 className="text-xl font-semibold mt-4 uppercase truncate border-t border-neutral-800 pt-2 text-gold">
              {item.name ?? "default name"}
            </h2>

            <p className="text-sm mt-2 text-neutral-300">
              Price:{" "}
              <span className={`mr-1 ${item.discountedPrice ? "line-through text-red-600" : "text-gold"}`}>
                ${item.price ?? "0.00"}
              </span>
            </p>

            <p className={`text-lg font-bold mt-1 ${item.discountedPrice ? "block text-green-500" : "invisible"}`}>
              Discounted: ${item.discountedPrice}
            </p>

            <div className="mt-5 flex items-center justify-between border border-neutral-800 p-2 rounded-lg bg-neutral-900">
              <button
                onClick={() => dispatch(decreaseFromCart(item))}
                className="bg-neutral-950 text-gold px-4 py-1 font-bold rounded hover:bg-gold hover:text-neutral-900 border border-gold transition"
              >
                −
              </button>
              <span className="px-6 text-lg font-semibold">{item?.quantity}</span>
              <button
                onClick={() => dispatch(addToCart(item))}
                className="bg-neutral-950 text-gold px-4 py-1 font-bold rounded hover:bg-gold hover:text-neutral-900 border border-gold transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Buttons */}
      <div className="mt-12 border border-gold p-6 bg-neutral-950 rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-2xl font-extrabold text-gold">
          Total: <span className="underline">${totalPrice}</span>
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-neutral-900 text-gold px-8 py-3 font-bold text-lg rounded border border-gold hover:bg-gold hover:text-neutral-900 transition"
          >
            EMPTY CART
          </button>
          <button
            onClick={() => navigate("/order")}
            className="bg-gold text-neutral-900 px-8 py-3 font-bold text-lg rounded border border-gold hover:bg-neutral-900 hover:text-gold transition"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
