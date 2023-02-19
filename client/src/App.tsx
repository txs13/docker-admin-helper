import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Box, CssBaseline } from "@mui/material";

import store from "./store/store";
import AppFrame from "./app/AppFrame";

const appTheme = createTheme();

const App: React.FunctionComponent = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <BrowserRouter>
          <CssBaseline />
          <Box height="100%" width="100%">
            <AppFrame />
          </Box>
        </BrowserRouter>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
