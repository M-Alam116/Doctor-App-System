import React from "react";
import "../styles/footer.css";
import { FaFacebookF, FaYoutube, FaInstagram } from "react-icons/fa";
import { HashLink } from "react-router-hash-link";
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-[#181717] py-[2rem] px-[10px]">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-[2rem] justify-evenly">
          <div className="">
            <h3 className="text-[20px] font-[600] text-white mb-[1rem]">
              Links
            </h3>
            <ul className="text-white flex flex-col gap-[5px]">
              <li className="text-[14px] font-[400]">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="text-[14px] font-[400]">
                <NavLink to={"/doctors"}>Doctors</NavLink>
              </li>
              <li className="text-[14px] font-[400]">
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>
              <li className="text-[14px] font-[400]">
                <NavLink to={"/notifications"}>Notifications</NavLink>
              </li>
              <li className="text-[14px] font-[400]">
                <HashLink to={"/#contact"}>Contact Us</HashLink>
              </li>
              <li className="text-[14px] font-[400]">
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </ul>
          </div>
          <div className="social">
            <h3 className="text-[20px] font-[600] text-white mb-[1rem]">
              Social links
            </h3>
            <ul>
              <li className="facebook">
                <a
                  href="https://www.facebook.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaFacebookF />
                </a>
              </li>
              <li className="youtube">
                <a
                  href="https://www.youtube.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaYoutube />
                </a>
              </li>
              <li className="instagram">
                <a
                  href="https://www.instagram.com/"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  <FaInstagram />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="text-white text-center mt-[2rem]">
          Copyright © {new Date().getFullYear()} developed by Muhammad Alam all
          right reserved.
        </div>
      </footer>
    </>
  );
};

export default Footer;
