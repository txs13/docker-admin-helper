import {
  Box,
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogTitle,
  useTheme,
  CircularProgress,
} from "@mui/material";
import React, { ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { RootState } from "../store/store";
import { startApService } from "../store/storeServices/sessionServices";
import AppNavbar from "./AppNavbar";
import Router from "./Router";
import styles from "./AppFrame.styles";
import LoadingFragment from "./utils/LoadingFragment";
import {
  FormsNames,
  LocalizedTextResources,
} from "../resources/getTextResources.types";
import { getTextResources } from "../resources/getTextResources";
import { ModalFormProps, ModalForms } from "../store/features/modalState.types";
import RoleForm from "./components/UserRoleComponents/RoleForm";

const AppFrame: React.FunctionComponent = () => {
  const theme = useTheme();

  // text resources handling code -----------------------------------------------
  const appLanguage = useSelector(
    (state: RootState) => state.appState.value.appLanguage
  );
  const [textRes, setTextRes] = useState<LocalizedTextResources>({});
  useEffect(() => {
    const updTextRes = getTextResources(appLanguage, FormsNames.APP_GENERAL);
    if (JSON.stringify(updTextRes) !== JSON.stringify(textRes)) {
      setTextRes(updTextRes);
    }
  }, [textRes, appLanguage]);

  useEffect(() => {
    startApService();
  }, []);

  const appState = useSelector((state: RootState) => state.appState.value);
  const modalState = useSelector((state: RootState) => state.modalState.value);

  return (
    <Box sx={styles.viewportFrame}>
      <AppNavbar />
      <Box
        sx={{ ...styles.appBox, backgroundColor: theme.palette.primary.light }}
      >
        <Container maxWidth="xl" sx={{ ...styles.container }}>
          {appState === undefined || appState.globalLoading ? (
            <LoadingFragment />
          ) : (
            <Router />
          )}
        </Container>
        <Dialog open={modalState.mainModalOpen}>
          {modalState.formToRender === ModalForms.ROLE_FORM ? (
            <RoleForm
              formProps={modalState.formProps}
              showForm={modalState.mainModalOpen}
            />
          ) : modalState.formToRender === ModalForms.USER_FORM ? (
            <LoadingFragment />
          ) : (
            <LoadingFragment />
          )}
        </Dialog>
        <Dialog open={modalState.confirmationModalOpen}>
          <DialogTitle></DialogTitle>
          <DialogContentText>
            {modalState.confirmationText || " "}
          </DialogContentText>
          <DialogActions>
            <Button></Button>
            <Button></Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default AppFrame;
