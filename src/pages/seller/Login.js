import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../axiosSingleton"; // Make sure this is your singleton axios instance

const SellerLoginPage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await api.post("/seller/login", formData);
      const { token, seller } = response.data;

      localStorage.setItem("sellerToken", token);
      localStorage.setItem("sellerInfo", JSON.stringify(seller));

      navigate("/seller/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-900">
      <form onSubmit={handleLogin} className="bg-neutral-800 p-8 rounded-lg shadow-lg w-full max-w-md text-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-gold">Seller Login</h2>

        {error && <p className="text-red-400 mb-4 text-sm text-center">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full p-2 rounded bg-neutral-700 border border-neutral-600"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gold text-black py-2 rounded font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <button
        type="reset"
          className="w-full bg-gold text-black mt-4 py-2 rounded font-semibold hover:bg-yellow-400 transition disabled:opacity-50"
          onClick={()=>{navigate("/onboard/signup")}}
        >
          {"Login as customer instead?"}
        </button>
      </form>
    </div>
  );
};

export default SellerLoginPage;
