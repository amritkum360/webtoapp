import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Pricing from "./components/Pricing/Pricing";
import Signup from "./components/SignUp/Signup";
import Login from "./components/Login/Login";
import AppDashboard from "./components/account/AppDashboard/Dashboard/Dashboard";
import MyApps from "./components/account/myapps/myapps";
import NewApp from "./components/account/newapp/newapp";
import Home from "./components/home/home";
import Upgrade from "./components/account/Upgrade/Upgrade";
import NeedPaidPlan from "./components/account/AppDashboard/Dashboard/components/needpaidplan/needpaidplan";

export default function App() {
  const isAuthenticated = localStorage.getItem("token") !== null; // Check if a token exists in localStorage

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <Home />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <Login />
        </>
      ),
    },
    {
      path: "/signup",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <Signup />
        </>
      ),
    },
    {
      path: "/pricing",
      element:<><Navbar isAuthenticated={isAuthenticated} /> <Pricing /> </> ,
    },
    {
      path: "/account/newapp",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <NewApp />
        </>
      ),
    },
    {
      path: "/account/myapps",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <MyApps />
        </>
      ),
    },
    {
      path: "/app/dashboard/:id",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <AppDashboard />
        </>
      ),
    },
    {
      path: "/needpaidplan",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <NeedPaidPlan />
        </>
      ),
    },
    {
      path: "/app/upgrade/:id",
      element: (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <Upgrade />
        </>
      ),
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
