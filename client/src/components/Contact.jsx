import React, { useState } from "react";
import "../styles/contact.css";
import toast from "react-hot-toast";

const Contact = () => {
  const [formDetails, setFormDetails] = useState({
    name: "",
    email: "",
    message: "",
  });

  const inputChange = (e) => {
    const { name, value } = e.target;
    return setFormDetails({
      ...formDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://formspree.io/f/xzblngyk", {
      method: "POST",
      body: JSON.stringify(formDetails),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      toast.success("Message send successfully!");
      setFormDetails({
        name: "",
        email: "",
        message: "",
      });
    } else {
      toast.error("Failed to send message");
    }
  };

  return (
    <section className="my-[2rem]" id="contact">
      <h2 className="page-heading pb-[2rem]">Contact Us</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 place-items-center w-full md:w-[90%] mx-auto bg-white shadow-2xl">
        <form
          onSubmit={handleSubmit}
          className="md:col-span-3 p-[3rem] flex flex-col w-full gap-[5px]"
        >
          <h2 className="text-[24px] font-[600] opacity-70">Get in Touch</h2>
          <label htmlFor="" className="text-[16px] font-[600] mt-[10px]">
            Full Name
          </label>
          <input
            type="text"
            name="name"
            required
            className="p-[10px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
            placeholder="Enter your name"
            value={formDetails.name}
            onChange={inputChange}
          />

          <label htmlFor="" className="text-[16px] font-[600] mt-[10px]">
            Email
          </label>
          <input
            type="email"
            name="email"
            required
            className="p-[10px] outline-none border-b-2 border-b-gray-300 focus:border-b-[--darker-blue]"
            placeholder="Enter your email"
            value={formDetails.email}
            onChange={inputChange}
          />

          <label htmlFor="" className="text-[16px] font-[600] mt-[10px]">
            Message
          </label>
          <textarea
            required
            type="text"
            name="message"
            className="p-[10px] outline-none border-b-2 border-b-gray-300 bg-transparent resize-none focus:border-b-[--darker-blue]"
            placeholder="Enter your message"
            value={formDetails.message}
            onChange={inputChange}
            rows="8"
            cols="12"
          ></textarea>

          <button type="submit" className="btn w-fit">
            Send Message
          </button>
        </form>

        <div className="w-full h-full md:col-span-2 hidden md:flex justify-center items-center">
          <img
            src="/contact.png"
            alt=""
            className="hover:scale-105 transition-all duration-500"
          />
        </div>
      </div>
    </section>
  );
};

export default Contact;
