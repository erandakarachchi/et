"use client";

import { useState } from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";

const DashboardWrapper = () => {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <>
      <NavBar onMenuClick={() => setIsSideBarOpen(!isSideBarOpen)} />
      <SideBar isOpen={isSideBarOpen} />
    </>
  );
};

export default DashboardWrapper;
