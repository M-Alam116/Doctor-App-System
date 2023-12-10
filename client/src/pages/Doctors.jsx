import React, { useEffect, useState } from "react";
import DoctorCard from "../components/DoctorCard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import fetchData from "../helper/apiCall";
import Loading from "../components/Loading";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";
import Empty from "../components/Empty";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const fetchAllDocs = async () => {
    dispatch(setLoading(true));
    const data = await fetchData(`/doctor/getalldoctors`);
    setDoctors(data);
    dispatch(setLoading(false));
  };

  useEffect(() => {
    fetchAllDocs();
  }, []);

  return (
    <>
      <Navbar />
      {loading && <Loading />}
      {!loading && (
        <section className="container">
          <h2 className="page-heading">Our Doctors</h2>
          {doctors.length > 0 ? (
            <div className="mt-[2rem] w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 place-items-center gap-[2rem]">
              {doctors.map((ele) => {
                return <DoctorCard ele={ele} key={ele._id} />;
              })}
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
      <Footer />
    </>
  );
};

export default Doctors;
