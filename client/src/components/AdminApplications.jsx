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

const AdminApplications = () => {
  const [applications, setApplications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllApp = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/doctor/getnotdoctors`);
      setApplications(temp);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const acceptUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to accept?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/acceptdoctor",
            { id: userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId },
            }
          ),
          {
            success: "Application accepted",
            error: "Unable to accept application",
            loading: "Accepting application...",
          }
        );
        getAllApp();
      }
    } catch (error) {
      console.error("Error accepting application:", error);
    }
  };

  const rejectUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to reject?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/rejectdoctor",
            { id: userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
              data: { userId },
            }
          ),
          {
            success: "Application rejected",
            error: "Unable to reject application",
            loading: "Rejecting application...",
          }
        );
        getAllApp();
      }
    } catch (error) {
      console.error("Error rejecting application:", error);
    }
  };

  useEffect(() => {
    getAllApp();
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    {
      field: "pic",
      headerName: "Pic",
      renderCell: (params) => (
        <img
          className="user-table-pic"
          src={
            params.row.userId?.pic ||
            "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
          }
          alt={params.row.userId?.firstname}
        />
      ),
      width: 100,
    },
    { field: "firstname", headerName: "First Name" },
    { field: "lastname", headerName: "Last Name" },
    { field: "email", headerName: "Email" },
    { field: "mobile", headerName: "Mobile No." },
    { field: "experience", headerName: "Experience" },
    { field: "specialization", headerName: "Specialization" },
    { field: "fees", headerName: "Fees" },
    {
      field: "actions",
      headerName: "Action",
      width: 200,
      renderCell: (params) => (
        <div className="select">
          <button
            className="btn user-btn accept-btn"
            onClick={() => acceptUser(params.row.userId?._id)}
          >
            Accept
          </button>
          <button
            className="btn user-btn"
            onClick={() => rejectUser(params.row.userId?._id)}
          >
            Reject
          </button>
        </div>
      ),
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="w-full min-h-screen px-[10px] overflow-x-scroll">
          <h3 className="home-sub-heading my-[1rem]">All Applications</h3>
          {applications.length > 0 ? (
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={applications.map((ele, index) => ({
                  id: index + 1,
                  userId: ele.userId,
                  pic: ele.userId?.pic,
                  firstname: ele.userId?.firstname,
                  lastname: ele.userId?.lastname,
                  email: ele.userId?.email,
                  mobile: ele.userId?.mobile,
                  experience: ele.experience,
                  specialization: ele.specialization,
                  fees: ele.fees,
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

export default AdminApplications;
