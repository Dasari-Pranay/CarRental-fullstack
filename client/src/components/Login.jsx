import React from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { setShowLogin, axios, setToken } = useAppContext();
  const navigate = useNavigate();

  const [state, setState] = React.useState("login");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const { data } = await axios.post(`/api/user/${state}`, { name, email, password });
      if (data.success) {
        navigate('/');
        setToken(data.token);
        localStorage.setItem('token', data.token);
        setShowLogin(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed top-0 left-0 right-0 bottom-0 z-[100] bg-black/40 backdrop-blur-sm flex justify-center items-center"
    >
      <form
        onSubmit={onSubmitHandler}
        onClick={(e) => e.stopPropagation()}
        className="relative flex flex-col gap-6 w-[90%] sm:w-[370px] rounded-2xl p-8 py-10 border border-white/30 bg-white/10 backdrop-blur-xl text-sm text-white shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] animate-fade-in"
      >
        {/* Title */}
        <h2 className="text-center text-3xl font-bold tracking-wide drop-shadow-md">
          <span className="text-cyan-400">User</span> {state === "login" ? "Login" : "Sign Up"}
        </h2>

        {/* Full Name (only for register) */}
        {state === "register" && (
          <div className="relative w-full">
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full Name"
              className="peer w-full border border-gray-300 bg-white/20 text-white text-base leading-tight px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:opacity-0"
            />
            <label
              className="absolute left-3 text-gray-300 text-sm duration-300 transform -translate-y-4 scale-90 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-cyan-300"
            >
              Full Name
            </label>
          </div>
        )}

        {/* Email */}
        <div className="relative w-full">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email Address"
            className="peer w-full border border-gray-300 bg-white/20 text-white text-base leading-tight px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:opacity-0"
          />
          <label
            className="absolute left-3 text-gray-300 text-sm duration-300 transform -translate-y-4 scale-90 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-cyan-300"
          >
            Email Address
          </label>
        </div>

        {/* Password */}
        <div className="relative w-full">
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="peer w-full border border-gray-300 bg-white/20 text-white text-base leading-tight px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-300 placeholder:opacity-0"
          />
          <label
            className="absolute left-3 text-gray-300 text-sm duration-300 transform -translate-y-4 scale-90 origin-[0] peer-placeholder-shown:translate-y-2 peer-placeholder-shown:scale-100 peer-focus:-translate-y-4 peer-focus:scale-90 peer-focus:text-cyan-300"
          >
            Password
          </label>
        </div>

        {/* Toggle login/register */}
        <p className="text-center text-sm text-gray-200">
          {state === "register" ? (
            <>
              Already have an account?{' '}
              <span
                onClick={() => setState("login")}
                className="text-cyan-300 cursor-pointer hover:underline font-medium"
              >
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{' '}
              <span
                onClick={() => setState("register")}
                className="text-cyan-300 cursor-pointer hover:underline font-medium"
              >
                Register here
              </span>
            </>
          )}
        </p>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-2 w-full py-2 rounded-md bg-gradient-to-r from-cyan-500 to-indigo-600 hover:from-indigo-600 hover:to-cyan-400 text-white font-medium transition-all duration-300 shadow-lg cursor-pointer"
        >
          {state === "register" ? "Create Account" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
