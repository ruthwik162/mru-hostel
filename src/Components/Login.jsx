import React, { useState } from "react";
import { useAppContext } from "../AppContext/AppContext";
import { assets } from "../assets/assets";
import { FiEye, FiEyeOff, FiMail, FiLock, FiUser, FiPhone, FiCamera, FiX } from "react-icons/fi";

const Login = () => {
  const [state, setState] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",
    role: "user",
  });
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const { setShowUserLogin, register, login } = useAppContext();
  const { username, email, password, mobile, gender, role } = data;

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (state === "register") {
      if (!username) newErrors.username = "Full name is required";
      if (!mobile) newErrors.mobile = "Mobile number is required";
      if (!gender) newErrors.gender = "Please select a gender";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate image size and type
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, image: "Image size should be less than 2MB" });
        return;
      }
      if (!file.type.match("image.*")) {
        setErrors({ ...errors, image: "Please select an image file" });
        return;
      }

      setImage(file);
      setImagePreview(URL.createObjectURL(file));
      setErrors({ ...errors, image: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (state === "register") {
        const formData = new FormData();
        formData.append("username", username);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("mobile", mobile);
        formData.append("gender", gender);
        formData.append("role", role);
        if (image) formData.append("image", image);

        await register(formData);

        setData({
          username: "",
          email: "",
          password: "",
          mobile: "",
          gender: "",
          role: "user",
        });
        setImage(null);
        setImagePreview(null);
        setState("login");
      } else {
        await login(email, password);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      // Handle API errors here
      setErrors({ ...errors, api: error.message || "An error occurred. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setState(state === "login" ? "register" : "login");
    setData({
      username: "",
      email: "",
      password: "",
      mobile: "",
      gender: "",
      role: "user",
    });
    setImage(null);
    setImagePreview(null);
    setErrors({});
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed inset-0 z-[999] bg-black/50 flex items-center justify-center backdrop-blur-sm px-4"
    >
      <div className="bg-white rounded-xl shadow-lg overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left Side - Welcome Section */}
        <div className="hidden md:block bg-indigo-600   flex-col items-center justify-center text-center md:w-1/2">
          <img 
            src={assets.mrulogo} 
            alt="MRU Logo" 
            className="h-5 w-auto md:w-24 md:h-24 object-contain mb-4"
          />
          <h1 className="md:text-3xl text-[1vw] text-white font-bold mb-4">
            Welcome to <span className="text-yellow-300">MRU</span>   
          </h1>
          <p className="text-indigo-100 mb-6">
            {state === "login" 
              ? "Login to access your account" 
              : "Create an account to get started"}
          </p>
          <img
            src={assets.welcome}
            className="h-64 md:h-120 w-auto object-contain"
            alt="Welcome illustration"
          />
        </div>

        {/* Right Side - Form Section */}
        <div  className={`${state === "login" ? "md:py-45 py-5" : "md:py-10 py-2"} p-8 md:w-1/2  flex flex-col    relative`}>
          <button
            type="button"
            onClick={() => setShowUserLogin(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close login"
          >
            <FiX size={24} />
          </button>

          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {state === "login" ? "Login" : "Sign Up"}
            </h2>
            <p className="text-gray-500 mt-1">
              {state === "login" 
                ? "Enter your credentials to continue" 
                : "Fill in your details to register"}
            </p>
          </div>

          {errors.api && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
              {errors.api}
            </div>
          )}

          <form onSubmit={handleSubmit} onClick={(e) => e.stopPropagation()}>
            {state === "register" && (
              <>
              
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <FiUser />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={username}
                      onChange={handleChange}
                      placeholder="Username"
                      className={`w-full border ${errors.username ? 'border-red-300' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.username && (
                    <p className="text-red-500 text-xs mt-1">{errors.username}</p>
                  )}
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mobile Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <FiPhone />
                    </div>
                    <input
                      type="tel"
                      name="mobile"
                      value={mobile}
                      onChange={handleChange}
                      placeholder="Mobile Number"
                      className={`w-full border ${errors.mobile ? 'border-red-300' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                    />
                  </div>
                  {errors.mobile && (
                    <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
                  )}
                </div>

                <div className="grid flex-col  gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Gender
                    </label>
                    <div className="flex  flex-row space-y-1 space-x-1 ">
                      {["male", "female", "other"].map((g) => (
                        <label key={g} className="flex items-center text-sm">
                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            onChange={handleChange}
                            checked={gender === g}
                            className="mr-2 text-indigo-600 focus:ring-indigo-500"
                          />
                          {g.charAt(0).toUpperCase() + g.slice(1)}
                        </label>
                      ))}
                    </div>
                    {errors.gender && (
                      <p className="text-red-500 text-xs mt-1">{errors.gender}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Role
                    </label>
                    <div className="flex flex-row space-x-1 space-y-2">
                      {["user", "admin"].map((r) => (
                        <label key={r} className="flex items-center justify-center text-sm">
                          <input
                            type="radio"
                            name="role"
                            value={r}
                            onChange={handleChange}
                            checked={role === r}
                            className="mr-2 text-indigo-600 focus:ring-indigo-500"
                          />
                          {r.charAt(0).toUpperCase() + r.slice(1)}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Email */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FiMail />
                </div>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className={`w-full border ${errors.email ? 'border-red-300' : 'border-gray-300'} rounded-lg pl-10 pr-4 py-2 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Password */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                  <FiLock />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={`w-full border ${errors.password ? 'border-red-300' : 'border-gray-300'} rounded-lg pl-10 pr-10 py-2 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-indigo-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {state === "login" && (
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  className="text-sm text-indigo-600 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-4 rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors font-medium flex items-center justify-center ${
                isSubmitting ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Processing...
                </>
              ) : (
                state === "login" ? "Sign In" : "Create Account"
              )}
            </button>

            <div className="mt-4 text-center text-sm text-gray-500">
              {state === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={resetForm}
                className="text-indigo-600 hover:underline font-medium"
              >
                {state === "login" ? "Sign up" : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;