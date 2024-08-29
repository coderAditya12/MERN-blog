import React from "react";
import { Sidebar } from "flowbite-react";
import { HiArrowSmRight, HiUserCircle } from "react-icons/hi";
const DashSidebar = () => {
  return (
    <Sidebar>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Sidebar.Item
            active
            icon={HiUserCircle}
            label={"User"}
            labelColor="dark"
          >
            Profile
          </Sidebar.Item>
          <Sidebar.Item active icon={HiArrowSmRight}>
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
