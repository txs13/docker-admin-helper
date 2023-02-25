import React from "react";
import { useSelector } from "react-redux";
import { redirect, Route, Routes } from "react-router-dom";

import { RootState } from "../store/store";
import AboutRoute from "./routes/AboutRoute";
import AppStartingPageRoute from "./routes/AppStartingPageRoute";
import ErrorRoute from "./routes/ErrorRoute";
import LoginRegisterRoute from "./routes/LoginRegisterRoute";
import LoadingFragment from "./utils/LoadingFragment";

const Router: React.FunctionComponent = () => {
  const appUser = useSelector(
    (state: RootState) => state.appState.value.currentUser
  );

  return (
    <Routes>
      <Route path="/" element={<LoadingFragment {... {routing: true}} />}></Route>
      <Route path="/about" element={<AboutRoute />}></Route>
      <Route path="/login-register" element={<LoginRegisterRoute />}></Route>

      <Route path="/*" element={<ErrorRoute />}></Route>
    </Routes>
  );
};

export default Router;
