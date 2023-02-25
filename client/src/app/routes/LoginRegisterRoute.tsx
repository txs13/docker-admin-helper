import { Box, Paper, Tab, useTheme } from "@mui/material";
import { TabContext, TabList, TabPanel } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";

import styles from "./LoginRegisterRoute.styles";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../resources/getTextResources.types";
import { RootState } from "../../store/store";
import { getTextResources } from "../../resources/getTextResources";
import LoginForm from "../components/LoginForm";
import RegisterForm from "../components/RegisterForm";

const LoginRegisterRoute: React.FunctionComponent = () => {
  const theme = useTheme();
  // tabs handling code ---------------------------------------------------------
  const [tabValue, setTabValue] = useState("1");
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };
  // text resources handling code -----------------------------------------------
  const appLanguage = useSelector(
    (state: RootState) => state.appState.value.appLanguage
  );
  const [textRes, setTextRes] = useState<LocalizedTextResources>({});
  useEffect(() => {
    const updTextRes = getTextResources(appLanguage, FormsNames.LOGIN_REGISTER);
    if (JSON.stringify(updTextRes) !== JSON.stringify(textRes)) {
      setTextRes(updTextRes);
    }
  }, [textRes, appLanguage]);
  // get roles store state -----------------------------------------------------
  const appRoles = useSelector(
    (state: RootState) => state.usersRoles.value.appRoles
  );

  return (
    <Box
      sx={{ ...styles.viewPort, backgroundColor: theme.palette.primary.light }}
    >
      <Paper elevation={3} sx={styles.formPort}>
        <TabContext value={tabValue}>
          <Box sx={styles.tabsList}>
            <TabList variant="fullWidth" onChange={handleTabChange}>
              <Tab label={textRes.loginTabName} value="1" />
              <Tab
                label={textRes.registerTabName}
                value="2"
                disabled={!appRoles || appRoles?.length === 0 ? true : false}
              />
            </TabList>
          </Box>
          <Box sx={styles.innerFormPort}>
            <Box sx={styles.logoBox}>
              <CoPresentTwoToneIcon sx={styles.logoPicture} />
            </Box>
            <TabPanel value="1">
              <Box sx={styles.loginForm}>
                <LoginForm />
              </Box>
            </TabPanel>
            <TabPanel value="2">
              <Box sx={styles.registerForm}>
                <RegisterForm />
              </Box>
            </TabPanel>
          </Box>
        </TabContext>
      </Paper>
    </Box>
  );
};

export default LoginRegisterRoute;
