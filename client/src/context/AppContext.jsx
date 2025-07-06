/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_BASE_URL || "http://localhost:3000/api";
axios.defaults.baseURL = baseURL;
axios.defaults.withCredentials = true; // Send cookies if needed



export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY || "₹";

  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(null);
  const [isOwner, setIsOwner] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cars, setCars] = useState([]);

  // 🔐 Fetch User Data
  const fetchUser = useCallback(async () => {
    if (!token) {
      setUser(null);
      setIsOwner(false);
      return;
    }
    try {
      
      const { data } = await axios.get("/api/user/data", {
        headers: { Authorization: `${token}` },
      });
      

      if (data.success) {
        setUser(data.user);
        setIsOwner(data.user.role === "owner");
      } else {
        toast.error(data.message || "Failed to fetch user data");
        setUser(null);
        setIsOwner(false);
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.message);
      setUser(null);
      setToken(null);
      setIsOwner(false);
      localStorage.removeItem("token");
      navigate("/");
    }
  }, [token, navigate]);

  // 🚘 Fetch All Cars
  const fetchCars = async () => {
    try {
      
      const { data } = await axios.get("/api/user/cars");

      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message || "Failed to fetch cars");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // 🚪 Logout
  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        setUser(null);
        setToken(null);
        setIsOwner(false);
        localStorage.removeItem("token");
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["Authorization"] = `${token}`;
      fetchUser();
    } else {
      delete axios.defaults.headers.common["Authorization"];
      setIsOwner(false);
    }
    fetchCars();
  }, [token, fetchUser]);

  const value = {
    navigate,
    currency,
    axios,
    user,
    setUser,
    token,
    setToken,
    isOwner,
    setIsOwner,
    fetchUser,
    showLogin,
    setShowLogin,
    logout,
    fetchCars,
    cars,
    setCars,
    pickupDate,
    setPickupDate,
    returnDate,
    setReturnDate,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
