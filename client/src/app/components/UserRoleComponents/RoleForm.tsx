import React, { useEffect, useState } from "react"
import { Box, Button, ButtonGroup, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useSelector } from "react-redux";

import styles from "./RoleForm.styles";
import { RoleDocument } from "../../../store/features/appState.types";
import { RootState } from "../../../store/store";
import { FormsNames, LocalizedTextResources } from "../../../resources/getTextResources.types";
import { getTextResources } from "../../../resources/getTextResources";
import { handleModalClose } from "../../../store/storeServices/modalStateServices";
import { ModalFormParams } from "../../../store/features/modalState.types";

interface RoleFormPropsType {
  formParams?: ModalFormParams;
}

interface FormState extends RoleDocument {
  roleError: string;
  descriptionError: string;
}

interface ValidationErrors {
  roleError?: string;
  descriptionError?: string;
}

const initialFormState: FormState = {
  _id: "",
  role: "",
  description: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  roleError: "",
  descriptionError: "",
  __v: 0,
};

const RoleForm: React.FunctionComponent<RoleFormPropsType> = ({formParams}) => {
  // form state variable --------------------------------------------------------
  const [formState, setFormState] = useState<FormState>(initialFormState);

  // text resources handling code -----------------------------------------------
  const appLanguage = useSelector(
    (state: RootState) => state.appState.value.appLanguage
  );
  const [textRes, setTextRes] = useState<LocalizedTextResources>({});
  useEffect(() => {
    const updTextRes = getTextResources(appLanguage, FormsNames.USER_ROLE_FORMS);
    if (JSON.stringify(updTextRes) !== JSON.stringify(textRes)) {
      setTextRes(updTextRes);
    }
  }, [textRes, appLanguage]);

  // button click handlers
  const handleFormCloseClick = () => {
    handleModalClose();
  }

  return (
    <Box>
      <DialogTitle>{textRes.roleFormHeader}</DialogTitle>
      <DialogContent></DialogContent>
      <DialogActions>
        <ButtonGroup fullWidth>
            <Button onClick={handleFormCloseClick}>Close</Button>
        </ButtonGroup>
      </DialogActions>
    </Box>
  );
};

export default RoleForm;