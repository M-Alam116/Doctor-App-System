import React from "react";

const ServicesCard = ({ data }) => {
  const { image, title, description } = data;

  return (
    <div className="w-full sm:w-[370px] hover:rounded-[20px] hover:shadow-2xl p-[10px] hover:mt-[-8px] group transition-all duration-300">
      <div className="grid grid-cols-1 sm:grid-cols-5 place-items-center gap-[15px] p-[20px] group-hover:border-[2px] group-hover:border-dotted group-hover:border-[--darker-blue] group-hover:rounded-[10px] transition-all duration-300">
        <div className="sm:col-span-2 w-full flex items-center justify-center">
          <img
            src={image}
            alt=""
            className="w-[120px] h-[120px] rounded-full"
          />
        </div>
        <div className="sm:col-span-3 flex flex-col items-center justify-center gap-[10px] w-full">
          <h1 className="text-[22px] font-[600] opacity-80 leading-[25px] text-center">
            {title}
          </h1>
          <p className="text-[14px] font-[600] opacity-50 leading-[17px] text-center">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ServicesCard;
