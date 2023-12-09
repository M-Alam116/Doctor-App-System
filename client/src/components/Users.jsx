import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Loading from "./Loading";
import { setLoading } from "../redux/reducers/rootSlice";
import { useDispatch, useSelector } from "react-redux";
import Empty from "./Empty";
import fetchData from "../helper/apiCall";

axios.defaults.baseURL = process.env.REACT_APP_SERVER_DOMAIN;

const Users = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    {
      field: "pic",
      headerName: "Pic",
      width: 100,
      renderCell: (params) => (
        <img
          className="user-table-pic"
          src={params.row.pic}
          alt={params.row.firstname}
        />
      ),
    },
    { field: "firstname", headerName: "First Name", width: 130 },
    { field: "lastname", headerName: "Last Name", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "mobile", headerName: "Mobile No.", width: 130 },
    { field: "age", headerName: "Age", width: 80 },
    { field: "gender", headerName: "Gender", width: 100 },
    { field: "isDoctor", headerName: "Is Doctor", width: 120 },
    {
      field: "remove",
      headerName: "Remove",
      width: 120,
      renderCell: (params) => (
        <button
          className="btn user-btn"
          onClick={() => deleteUser(params.row._id)}
        >
          Remove
        </button>
      ),
    },
  ];

  const getAllUsers = async () => {
    try {
      dispatch(setLoading(true));
      const temp = await fetchData("/user/getallusers");
      setUsers(
        temp.map((ele, index) => ({
          id: index + 1,
          ...ele,
          isDoctor: ele.isDoctor ? "Yes" : "No",
        }))
      );
      dispatch(setLoading(false));
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId) => {
    console.log("Deleting user with userId:", userId);
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (confirm) {
        await toast.promise(
          axios.delete("/user/deleteuser", {
            headers: {
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            data: { userId },
          }),
          {
            pending: "Deleting in...",
            success: "User deleted successfully",
            error: "Unable to delete user",
            loading: "Deleting user...",
          }
        );
        getAllUsers();
      }
    } catch (error) {
      return error;
    }
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full min-h-screen px-[10px] overflow-x-scroll overflow-y-hidden">
          <h3 className="home-sub-heading my-[2rem]">All Users</h3>
          {users.length > 0 ? (
            <DataGrid
              rows={users}
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
    </>
  );
};

export default Users;
