import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSellerProductsRequest,
  addSellerProductRequest,
  editSellerProductRequest,
  deleteSellerProductRequest,
} from "../../redux/sellerProduct/sellerProductActions";
import api from "../../axiosSingleton";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const SellerPage = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.sellerProduct);

  const [formData, setFormData] = useState({
    id: null,
    name: "",
    description: "",
    image: "",
    price: 0,
    rating: 0,
    tags: "",
    categoryId: "",
  });

  const [page, setPage] = useState(1);
  const limit = 6;
  const offset = (page - 1) * limit;
  const totalCount = products?.count || 0;
  const totalPages = Math.ceil(totalCount / limit);

   const navigate = useNavigate()

  useEffect(() => {
    dispatch(fetchSellerProductsRequest({ limit, offset }));
  }, [dispatch, page]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
    };
    if (formData.id) {
      dispatch(editSellerProductRequest(formData.id, payload));
    } else {
      dispatch(addSellerProductRequest(payload));
    }
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      description: "",
      image: "",
      price: 0,
      rating: 0,
      tags: "",
      categoryId: "",
    });
  };

  const handleEdit = (product) => {
    setFormData({
      ...product,
      tags: product.tags.join(", "),
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteSellerProductRequest(id));
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/seller/logout", {
        method: "POST",
        credentials: "include", 
        headers: {
          "Content-Type": "application/json",
        },
      });
      navigate("/sellerLogin")
      toast.success("Logged out successfully")
    } catch (err) {
      console.error("Logout failed:", err);
      alert("Logout failed");
    }
  };

  return (
    <div className="p-6 bg-neutral-900 min-h-screen text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gold">Seller Dashboard</h1>
        <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>

      <form onSubmit={handleSubmit} className="bg-neutral-800 p-4 rounded mb-6 space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Product Name"
          className="w-full p-2 rounded bg-neutral-700"
        />
        <input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full p-2 rounded bg-neutral-700"
        />
        <input
          name="image"
          value={formData.image}
          onChange={handleChange}
          placeholder="Image URL"
          className="w-full p-2 rounded bg-neutral-700"
        />
        <input
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-2 rounded bg-neutral-700"
        />
        <input
          name="rating"
          type="number"
          value={formData.rating}
          onChange={handleChange}
          placeholder="Rating"
          className="w-full p-2 rounded bg-neutral-700"
        />
        <input
          name="tags"
          value={formData.tags}
          onChange={handleChange}
          placeholder="Tags (comma-separated)"
          className="w-full p-2 rounded bg-neutral-700"
        />
        <input
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          placeholder="Category ID"
          className="w-full p-2 rounded bg-neutral-700"
        />
        <button type="submit" className="bg-gold text-black px-4 py-2 rounded">
          {formData.id ? "Update" : "Add"} Product
        </button>
      </form>

      {loading && <p className="text-yellow-300">Loading...</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.data?.map((product) => (
          <div key={product.id} className="bg-neutral-800 p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating}</p>
            <p>Tags: {product.tags.join(", ")}</p>
            <div className="mt-2 space-x-2">
              <button onClick={() => handleEdit(product)} className="px-3 py-1 bg-yellow-500 text-black rounded">
                Edit
              </button>
              <button onClick={() => handleDelete(product.id)} className="px-3 py-1 bg-red-600 rounded">
                Delete
              </button>
            </div>
          </div>
        ))}
        {!products?.data?.length && !loading && (
          <p className="col-span-full text-gray-400 italic">No products found!</p>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8 space-x-4">
          <button
            onClick={() => setPage((p) => Math.max(p - 1, 1))}
            disabled={page === 1}
            className="px-4 py-2 bg-gold text-black rounded disabled:opacity-50"
          >
            Prev
          </button>
          <span className="text-gold font-semibold">
            Page {page} of {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            disabled={page === totalPages}
            className="px-4 py-2 bg-gold text-black rounded disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default SellerPage;
