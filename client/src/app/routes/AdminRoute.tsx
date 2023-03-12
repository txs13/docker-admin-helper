import { Box, Paper, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./AdminRoute.styles";
import StartingFragment from "../components/AdminPanelComponents/StartingFragment";
import UsersFragment from "../components/AdminPanelComponents/UsersFragment";
import RolesFragment from "../components/AdminPanelComponents/RolesFragment";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../resources/getTextResources.types";
import { RootState } from "../../store/store";
import { getTextResources } from "../../resources/getTextResources";
import { TabContext, TabList, TabPanel } from "@mui/lab";

const AdminRoute: React.FunctionComponent = () => {
  // the idea is to manage admin panel tabs navigation through the url path
  const location = useLocation();
  const navigate = useNavigate();

  // tabs handling code ---------------------------------------------------------
  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue !== location.pathname) navigate(newValue);
  };

  // text resources handling code -----------------------------------------------
  const appLanguage = useSelector(
    (state: RootState) => state.appState.value.appLanguage
  );
  const [textRes, setTextRes] = useState<LocalizedTextResources>({});
  useEffect(() => {
    const updTextRes = getTextResources(appLanguage, FormsNames.ADMIN_PANEL);
    if (JSON.stringify(updTextRes) !== JSON.stringify(textRes)) {
      setTextRes(updTextRes);
    }
  }, [textRes, appLanguage]);

  return (
    <Paper sx={styles.viewPort}>
      <TabContext value={location.pathname}>
        <Box sx={styles.tabsList}>
          <TabList
            orientation="vertical"
            onChange={handleTabChange}
          >
            <Tab label={textRes.startingTabItem} value="/adminpanel" />
            <Tab label={textRes.usersTabItem} value="/adminpanel/users" />
            <Tab label={textRes.rolesTabItem} value="/adminpanel/roles" />
          </TabList>
        </Box>
        <Box sx={styles.fragmentPort}>
          <TabPanel value="/adminpanel">
            <Box>
              <StartingFragment />
            </Box>
          </TabPanel>
          <TabPanel value="/adminpanel/roles">
            <Box>
              <RolesFragment />
            </Box>
          </TabPanel>
          <TabPanel value="/adminpanel/users">
            <Box>
              <UsersFragment />
            </Box>
          </TabPanel>
        </Box>
      </TabContext>
    </Paper>
  );
};

export default AdminRoute;
