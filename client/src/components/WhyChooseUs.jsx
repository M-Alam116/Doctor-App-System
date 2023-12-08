import React from "react";
import HomeCircles from "./HomeCircles";

const WhyChooseUs = () => {
  return (
    <div className="bg-[#f6f8ff] py-[2rem] px-[10px]">
      <h1 className="page-heading py-[1rem]">Why Choose Us</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center mt-[2rem] gap-[2rem] pb-[2rem]">
        <div className="hidden lg:flex">
          <img
            src="/why-choose-us.jpg"
            alt=""
            className="w-full rounded-[20px]"
          />
        </div>
        <div className="flex flex-col gap-[2rem]">
          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Latest Diagnostics And Technology
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              Porttitor Tempor Consequat Tristique Faucibus Netus Massa. Auctor
              Nibh Faucibus Felis Mauris Vitae. Morbi
            </p>
          </div>

          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Immunisation Clinic
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              Massa Donec Vivamus Ultrices Nascetur Velit Egestas. Augue
              Facilisis Sed At Mattis Ac Auctor A Feugiat Sed.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Full Breadth Of Paediatric Care
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              Erat Sed Ut Porta Ultrices. Tincidunt Vulputate Justo, Interdum
              Imperdiet Viverra In Non, Eu. In Tortor Odio In
            </p>
          </div>

          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Paediatric Theatres On Every Ward
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              Tincidunt Laoreet Ultricies Vulputate Congue Sagittis Dignissim
              Orci, Sapien Ridiculus. Magna Tincidunt Arcu A.
            </p>
          </div>
        </div>
      </div>
      <HomeCircles />
    </div>
  );
};

export default WhyChooseUs;
