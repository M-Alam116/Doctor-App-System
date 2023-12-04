import React from "react";
import "../styles/hero.css";

const Hero = () => {
  return (
    <section className="hero px-[10px]">
      <div className="flex flex-col gap-[1rem] w-full max-w-[600px] mt-[3rem]">
        <h1 className="text-[2.5rem] font-[600] leading-[40px]">
          Your Health, <br />
          Our Responsibility
        </h1>
        <p className="text-[20px] font-[500] leading-[25px]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
          tenetur doloremque molestias repellat minus asperiores in aperiam
          dolor, quaerat praesentium.
        </p>
        <button className="bg-[--darker-blue] w-fit rounded-full px-[1.5rem] py-[12px] text-white text-[14px] font-[400]">
          Request an Appointment
        </button>
      </div>
    </section>
  );
};

export default Hero;
