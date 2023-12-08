import React from "react";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import Services from "../components/Services";
import WhyChooseUs from "../components/WhyChooseUs";
import Review from "../components/Review";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <WhyChooseUs />
      <Review />
      <Contact />
      <Footer />
    </>
  );
};

export default Home;
