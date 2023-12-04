import React, { useState } from "react";
import BookAppointment from "../components/BookAppointment";
import { toast } from "react-hot-toast";

const DoctorCard = ({ ele }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const handleModal = () => {
    if (token === "") {
      return toast.error("You must log in first");
    }
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-[1rem] w-full max-w-[350px] rounded-[10px] bg-white shadow-2xl hover:mt-[-10px] transition-all duration-500">
      <div className="w-full overflow-hidden">
        <img
          src={
            ele?.userId?.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt="profile"
          className="w-full h-[250px] object-cover object-top rounded-t-[10px] hover:scale-105 hover:rounded-t-[35px] transition-all duration-500"
        />
      </div>
      <div className="flex flex-col gap-[10px] p-[10px] pb-[20px]">
        <h3 className="text-[20px] font-[700] bg-[--yellow] w-full text-center rounded-[5px] p-[7px]">
          Dr. {ele?.userId?.firstname + " " + ele?.userId?.lastname}
        </h3>

        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-[700] opacity-70">
            Specialization:{" "}
          </h2>
          <p className="text-[14px] font-[500] bg-[--darker-blue] w-[100px] text-center rounded-[5px] text-white p-[10px]">
            {ele?.specialization}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-[700] opacity-70">Experience: </h2>
          <p className="text-[14px] font-[500] bg-[--darker-blue] w-[100px] text-center rounded-[5px] text-white p-[10px]">
            {ele?.experience}yrs
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-[700] opacity-70">
            Fees per consultation:{" "}
          </h2>
          <p className="text-[14px] font-[500] bg-[--darker-blue] w-[100px] text-center rounded-[5px] text-white p-[10px]">
            $ {ele?.fees}
          </p>
        </div>

        <div className="flex items-center justify-between">
          <h2 className="text-[16px] font-[700] opacity-70">Phone: </h2>
          <p className="text-[14px] font-[500] bg-[--darker-blue] w-[100px] text-center rounded-[5px] text-white p-[10px]">
            {ele?.userId?.mobile ? ele?.userId?.mobile : "None"}
          </p>
        </div>

        <button className="btn mt-[1rem]" onClick={handleModal}>
          Book Appointment
        </button>
        {modalOpen && <BookAppointment setModalOpen={setModalOpen} ele={ele} />}
      </div>
    </div>
  );
};

export default DoctorCard;
