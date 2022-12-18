import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";
import React, { useState } from "react";
import { Provider } from "react-redux";
import { useTheme } from "@mui/material";

import store from "./store/store";
import "./app.css";
import Router from "./components/Router";

const appTheme = createTheme();

const App: React.FunctionComponent = () => {
  const [startUpActionsAreDone, setStartUpActionsAreDone] = useState(false);
  const theme = useTheme();
  const spinnerStyle = {
    borderColor: `${theme.palette.info.dark} transparent ${theme.palette.info.dark} transparent`,
  };


  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <div
          className="app"
          style={{ backgroundColor: theme.palette.info.light }}
        >
          {startUpActionsAreDone ? (
            <Router />
          ) : (
            <div className="animation-container">
              <div className="spinner" style={spinnerStyle}></div>
            </div>
          )}
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;