import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showUserLogin, setShowUserLogin] = useState(false);

  // Fetch user from sessionStorage or localStorage when the app starts
  useEffect(() => {
    const sessionUser = sessionStorage.getItem("user");
    if (sessionUser) {
      setUser(JSON.parse(sessionUser));
    } else {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        setUser(JSON.parse(localUser));
      }
    }
  }, []);

  // Register User
  const register = async (formData) => {
    try {
      await axios.post("http://localhost:8087/user/register", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success("Registration successful! Please log in.");
      navigate("/");
      setShowUserLogin(true)
    } catch (error) {
      console.error("Registration error:", error.response);
      toast.error(error.response?.data?.message || "Error registering user.");
    }
  };

  // Login User (No profile fetching after login)
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://localhost:8087/user/login", {
        email,
        password,
      }, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
  
      if (response.status === 200) {
        const user = response.data;
  
        if (!user || !user.id) {
          toast.error("Login failed: Invalid user data");
          return;
        }
  
        const userDetails = {
          id: user.id,
          username: user.username,
          email: user.email,
          mobile: user.mobile,
          role: user.role,
          gender: user.gender,
        };
  
        localStorage.setItem("user", JSON.stringify(userDetails));
        sessionStorage.setItem("user", JSON.stringify(userDetails));
        setUser(userDetails);
  
        toast.success("Logged in successfully!");
        navigate(user.role === "admin" ? "/adminhome" : "/");
        setShowUserLogin(false)
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed.");
    }
  };
  
  

  // Logout User
  const logout = () => {
    sessionStorage.removeItem("user");
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully!");
    navigate("/");
  };

  // Value to be provided in context
  const values = {
    user,
    setUser,
    showUserLogin,
    setShowUserLogin,
    register,
    login,
    logout,
    navigate,
  };

  return <AppContext.Provider value={values}>{children}</AppContext.Provider>;
};

// Custom hook to use AppContext
export const useAppContext = () => useContext(AppContext);
