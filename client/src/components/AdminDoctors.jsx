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

const AdminDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const getAllDoctors = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData(`/doctor/getalldoctors`);
      setDoctors(temp);
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(
          axios.put(
            "/doctor/deletedoctor",
            { userId },
            {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          ),
          {
            success: "Doctor deleted successfully",
            error: "Unable to delete Doctor",
            loading: "Deleting Doctor...",
          }
        );
        getAllDoctors();
      }
    } catch (error) {
      console.error("Error deleting doctor:", error);
    }
  };

  useEffect(() => {
    getAllDoctors();
  }, []);

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    {
      field: "pic",
      headerName: "Pic",
      renderCell: (params) => (
        <img
          className="user-table-pic"
          src={params.row.userId?.pic}
          alt={params.row.userId?.firstname}
        />
      ),
      width: 100,
    },
    { field: "firstname", headerName: "First Name", flex: 1 },
    { field: "lastname", headerName: "Last Name", flex: 1 },
    { field: "email", headerName: "Email", flex: 1 },
    { field: "mobile", headerName: "Mobile No.", flex: 1 },
    { field: "experience", headerName: "Experience", flex: 1 },
    { field: "specialization", headerName: "Specialization", flex: 1 },
    { field: "fees", headerName: "Fees", flex: 1 },
    {
      field: "remove",
      headerName: "Remove",
      width: 120,
      renderCell: (params) => (
        <button
          className="btn user-btn"
          onClick={() => deleteUser(params.row.userId?._id)}
        >
          Remove
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
          <h3 className="home-sub-heading">All Doctors</h3>
          {doctors.length > 0 ? (
            <div style={{ height: 500, width: "100%" }}>
              <DataGrid
                rows={doctors.map((ele, index) => ({
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

export default AdminDoctors;
