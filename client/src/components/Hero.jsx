import React from "react";
import "../styles/hero.css";
import { NavLink } from "react-router-dom";

const Hero = () => {
  return (
    <section className="hero px-[10px] md:min-h-screen mt-[-5px] pt-[4rem] pb-[5rem] grid grid-cols-1 md:grid-cols-2 gap-[2rem] place-items-center">
      <div className="flex flex-col gap-[1rem] w-full max-w-[600px] mt-[3rem] py-[5rem] md:py-0 z-[1]">
        <h1 className="text-[2.5rem] font-[600] leading-[30px] md:leading-[40px]">
          Your Health, <br />
          Our Responsibility
        </h1>
        <p className="text-[16px] md:text-[18px] font-[500] leading-[25px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          tenetur doloremque molestias repellat minus asperiores in aperiam
          dolor, quaerat praesentium.
        </p>

        <NavLink to={"/doctors"}>
          <button className="bg-white border-[2px] border-white hover:bg-transparent hover:text-white w-fit rounded-full px-[1.5rem] py-[12px] text-[14px] font-[400] transition-all duration-300">
            Request an Appointment
          </button>
        </NavLink>
      </div>

      <div className="hidden md:flex relative z-0">
        <div className="heart absolute z-[-1] left-[-180px] hidden md:flex">
          <img src="heart-image.png" alt="" className="w-[400px] h-auto" />
        </div>
        <img src="doctor-image.png" alt="" className="w-[460px] h-auto" />
      </div>
    </section>
  );
};

export default Hero;
