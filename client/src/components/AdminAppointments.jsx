import React, { useState, useEffect } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";
import "../styles/user.css";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const AdminAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllAppoint = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/appointment/getallappointments`);
      setAppointments(temp);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    getAllAppoint();
  }, []);

  const complete = async (ele) => {
    try {
      await toast.promise(
        axios.put(
          "/appointment/completed",
          {
            appointid: ele?._id,
            doctorId: ele?.doctorId._id,
            doctorname: `${ele?.userId?.firstname} ${ele?.userId?.lastname}`,
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
      console.error("Error completing appointment:", error);
    }
  };

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    {
      field: "doctorName",
      headerName: "Doctor",
      valueGetter: (params) =>
        `${params.row.doctorId?.firstname} ${params.row.doctorId?.lastname}`,
      flex: 1,
    },
    {
      field: "patientName",
      headerName: "Patient",
      valueGetter: (params) =>
        `${params.row.userId?.firstname} ${params.row.userId?.lastname}`,
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
      field: "actions",
      headerName: "Action",
      width: 120,
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
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="w-full min-h-screen px-[10px] overflow-x-scroll">
          <h3 className="home-sub-heading my-[2rem]">All Appointments</h3>
          {appointments.length > 0 ? (
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={appointments.map((ele, index) => ({
                  id: index + 1,
                  doctorId: ele.doctorId,
                  userId: ele.userId,
                  date: ele.date,
                  time: ele.time,
                  createdAt: ele.createdAt.split("T")[0],
                  updatedAt: ele.updatedAt,
                  status: ele.status,
                }))}
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
            </div>
          ) : (
            <Empty />
          )}
        </section>
      )}
    </>
  );
};

export default AdminAppointments;
