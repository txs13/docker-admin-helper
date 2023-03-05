import React from "react";
import { useSelector } from "react-redux";
import { generatePath, redirect, Route, Routes } from "react-router-dom";

import { RootState } from "../store/store";
import AboutRoute from "./routes/AboutRoute";
import AppStartingPageRoute from "./routes/AppStartingPageRoute";
import ErrorRoute from "./routes/ErrorRoute";
import LoginRegisterRoute from "./routes/LoginRegisterRoute";
import LoadingFragment from "./utils/LoadingFragment";
import emailToPath from "./utils/emailToPath";
import ProtectedRoute, { ProtectedRouteProps } from "./utils/ProtectedRoute";

const Router: React.FunctionComponent = () => {
  const appState = useSelector((state: RootState) => state.appState.value);

  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: appState.currentUser ? true : false,
    authenticationPath: "/login",
  };

  const defaultAdminProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: appState.currentUser && appState.isAdmin ? true : false,
    authenticationPath: "/",
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<LoadingFragment {...{ routing: true }} />}
      ></Route>
      <Route path="/about" element={<AboutRoute />}></Route>
      <Route path="/login-register" element={<LoginRegisterRoute />}></Route>

      <Route
        path={generatePath("/:id", { id: emailToPath(appState.currentUser) })}
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<AppStartingPageRoute />}
          />
        }
      ></Route>

      <Route path="/*" element={<ErrorRoute />}></Route>
    </Routes>
  );
};

export default Router;
