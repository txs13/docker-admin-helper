import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";

import store from "./store/store";
import "./app.css";
import AppFrame from "./components/AppFrame";

const appTheme = createTheme();

const App: React.FunctionComponent = () => {

  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
        <div className="app">
          <AppFrame />
        </div>
      </ThemeProvider>
    </Provider>
  );
};

export default App;