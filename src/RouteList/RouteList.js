import React from "react";
import { Route, Routes } from "react-router-dom";
import About from "../Pages/About/About";
import AdminDashboard from "../Pages/AdminDashboard/AdminDashboard";
import AdminHome from "../Pages/AdminDashboard/AdminHome";
import AdminPlan from "../Pages/AdminDashboard/AdminPlan";
import AdminWork from "../Pages/AdminDashboard/AdminWork";
import Users from "../Pages/AdminDashboard/Users";
import WithdrawRequest from "../Pages/AdminDashboard/WithdrawRequest";
import Blog from "../Pages/Blog/Blog";
import Dashboard from "../Pages/Dashboard/Dashboard";
import History from "../Pages/Dashboard/History";
import PlanDetails from "../Pages/Dashboard/PlanDetails.";
import Profile from "../Pages/Dashboard/Profile";
import Team from "../Pages/Dashboard/Team";
import Wallet from "../Pages/Dashboard/Wallet";
import Work from "../Pages/Dashboard/Work";
import WorkAbout from "../Pages/Dashboard/WorkAbout";
import Home from "../Pages/Home/Home";
import RequireAuth from "../Pages/Registation/RequireAuth";
import SignIn from "../Pages/Registation/SignIn";
import SignUp from "../Pages/Registation/SignUp";
import TradPrimary from "../Pages/Dashboard/TradPrimary";
import TradSecondary from "../Pages/Dashboard/TradSecondary";

const RouteList = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/blog" element={<Blog />}></Route>
        <Route path="/signIn" element={<SignIn />}></Route>
        <Route path="/signUp" element={<SignUp />}></Route>

        <Route
          path="/dashboard"
          element={
            <RequireAuth>
              <Dashboard />
            </RequireAuth>
          }
        >
          <Route index element={<Wallet />}></Route>
          <Route path="team" element={<Team />}></Route>
          <Route path="about" element={<WorkAbout />}></Route>
          <Route path="work" element={<Work />}></Route>
          <Route path="tradPrimary" element={<TradPrimary />}></Route>
          <Route path="tradSecondary" element={<TradSecondary />}></Route>
          <Route path="me" element={<Profile />}></Route>
          <Route path="planDetails" element={<PlanDetails />}></Route>
          <Route path="history" element={<History />}></Route>
        </Route>

        <Route
          path="/admin-dashboard"
          element={
            <RequireAuth>
              <AdminDashboard />
            </RequireAuth>
          }
        >
          <Route index element={<AdminHome />}></Route>
          <Route path="users" element={<Users />}></Route>
          <Route path="adminWork" element={<AdminWork />}></Route>
          <Route path="adminPlan" element={<AdminPlan />}></Route>
          <Route
            path="withdraw-requested"
            element={<WithdrawRequest />}
          ></Route>
        </Route>
      </Routes>
    </div>
  );
};

export default RouteList;
