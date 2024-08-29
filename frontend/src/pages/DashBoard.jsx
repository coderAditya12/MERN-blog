import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashSidebar from "../components/DashSidebar";
import DashProfile from "../components/DashProfile";

const DashBoard = () => {
  const location = useLocation();
  const [tab, setTab] = useState();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFormUrl = urlParams.get("tab");
    if (tabFormUrl) {
      setTab(tabFormUrl);
    }
  }, [location.search]);
  return (
    <div>
      <div>
        {/* sidebar */}
        <DashSidebar />
      </div>
      {/* Profile */}

      {tab === "profile" && <DashProfile />}
    </div>
  );
};

export default DashBoard;
