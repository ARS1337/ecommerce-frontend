import React, { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decreaseFromCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ListItem = ({ item, index }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector((state) => state?.cart?.items);

  const doesItemExistInCart = useMemo(() => {
    return cart.find((cartItem) => cartItem?.id === item?.id) ?? null;
  }, [cart, item]);

  const addedToCart = (product) => {
    toast(`Item added to cart`);
  };

  return (
    <div
      key={index}
      className="flex-shrink-0 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-lg p-4
                 w-60 sm:w-48 md:w-52 lg:w-60 snap-start
                 transition-transform hover:scale-105 text-white group"
    >
      <div
        onClick={() => navigate(`/details/${item.id}`)}
        className="cursor-pointer"
      >
        <img
          src={item.image ?? "http://via.placeholder.com/150"}
          alt={item.name ?? "default name"}
          className="w-full h-36 object-cover rounded-xl border border-neutral-700 shadow-md"
        />

        <h2 className="text-lg font-semibold mt-3 uppercase truncate text-gold border-t border-neutral-700 pt-2">
          {item.name ?? "default name"}
        </h2>

        <p className="text-sm mt-2 text-neutral-300">
          Price:
          <span
            className={`ml-1 ${
              item.discountedPrice ? "line-through text-red-600" : "text-gold"
            }`}
          >
            ${item.price ?? "0.00"}
          </span>
        </p>

        <p
          className={`text-md font-bold text-green-500 mt-1 ${
            item?.discountedPrice ? "block" : "invisible"
          }`}
        >
          Discounted Price: ${item.discountedPrice}
        </p>
      </div>

      {!!doesItemExistInCart ? (
        <div className="mt-4 flex items-center justify-between border border-neutral-700 p-2 rounded-xl bg-neutral-800">
          <button
            onClick={() => dispatch(decreaseFromCart(item))}
            className="bg-neutral-950 text-gold px-3 py-1 font-bold rounded hover:bg-gold hover:text-black border border-gold transition"
          >
            −
          </button>
          <span className="px-4 text-lg font-semibold">{doesItemExistInCart.quantity}</span>
          <button
            onClick={() => dispatch(addToCart(item))}
            className="bg-neutral-950 text-gold px-3 py-1 font-bold rounded hover:bg-gold hover:text-black border border-gold transition"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => {
            addedToCart(item);
            dispatch(addToCart(item));
          }}
          className="mt-4 w-full bg-gold text-black py-2 text-sm font-bold rounded-xl border border-gold hover:bg-neutral-900 hover:text-gold transition"
        >
          ADD TO CART
        </button>
      )}
    </div>
  );
};

export default ListItem;
