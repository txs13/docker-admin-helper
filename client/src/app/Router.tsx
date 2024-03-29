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
import { AppState } from "../store/features/appState.types";
import AdminRoute from "./routes/AdminRoute";

const Router: React.FunctionComponent = () => {
  const currentUser = useSelector(
    (state: RootState) => state.appState.value.currentUser
  );
  const isAdmin = useSelector(
    (state: RootState) => state.appState.value.isAdmin
  );
  const defaultProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: currentUser ? true : false,
    authenticationPath: "/login-register",
  };

  const defaultAdminProtectedRouteProps: Omit<ProtectedRouteProps, "outlet"> = {
    isAuthenticated: currentUser && isAdmin ? true : false,
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
        path={generatePath("/:id", { id: emailToPath(currentUser) })}
        element={
          <ProtectedRoute
            {...defaultProtectedRouteProps}
            outlet={<AppStartingPageRoute />}
          />
        }
      ></Route>

      <Route
        path="/adminpanel"
        element={
          <ProtectedRoute
            {...defaultAdminProtectedRouteProps}
            outlet={<AdminRoute />}
          />
        }
      />
      <Route
        path="/adminpanel/roles/:roleID?"
        element={
          <ProtectedRoute
            {...defaultAdminProtectedRouteProps}
            outlet={<AdminRoute />}
          />
        }
      />
      <Route
        path="/adminpanel/users/:userID?"
        element={
          <ProtectedRoute
            {...defaultAdminProtectedRouteProps}
            outlet={<AdminRoute />}
          />
        }
      />

      <Route path="/*" element={<ErrorRoute />}></Route>
    </Routes>
  );
};

export default Router;
