import { useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import startApService from "../store/storeServices/startUpService";

import Router from "./Router";

const AppFrame: React.FunctionComponent = () => {
  const theme = useTheme();
  const spinnerStyle = {
    borderColor: `${theme.palette.info.dark} transparent ${theme.palette.info.dark} transparent`,
  };
  
  useEffect(() => {
    console.log("This is happening");
    startApService();
  }, []);

  const appState = useSelector((state: RootState) => state.appState.value);

  return (
    <>
      {!appState.globalLoading ? (
        <Router />
      ) : (
        <div className="animation-container">
          <div className="spinner" style={spinnerStyle}></div>
        </div>
      )}
    </>
  );
};

export default AppFrame;
