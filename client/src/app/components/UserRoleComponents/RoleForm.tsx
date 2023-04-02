import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useSelector } from "react-redux";

import styles from "./RoleForm.styles";
import { RoleDocument } from "../../../store/features/appState.types";
import { RootState } from "../../../store/store";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../../resources/getTextResources.types";
import { getTextResources } from "../../../resources/getTextResources";
import { handleModalClose } from "../../../store/storeServices/modalStateServices";
import { ModalFormProps } from "../../../store/features/modalState.types";
import { resolveRoleById } from "../../../store/storeServices/usersRolesServices";

interface RoleFormPropsType {
  formProps?: ModalFormProps;
  showForm: boolean;
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

const RoleForm: React.FunctionComponent<RoleFormPropsType> = ({
  formProps,
  showForm,
}) => {
  // form state variable --------------------------------------------------------
  const [formState, setFormState] = useState<FormState>(initialFormState);

  // text resources handling code -----------------------------------------------
  const appLanguage = useSelector(
    (state: RootState) => state.appState.value.appLanguage
  );
  const [textRes, setTextRes] = useState<LocalizedTextResources>({});
  useEffect(() => {
    const updTextRes = getTextResources(
      appLanguage,
      FormsNames.USER_ROLE_FORMS
    );
    if (JSON.stringify(updTextRes) !== JSON.stringify(textRes)) {
      setTextRes(updTextRes);
    }
  }, [textRes, appLanguage]);

  // reset form state to the initial value on open
  useEffect(() => {
    if (showForm) {
      if (formProps?.id) {
        // getting user details and showing them
        const currentRole = resolveRoleById(formProps.id);
        if (currentRole) {
          const newFormState: FormState = {
            ...currentRole,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleError: "",
            descriptionError: "",
          };
          if (!newFormState.description) newFormState.description = "";
          setFormState(newFormState);
        } else {
          // TODO: generate wrong role id error message
        }
      } else {
        // setting initial form value for new user
        setFormState(initialFormState);
      }
    }
  }, [formProps, showForm]);

  // button click handlers
  const handleFormCloseClick = () => {
    handleModalClose();
  };

  return (
    <Box sx={styles.viewPort}>
      <DialogTitle>
        {formProps?.id ? textRes.roleFormHeader : textRes.newRoleFormHeader}
      </DialogTitle>
      <DialogContent>
        <TextField
          label={textRes.roleIDInputLabel}
          value={formState._id}
          fullWidth
          disabled
          sx={styles.inputField}
        />
        <TextField
          label={textRes.roleNameInputLabel}
          value={formState.role}
          fullWidth
          sx={styles.inputField}
        />
        <TextField
          label={textRes.roleDescInputLabel}
          value={formState.description}
          fullWidth
          disabled
          sx={styles.inputField}
        />
        <TextField
          label={textRes.roleCreatedInputLabel}
          value={formState.createdAt}
          fullWidth
          disabled
          sx={styles.inputField}
        />
        <TextField
          label={textRes.roleUpdatedInputLabel}
          value={formState.updatedAt}
          fullWidth
          disabled
          sx={styles.inputField}
        />
        <TextField
          label={textRes.roleVersInputLabel}
          value={formState.__v}
          fullWidth
          disabled
          sx={styles.inputField}
        />
      </DialogContent>
      <DialogActions>
        <ButtonGroup fullWidth>
          <Button onClick={handleFormCloseClick}>Close</Button>
        </ButtonGroup>
      </DialogActions>
    </Box>
  );
};

export default RoleForm;
