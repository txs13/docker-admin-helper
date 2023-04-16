import { Box, Paper, Tab } from "@mui/material";
import React, { useEffect, useMemo, useState } from "react";
import { Params, useLocation, useNavigate, useParams } from "react-router-dom";
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
import { resolveRoleById } from "../../store/storeServices/usersRolesServices";

const AdminRoute: React.FunctionComponent = () => {
  // the idea is to manage admin panel tabs navigation through the url path
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

  // resolve params and pathname for the tabs navigation purposes
  const resolveParamsAndPath = (
    path: string,
    params: Readonly<Params<string>>
  ): string => {
    if (params.roleID && resolveRoleById(params.roleID)) {
      const regex = new RegExp(`/${params.roleID}$`);
      const shortenedPath = path.replace(regex, "");
      return shortenedPath;
    } else {
      // TODO: show error screen with wrong roleID
    }

    if (params.userID) {
      // TODO: handle user details routing similar to role detail routing above
    }

    return path;
  };

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
  }, [textRes, appLanguage, location]);

  // clearing the url id after modal is closed
  // const [modalWasOpened, setModalWasOpened] = useState(false);
  // const modalIsOpen = useSelector((state: RootState) => state.modalState.value.mainModalOpen);
  // useMemo(() => {
  //   if(modalIsOpen && params.roleID) {
  //     setModalWasOpened(true);
  //   }
  //   if (!modalIsOpen && params.roleID && modalWasOpened) {
  //     setModalWasOpened(false);
  //     navigate("/adminpanel/roles");
  //   }
  // }, [modalIsOpen, modalWasOpened, navigate, params.roleID]);

  return (
    <Paper sx={styles.viewPort}>
      <TabContext value={resolveParamsAndPath(location.pathname, params)}>
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
              <RolesFragment roleID={params.roleID}/>
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
