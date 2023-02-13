import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";

import store from "./store/store";
import "./app.css";
import AppFrame from "./components/AppFrame";
import { Box, CssBaseline } from "@mui/material";

const appTheme = createTheme();

const App: React.FunctionComponent = () => {

  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Box className="app">
          <AppFrame />
        </Box>
      </ThemeProvider>
    </Provider>
  );
};

export default App;