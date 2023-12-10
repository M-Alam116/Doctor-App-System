import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import fetchData from "../helper/apiCall";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import axios from "axios";
import toast from "react-hot-toast";
import "../styles/user.css";

const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);
  const { userId } = jwt_decode(localStorage.getItem("token"));

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    {
      field: "doctorName",
      headerName: "Doctor",
      valueGetter: (params) =>
        `${params.row.doctorId?.firstname || ""} ${
          params.row.doctorId?.lastname || ""
        }`,
      flex: 1,
    },
    {
      field: "patientName",
      headerName: "Patient",
      valueGetter: (params) =>
        `${params.row.userId?.firstname || ""} ${
          params.row.userId?.lastname || ""
        }`,
      flex: 1,
    },
    { field: "date", headerName: "Appointment Date", flex: 1 },
    { field: "time", headerName: "Appointment Time", flex: 1 },
    { field: "createdAt", headerName: "Booking Date", flex: 1 },
    {
      field: "updatedAt",
      headerName: "Booking Time",
      valueGetter: (params) => params.row.updatedAt.split("T")[1].split(".")[0],
      flex: 1,
    },
    { field: "status", headerName: "Status", flex: 1 },
    {
      field: "action",
      headerName: "Action",
      renderCell: (params) => (
        <button
          className={`btn user-btn accept-btn ${
            params.row.status === "Completed" ? "disable-btn" : ""
          }`}
          disabled={params.row.status === "Completed"}
          onClick={() => complete(params.row)}
        >
          Complete
        </button>
      ),
      flex: 1,
    },
  ];

  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(
        `/appointment/getallappointments?search=${userId}`
      );
      setAppointments(
        temp.map((ele, index) => ({
          id: ele._id,
          doctorId: ele.doctorId,
          userId: ele.userId,
          date: ele.date,
          time: ele.time,
          createdAt: ele.createdAt.split("T")[0],
          updatedAt: ele.updatedAt,
          status: ele.status,
        }))
      );
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAllAppoint();
  }, [dispatch, userId]);

  const complete = async (row) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: row.id,
            doctorId: row.doctorId?._id,
            doctorname: `${row.userId?.firstname} ${row.userId?.lastname}`,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        ),
        {
          success: "Appointment booked successfully",
          error: "Unable to book appointment",
          loading: "Booking appointment...",
        }
      );

      getAllAppoint();
    } catch (error) {
      return error;
    }
  };

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full min-h-screen px-[10px] overflow-x-scroll">
          <h1 className="py-[2rem] text-center text-[34px] font-[700] opacity-70 leading-[40px]">
            Your Appointments
          </h1>
          {appointments.length > 0 ? (
            <DataGrid
              rows={appointments}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              slots={{ toolbar: GridToolbar }}
              slotProps={{
                toolbar: {
                  showQuickFilter: true,
                  quickFilterProps: { debounceMs: 500 },
                },
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              disableColumnFilter
              disableDensitySelector
              disableColumnSelector
            />
          ) : (
            <Empty />
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Appointments;
