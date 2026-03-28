import Rightbar from "@/components/rightbar/Rightbar";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const AdminLayout = ({ children }) => {
  const navData = [
    {
      id: 1,
      name: "Dashbaord",
      link: "/admindashbaor",
    },
  ];
  return (
    <div className="flex">
      <Sidebar data={navData} />

      <Rightbar children={children} />
    </div>
  );
};

export default AdminLayout;
