import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Loading from "../components/Loading";
import Empty from "../components/Empty";
import fetchData from "../helper/apiCall";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/reducers/rootSlice";

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.root);

  const columns = [
    { field: "id", headerName: "S.No", width: 70 },
    { field: "content", headerName: "Content", flex: 2 },
    { field: "date", headerName: "Date", flex: 1 },
    { field: "time", headerName: "Time", flex: 1 },
  ];

  useEffect(() => {
    const getAllNotif = async () => {
      try {
        dispatch(setLoading(true));
        const temp = await fetchData("/notification/getallnotifs");
        dispatch(setLoading(false));
        setNotifications(
          temp.map((ele, index) => ({
            id: index + 1,
            content: ele.content,
            date: ele.updatedAt.split("T")[0],
            time: ele.updatedAt.split("T")[1].split(".")[0],
          }))
        );
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    getAllNotif();
  }, [dispatch]);

  return (
    <>
      <Navbar />
      {loading ? (
        <Loading />
      ) : (
        <div className="w-full min-h-screen px-[10px] overflow-x-scroll">
          <h1 className="py-[2rem] text-center text-[34px] font-[700] opacity-70 leading-[40px]">
            Your Notifications
          </h1>
          {notifications.length > 0 ? (
            <DataGrid
              rows={notifications}
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

export default Notifications;
