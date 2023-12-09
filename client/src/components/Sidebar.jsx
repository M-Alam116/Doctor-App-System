import React from "react";
import {
  FaHome,
  FaList,
  FaUser,
  FaUserMd,
  FaUsers,
  FaEnvelope,
} from "react-icons/fa";
import "../styles/sidebar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sidebar = [
    {
      name: "Home",
      path: "/",
      icon: <FaHome />,
    },
    {
      name: "Users",
      path: "/dashboard/users",
      icon: <FaUsers />,
    },
    {
      name: "Doctors",
      path: "/dashboard/doctors",
      icon: <FaUserMd />,
    },
    {
      name: "Appointments",
      path: "/dashboard/appointments",
      icon: <FaList />,
    },
    {
      name: "Applications",
      path: "/dashboard/applications",
      icon: <FaEnvelope />,
    },
    {
      name: "Profile",
      path: "/profile",
      icon: <FaUser />,
    },
  ];

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <section className="sidebar-section flex-center">
        <div className="sidebar-container">
          <ul>
            {sidebar.map((ele, i) => {
              return (
                <NavLink to={ele.path}>
                  <li
                    key={i}
                    className="text-[18px] font-[500] flex items-center gap-[10px]"
                  >
                    <figure className="text-[24px]">{ele.icon}</figure>
                    <p className="hidden md:block">{ele.name}</p>
                  </li>
                </NavLink>
              );
            })}
          </ul>
          <div className="logout-container" onClick={logoutFunc}>
            <MdLogout className="text-[24px]" />
            <p className="hidden md:block">Logout</p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
