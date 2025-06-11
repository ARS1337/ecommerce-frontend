import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import { addToCart, clearCart, decreaseFromCart, removeFromCart } from "../redux/cart/cartReducer";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state?.cart?.items || []);

  if (!cart.length) {
    return (
      <div className="p-12 text-2xl font-bold font-mono border-4 border-border text-center text-gold bg-surface rounded-xl mx-6 mt-10">
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
    <div className="p-8 font-mono bg-background min-h-screen text-primaryText">
      <h1 className="text-4xl font-extrabold mb-8 border-b-4 border-gold pb-3 text-gold">
        Your Cart
      </h1>
      <div className="flex flex-wrap gap-8 justify-center">
        {cart.map((item, index) => (
          <div
            key={index}
            className="relative bg-surface border border-border p-5 w-64 rounded-2xl shadow-subtle transition-transform hover:scale-[1.03]"
          >
            <button
              onClick={() => dispatch(removeFromCart(item?.id))}
              className="absolute top-3 right-3 p-1 rounded border border-gold text-gold hover:bg-gold hover:text-background transition"
              title="Remove item"
            >
              <Trash2 size={18} />
            </button>

            <img
              src={item.image ?? "http://via.placeholder.com/150"}
              alt={item.name ?? "default name"}
              className="w-full h-36 object-cover rounded-xl border border-border shadow-md"
            />

            <h2 className="text-xl font-semibold mt-4 uppercase truncate border-t border-border pt-2 text-gold">
              {item.name ?? "default name"}
            </h2>

            <p className="text-sm mt-2 text-secondaryText">
              Price:{" "}
              <span className={`mr-1 ${item.discountedPrice ? "line-through text-red-600" : "text-gold"}`}>
                ${item.price ?? "0.00"}
              </span>
            </p>

            <p className={`text-lg font-bold mt-1 ${item.discountedPrice ? "block text-green-500" : "invisible"}`}>
              Discounted: ${item.discountedPrice}
            </p>

            <div className="mt-5 flex items-center justify-between border border-border p-2 rounded-lg bg-background">
              <button
                onClick={() => dispatch(decreaseFromCart(item))}
                className="bg-surface text-gold px-4 py-1 font-bold rounded hover:bg-gold hover:text-background border border-gold transition"
              >
                −
              </button>
              <span className="px-6 text-lg font-semibold">{item?.quantity}</span>
              <button
                onClick={() => dispatch(addToCart(item))}
                className="bg-surface text-gold px-4 py-1 font-bold rounded hover:bg-gold hover:text-background border border-gold transition"
              >
                +
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-gold p-6 bg-surface rounded-xl flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-2xl font-extrabold text-gold">
          Total: <span className="underline">${totalPrice}</span>
        </p>
        <div className="flex gap-6">
          <button
            onClick={() => dispatch(clearCart())}
            className="bg-background text-gold px-8 py-3 font-bold text-lg rounded border border-gold hover:bg-gold hover:text-background transition"
          >
            EMPTY CART
          </button>
          <button
            onClick={() => navigate("/order")}
            className="bg-gold text-background px-8 py-3 font-bold text-lg rounded border border-gold hover:bg-background hover:text-gold transition"
          >
            BUY NOW
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
