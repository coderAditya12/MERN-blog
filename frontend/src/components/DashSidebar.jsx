import React, { useEffect, useState } from "react";
import { Sidebar } from "flowbite-react";
import {
  HiArrowSmRight,
  HiDocumentText,
  HiOutlineUserGroup,
  HiUserCircle,
  HiAnnotation,
  HiChartPie,
} from "react-icons/hi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOutSuccess } from "../redux/user/userSlice";
import { useSelector } from "react-redux";

const DashSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState("");
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);
  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (res.ok) {
        dispatch(signOutSuccess());
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleItemClick = (tabName) => {
    navigate(`/dashboard?tab=${tabName}`);
  };

  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          {currentUser && currentUser.isAdmin && (
            <Link to="/dashboard?tab=dashboard">
              <Sidebar.Item
                active={tab === "dashboard" ||!tab}
                icon={HiChartPie}
                as="div"
              >
                Dashboard
              </Sidebar.Item>
            </Link>
          )}
          <Sidebar.Item
            active={tab === "profile"}
            icon={HiUserCircle}
            onClick={() => handleItemClick("profile")}
            label={currentUser.isAdmin ? "Admin" : "User"}
            as="div"
          >
            Profile
          </Sidebar.Item>
          {currentUser.isAdmin && (
            <Link to="/dashboard?tab=posts">
              <Sidebar.Item
                active={tab === "posts"}
                icon={HiDocumentText}
                as="div"
              >
                Posts
              </Sidebar.Item>
            </Link>
          )}
          {currentUser.isAdmin && (
            <>
              <Link to="/dashboard?tab=users">
                <Sidebar.Item
                  active={tab === "users"}
                  icon={HiOutlineUserGroup}
                  as="div"
                >
                  users
                </Sidebar.Item>
              </Link>
              <Link to="/dashboard?tab=comments">
                <Sidebar.Item
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  as="div"
                >
                  Comments
                </Sidebar.Item>
              </Link>
            </>
          )}

          <Sidebar.Item
            icon={HiArrowSmRight}
            className="cursor-pointer"
            onClick={handleSignOut}
            as="div"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
};

export default DashSidebar;
