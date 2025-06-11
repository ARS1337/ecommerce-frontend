import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../../axiosSingleton";
import { toast } from "react-toastify";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ name: "", userName: "", password: "" });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    // Use your API singleton instead of axios directly
    const response = await api.post('/customer/login', {
      userName: form.userName,
      password: form.password
    });
    toast.success("Logged in successfully!")
    console.log(isLogin ? 'Login successful' : 'Signup successful', response.data);
    navigate('/'); // Redirect on success
  } catch (error) {
    console.error('Authentication error:', error.response?.data || error.message);
    // Handle error (e.g., show error message to user)
    toast.error(error.message)
  }
};

  return (
    <div className="min-h-screen bg-neutral-950 flex items-center justify-center p-4 font-mono text-white">
      <div className="bg-neutral-900 border border-neutral-800 rounded-2xl shadow-xl w-full max-w-md p-8">
        <h1 className="text-3xl font-extrabold text-center text-gold mb-6">
          {isLogin ? "Login" : "Sign Up"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block mb-1 text-sm text-gold">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gold"
              />
            </div>
          )}

          <div>
            <label className="block mb-1 text-sm text-gold">Username</label>
            <input
              type="text"
              name="userName"
              value={form.userName}
              onChange={handleChange}
              required
              className="w-full p-3 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gold"
            />
          </div>

          <div className="relative">
            <label className="block mb-1 text-sm text-gold">Password</label>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full p-3 pr-10 bg-neutral-950 border border-neutral-700 rounded-lg text-white focus:outline-none focus:border-gold"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-9 text-gold"
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-gold text-neutral-950 font-bold py-3 rounded-lg border border-gold hover:bg-neutral-950 hover:text-gold transition"
          >
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-neutral-400 mt-6">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-gold font-semibold underline hover:text-white"
          >
            {isLogin ? "Sign up" : "Login"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
