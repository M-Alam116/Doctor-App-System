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
        <div className="flex flex-col gap-[1rem]">
          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Latest Diagnostics And Technology
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              Experience cutting-edge diagnostics with state-of-the-art
              technology, ensuring precise health assessments and informed
              decision-making for your well-being.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Immunisation Clinic
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              Step into our Immunization Clinic, where personalized vaccination
              plans meet expert consultations, ensuring optimal protection for
              you and your loved ones.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Full Breadth Of Pediatric Care
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              From routine check-ups to specialized treatments, our pediatric
              care encompasses the full spectrum, ensuring comprehensive and
              compassionate healthcare for your child.
            </p>
          </div>

          <div className="flex flex-col gap-[10px] w-full lg:w-[90%] p-[1rem] rounded-[10px] hover:mt-[-10px] hover:shadow-2xl transition-all duration-300">
            <h2 className="text-[22px] font-[600] opacity-70 leading-[24px]">
              Pediatric Theatres On Every Ward
            </h2>
            <p className="text-[16px] font-[500] opacity-50 leading-[20px]">
              We prioritize safety and efficiency with dedicated pediatric
              theatres on every ward, ensuring swift and specialized medical
              care for our young patients.
            </p>
          </div>
        </div>
      </div>
      <HomeCircles />
    </div>
  );
};

export default WhyChooseUs;
