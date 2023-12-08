import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import jwt_decode from "jwt-decode";
import fetchData from "../helper/apiCall";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Login() {
  const dispatch = useDispatch();
  const [formDetails, setFormDetails] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();
      const { email, password } = formDetails;
      if (!email || !password) {
        return toast.error("Input field should not be empty");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      }

      const { data } = await toast.promise(
        axios.post("/user/login", {
          email,
          password,
        }),
        {
          pending: "Logging in...",
          success: "Login successfully",
          error: "Unable to login user",
          loading: "Logging user...",
        }
      );
      localStorage.setItem("token", data.token);
      dispatch(setUserInfo(jwt_decode(data.token).userId));
      getUser(jwt_decode(data.token).userId);
    } catch (error) {
      return error;
    }
  };

  const getUser = async (id) => {
    try {
      const temp = await fetchData(`/user/getuser/${id}`);
      dispatch(setUserInfo(temp));
      return navigate("/");
    } catch (error) {
      return error;
    }
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
      <div className="loginBg w-full min-h-screen hidden lg:flex"></div>
      <div className="w-full min-h-screen flex flex-col justify-center items-center px-[10px]">
        <h2 className="page-heading">Sign In</h2>
        <form
          onSubmit={formSubmit}
          className="flex flex-col gap-[2rem] w-full sm:w-[80%] mx-auto mt-[2rem]"
        >
          <input
            type="email"
            name="email"
            className="p-[15px] outline-none border-b-2 border-b-gray-300 bg-transparent resize-none focus:border-b-[--darker-blue] focus:bg-[--light-blue]"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />
          <input
            type="password"
            name="password"
            className="p-[15px] outline-none border-b-2 border-b-gray-300 bg-transparent resize-none focus:border-b-[--darker-blue] focus:bg-[--light-blue]"
            placeholder="Enter your password"
            value={formDetails.password}
            onChange={inputChange}
          />
          <button
            type="submit"
            className="flex mx-auto mt-[1rem] bg-[#ff4b2b] w-[140px] p-[12px] rounded-full text-white text-[16px] justify-center font-[600]"
          >
            Sign in
          </button>
        </form>
        <p className="text-[16px] font-[500] mt-[2rem] text-center leading-[20px]">
          Not have an account?{" "}
          <NavLink className="text-[--darker-blue]" to={"/register"}>
            Register
          </NavLink>
        </p>
        <NavLink to={"/"}>
          <button className="bg-[#ff4b2b] w-[100px] p-[10px] rounded-md text-white text-[14px] font-[600] mt-[1rem]">
            Home
          </button>
        </NavLink>
      </div>
    </section>
  );
}

export default Login;
