import { Box, Container, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import startApService from "../store/storeServices/startUpService";
import AppNavbar from "./AppNavbar";
import Router from "./Router";
import styles from "./AppFrame.styles";

const AppFrame: React.FunctionComponent = () => {
  const theme = useTheme();
  const spinnerStyle = {
    borderColor: `${theme.palette.info.dark} transparent ${theme.palette.info.dark} transparent`,
  };

  useEffect(() => {
    startApService();
  }, []);

  const appState = useSelector((state: RootState) => state.appState.value);

  return (
    <Box sx={styles.viewportFrame}>
      <AppNavbar />
      <Box
        sx={{ ...styles.appBox, backgroundColor: theme.palette.primary.light }}
      >
        <Container
          maxWidth="xl"
          sx={{ ...styles.container, backgroundColor: theme.palette.common.white }}
        >
          {!appState.globalLoading ? (
            <Router />
          ) : (
            <div className="animation-container">
              <div className="spinner" style={spinnerStyle}></div>
            </div>
          )}
        </Container>
      </Box>
    </Box>
  );
};

export default AppFrame;
