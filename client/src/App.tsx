import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/system";
import React from "react";
import { Provider } from "react-redux";
import { useTheme } from "@mui/material";

import store from "./store/store";
import "./app.css";
import AppFrame from "./components/AppFrame";

const appTheme = createTheme();

const App: React.FunctionComponent = () => {
  const theme = useTheme();

  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <div
          className="app"
          style={{ backgroundColor: theme.palette.info.light }}
        >
          <AppFrame />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;