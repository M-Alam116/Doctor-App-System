import React from "react";
import ServicesCard from "./ServicesCard";

const ServicesData = [
  {
    id: 1,
    image: "/s1.jpg",
    title: "Prenatal/New-Born",
    description: "Guided care from pregnancy to parenthood, ensuring a seamless and joyous journey.",
  },
  {
    id: 2,
    image: "/s2.jpg",
    title: "Vaccinations",
    description: "Safeguard your loved ones with tailored immunization plans and expert consultations.",
  },
  {
    id: 3,
    image: "/s3.jpg",
    title: "New-Born Examinate",
    description: "Thorough checkups and developmental tracking for a healthy start in life.",
  },
  {
    id: 4,
    image: "/s4.jpg",
    title: "Blood Tests",
    description: "Precise diagnostics for informed health decisions, with swift and accurate results.",
  },
  {
    id: 5,
    image: "/s5.jpg",
    title: "Diagnostic Tests",
    description: "State-of-the-art diagnostics, from radiology services to comprehensive health assessments.",
  },
  {
    id: 6,
    image: "/s6.jpg",
    title: "Home Visits",
    description: "Personalized healthcare brought to your doorstep, ensuring well-being in the comfort of home",
  },
];

const Services = () => {
  return (
    <>
      <section className="container">
        <h1 className="page-heading">Our Services</h1>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-[1rem] mt-[2rem]">
          {ServicesData.map((data) => (
            <ServicesCard key={data.id} data={data} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Services;
