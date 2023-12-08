import React, { useEffect, useState } from "react";
import "../styles/profile.css";
import axios from "axios";
import toast from "react-hot-toast";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import fetchData from "../helper/apiCall";
import jwt_decode from "jwt-decode";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

function Profile() {
  const { userId } = jwt_decode(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const [file, setFile] = useState("");
  const [formDetails, setFormDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    age: "",
    mobile: "",
    gender: "neither",
    address: "",
    password: "",
    confpassword: "",
  });

  const getUser = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/user/getuser/${userId}`);
      setFormDetails({
        ...temp,
        password: "",
        confpassword: "",
        mobile: temp.mobile === null ? "" : temp.mobile,
        age: temp.age === null ? "" : temp.age,
      });
      setFile(temp.pic);
      dispatch(setLoading(false));
    } catch (error) {}
  };

  useEffect(() => {
    getUser();
  }, [dispatch]);

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
      const {
        firstname,
        lastname,
        email,
        age,
        mobile,
        address,
        gender,
        password,
        confpassword,
      } = formDetails;

      if (!email) {
        return toast.error("Email should not be empty");
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
        axios.put(
          "/user/updateprofile",
          {
            firstname,
            lastname,
            age,
            mobile,
            address,
            gender,
            email,
            password,
          },
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          pending: "Updating profile...",
          success: "Profile updated successfully",
          error: "Unable to update profile",
          loading: "Updating profile...",
        }
      );

      setFormDetails({ ...formDetails, password: "", confpassword: "" });
    } catch (error) {
      return toast.error("Unable to update profile");
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <section className="py-[3rem] px-[10px]">
          <h2 className="page-heading">Profile</h2>
          <div className="grid grid-cols-1 md:grid-cols-6 mt-[2rem]">
            <div className="col-span-2 flex flex-col items-center">
              <img
                src={file}
                alt="profile"
                className="w-[170px] h-[170px] rounded-md"
              />
              <h2 className="text-[20px] font-[600] mt-[10px]">
                {formDetails.firstname + " " + formDetails.lastname}
              </h2>
              <p className="text-[14px] font-[500]">{formDetails.email}</p>
            </div>
            <form onSubmit={formSubmit} className="col-span-4 md:px-[3rem]">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-[2rem]">
                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    First Name
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    placeholder="Enter your first name"
                    value={formDetails.firstname}
                    onChange={inputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    placeholder="Enter your last name"
                    value={formDetails.lastname}
                    onChange={inputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    placeholder="Enter your email"
                    value={formDetails.email}
                    onChange={inputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formDetails.gender}
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    id="gender"
                    onChange={inputChange}
                  >
                    <option value="neither">Prefer not to say</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    Age
                  </label>
                  <input
                    type="text"
                    name="age"
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    placeholder="Enter your age"
                    value={formDetails.age}
                    onChange={inputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    Phone NO
                  </label>
                  <input
                    type="text"
                    name="mobile"
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    placeholder="Enter your mobile number"
                    value={formDetails?.mobile}
                    onChange={inputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    placeholder="Enter your password"
                    value={formDetails.password}
                    onChange={inputChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor=""
                    className="text-[16px] font-[600] mt-[10px]"
                  >
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confpassword"
                    className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
                    placeholder="Confirm your password"
                    value={formDetails.confpassword}
                    onChange={inputChange}
                  />
                </div>
              </div>

              <div className="flex flex-col mt-[2rem]">
                <label htmlFor="" className="text-[16px] font-[600] mt-[10px]">
                  Address
                </label>
                <textarea
                  type="text"
                  name="address"
                  className="p-[15px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue] resize-none"
                  placeholder="Enter your address"
                  value={formDetails.address}
                  onChange={inputChange}
                  rows="4"
                ></textarea>
              </div>

              <button type="submit" className="btn form-btn mt-[2rem]">
                update
              </button>
            </form>
          </div>
        </section>
      )}
      <Footer />
    </>
  );
}

export default Profile;
