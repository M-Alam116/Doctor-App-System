import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/register.css";
import axios from "axios";
import toast from "react-hot-toast";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;
function Register() {
  const [file, setFile] = useState("");
  const [loading, setLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confpassword: "",
  });
  const navigate = useNavigate();

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const onUpload = async (element) => {
    setLoading(true);
    if (
      element.type === "image/jpeg" ||
      element.type === "image/png" ||
      element.type === "image/jpg"
    ) {
      const data = new FormData();
      data.append("file", element);
      data.append("upload_preset", process.env.REACT_APP_CLOUDINARY_PRESET);
      data.append("cloud_name", process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
      fetch(
        `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      )
        .then((res) => res.json())
        .then((data) => setFile(data.url.toString()));
      setLoading(false);
    } else {
      setLoading(false);
      toast.error("Please select an image in jpeg or png format");
    }
  };

  const formSubmit = async (e) => {
    try {
      e.preventDefault();

      if (loading) return;
      if (file === "") return;

      const { firstname, lastname, email, password, confpassword } =
        formDetails;
      if (!firstname || !lastname || !email || !password || !confpassword) {
        return toast.error("Input field should not be empty");
      } else if (firstname.length < 3) {
        return toast.error("First name must be at least 3 characters long");
      } else if (lastname.length < 3) {
        return toast.error("Last name must be at least 3 characters long");
      } else if (password.length < 5) {
        return toast.error("Password must be at least 5 characters long");
      } else if (password !== confpassword) {
        return toast.error("Passwords do not match");
      }

      await toast.promise(
        axios.post("/user/register", {
          firstname,
          lastname,
          email,
          password,
          pic: file,
        }),
        {
          pending: "Registering user...",
          success: "User registered successfully",
          error: "Unable to register user",
          loading: "Registering user...",
        }
      );

      return navigate("/login");
    } catch (error) {}
  };

  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 min-h-screen w-full">
      <div className="signupBg w-full min-h-screen hidden lg:flex"></div>
      <div className="w-full min-h-screen flex flex-col justify-center items-center px-[10px] py-[3rem]">
        <h2 className="page-heading">Sign Up</h2>
        <form
          onSubmit={formSubmit}
          className="flex flex-col gap-[2rem] w-full sm:w-[80%] mx-auto mt-[2rem]"
        >
          <input
            type="text"
            name="firstname"
            className="p-[15px] outline-none border-b-2 border-b-gray-300 bg-transparent resize-none focus:border-b-[--darker-blue] focus:bg-[--light-blue]"
            placeholder="Enter your first name"
            value={formDetails.firstname}
            onChange={inputChange}
          />
          <input
            type="text"
            name="lastname"
            className="p-[15px] outline-none border-b-2 border-b-gray-300 bg-transparent resize-none focus:border-b-[--darker-blue] focus:bg-[--light-blue]"
            placeholder="Enter your last name"
            value={formDetails.lastname}
            onChange={inputChange}
          />
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
          <input
            type="password"
            name="confpassword"
            className="p-[15px] outline-none border-b-2 border-b-gray-300 bg-transparent resize-none focus:border-b-[--darker-blue] focus:bg-[--light-blue]"
            placeholder="Confirm your password"
            value={formDetails.confpassword}
            onChange={inputChange}
          />
          <input
            type="file"
            onChange={(e) => onUpload(e.target.files[0])}
            name="profile-pic"
            id="profile-pic"
            className="p-[15px] outline-none border-b-2 border-b-gray-300 bg-transparent resize-none focus:border-b-[--darker-blue] focus:bg-[--light-blue]"
          />
          <button
            type="submit"
            className="flex mx-auto mt-[1rem] bg-[#ff4b2b] w-[140px] p-[12px] rounded-full text-white text-[16px] justify-center font-[600]"
            disabled={loading ? true : false}
          >
            Sign up
          </button>
        </form>
        <p className="text-[16px] font-[500] mt-[2rem] text-center leading-[20px]">
          Already have an account?{" "}
          <NavLink className="text-[--darker-blue]" to={"/login"}>
            Log in
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

export default Register;
