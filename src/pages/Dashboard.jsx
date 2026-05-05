import React from "react";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const {user} = useAuth();
  return (
    <div>
      <h1>dashboard page</h1>
      <h1>{user?.name}</h1>
    </div>
  );
};

export default Dashboard;
