import React from "react";
import Paginition from "../issues/view/_components/Paginition";
const Dashboard = () => {
  return (
    <>
      <Paginition itemCount={100} pageSize={10} currentPage={2} />
    </>
  );
};

export default Dashboard;
