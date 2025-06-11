import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrdersRequest } from "../redux/order/orderActions";
import { toast } from "react-toastify";
import HorizontalLister from "../components/HorizontalLister";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders = [], loading, error, count:total } = useSelector((state) => state?.order || {});
  const state= useSelector((state) => state?.order || {});

  console.log("orders ", orders);
  console.log("state ", state);
  const [page, setPage] = useState(1);
  const limit = 5;
  const offset = (page - 1) * limit;

  useEffect(() => {
    dispatch(fetchOrdersRequest({ limit, offset }));
  }, [dispatch, page]);

  useEffect(() => {
    if (error) {
      toast.error("Failed to load orders.");
    }
  }, [error]);

  const totalPages = Math.ceil(total / limit);
  console.log("qweqweqw totalPages ",totalPages)
  console.log("qweqweqw total ",total)
  console.log("qweqweqw limit ",limit) 
  console.log("qweqweqw offset ",offset) 

  return (
    <div className="px-4 sm:px-8 bg-neutral-900 text-white min-h-screen">
      <h2 className="text-3xl font-bold text-gold mt-6 mb-4 border-b border-neutral-800 pb-2 uppercase">Your Orders</h2>

      {loading && <p className="text-yellow-400">Loading orders...</p>}

      {!loading && orders?.data?.length === 0 && <p className="text-gray-400 italic">No orders found.</p>}

      {!loading &&
        orders?.map((order, index) => (
          <section
            key={order.id || index}
            className="border border-neutral-800 rounded-xl p-6 my-6 bg-neutral-950 shadow-lg"
          >
            <div className="mb-4">
              <div className="text-lg font-semibold text-gold">Order #{order.id}</div>
              <div className="text-sm text-neutral-400 mt-1">Address: {order.address}</div>
              <div className="text-sm text-neutral-400">Instructions: {order.deliveryInstructions || "None"}</div>
            </div>

            <h4 className="text-md font-bold text-white mb-2">Products:</h4>
            {order?.Products?.length > 0 ? (
              <HorizontalLister list={order.Products} />
            ) : (
              <p className="text-sm text-gray-500 italic">No products in this order.</p>
            )}
          </section>
        ))}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-3">
          <button
            className="px-4 py-2 rounded bg-gold text-black font-bold disabled:opacity-40"
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="px-4 py-2 font-semibold text-gold">
            {page} / {totalPages}
          </span>
          <button
            className="px-4 py-2 rounded bg-gold text-black font-bold disabled:opacity-40"
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default OrdersPage;
