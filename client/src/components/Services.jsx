import React from "react";
import ServicesCard from "./ServicesCard";

const ServicesData = [
  {
    id: 1,
    image: "/s1.jpg",
    title: "Prenatal/New-Born",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
  },
  {
    id: 2,
    image: "/s2.jpg",
    title: "Vaccinations",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
  },
  {
    id: 3,
    image: "/s3.jpg",
    title: "New-Born Examinate",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
  },
  {
    id: 4,
    image: "/s4.jpg",
    title: "Blood Tests",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
  },
  {
    id: 5,
    image: "/s5.jpg",
    title: "Diagnostic Tests",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
  },
  {
    id: 6,
    image: "/s6.jpg",
    title: "Home Visits",
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
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
