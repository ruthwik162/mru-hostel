import React, { useState } from "react";
import { useAppContext } from "../AppContext/AppContext";

const Login = () => {
  const [state, setState] = useState("login");
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    mobile: "",
    gender: "",     // ⬅️ Added gender
    role: "user",
  });
  const [showPassword, setShowPassword] = useState(false);

  const { setShowUserLogin, register, login } = useAppContext();
  const { username, email, password, mobile, gender, role } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (state === "register") {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("mobile", mobile);
      formData.append("gender", gender);   // ⬅️ Include gender
      formData.append("role", role);

      await register(formData);
      setData({ username: "", email: "", password: "", mobile: "", gender: "", role: "user" });
      setState("login");
      return;
    }

    await login(email, password);
  };

  return (
    <div
      onClick={() => setShowUserLogin(false)}
      className="fixed top-0 bottom-0 left-0 right-0 flex items-center text-sm text-gray-600 z-999 bg-black/50"
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col gap-4 m-auto items-start p-8 py-12 w-80 sm:w-[352px] rounded-lg shadow-xl border border-gray-200 bg-white"
      >
        <p className="text-2xl font-medium m-auto">
          <span className="text-indigo-500">User</span> {state === "login" ? "Login" : "Sign Up"}
        </p>

        {state === "register" && (
          <>
            <div className="w-full">
              <p>Name</p>
              <input
                onChange={handleChange}
                name="username"
                value={username}
                placeholder="Your name"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                type="text"
                required
              />
            </div>

            <div className="w-full">
              <p>Mobile</p>
              <input
                onChange={handleChange}
                name="mobile"
                value={mobile}
                placeholder="Your mobile number"
                className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
                type="text"
                required
              />
            </div>

            <div className="w-full">
              <p>Gender</p>
              <label className="mr-4">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="gender"
                  value="male"
                  checked={gender === "male"}
                />{" "}
                Male
              </label>
              <label className="mr-4">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                />{" "}
                Female
              </label>
              <label>
                <input
                  onChange={handleChange}
                  type="radio"
                  name="gender"
                  value="other"
                  checked={gender === "other"}
                />{" "}
                Other
              </label>
            </div>

            <div className="w-full">
              <p>Role</p>
              <label className="mr-4">
                <input
                  onChange={handleChange}
                  type="radio"
                  name="role"
                  value="user"
                  checked={role === "user"}
                />{" "}
                User
              </label>
              <label>
                <input
                  onChange={handleChange}
                  type="radio"
                  name="role"
                  value="admin"
                  checked={role === "admin"}
                />{" "}
                Admin
              </label>
            </div>
          </>
        )}

        <div className="w-full">
          <p>Email</p>
          <input
            onChange={handleChange}
            name="email"
            value={email}
            placeholder="Your email"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            type="email"
            required
          />
        </div>

        <div className="w-full">
          <p>Password</p>
          <input
            type={showPassword ? "text" : "password"}
            onChange={handleChange}
            name="password"
            value={password}
            placeholder="Your password"
            className="border border-gray-200 rounded w-full p-2 mt-1 outline-indigo-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-blue-600 mt-1"
          >
            {showPassword ? "Hide" : "Show"} Password
          </button>
        </div>

        <p className="text-sm">
          {state === "register" ? (
            <>
              Already have an account?{" "}
              <span
                onClick={() => setState("login")}
                className="text-indigo-500 cursor-pointer"
              >
                Login
              </span>
            </>
          ) : (
            <>
              Need an account?{" "}
              <span
                onClick={() => setState("register")}
                className="text-indigo-500 cursor-pointer"
              >
                Sign up
              </span>
            </>
          )}
        </p>

        <button className="bg-indigo-500 hover:bg-indigo-600 transition-all text-white w-full py-2 rounded-md cursor-pointer">
          {state === "register" ? "Sign Up" : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
