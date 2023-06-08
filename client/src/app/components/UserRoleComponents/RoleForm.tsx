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
import {
  RoleDocument,
  RoleInput,
} from "../../../store/features/appState.types";
import { RootState } from "../../../store/store";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../../resources/getTextResources.types";
import { getTextResources } from "../../../resources/getTextResources";
import {
  handleConfirmationClose,
  handleConfirmationOpen,
  handleModalClose,
} from "../../../store/storeServices/modalStateServices";
import { ModalFormProps } from "../../../store/features/modalState.types";
import {
  createRoleService,
  deleteRoleService,
  resolveRoleById,
} from "../../../store/storeServices/usersRolesServices";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { validateResourcesAsync } from "../../../validation/validateResources";
import { roleSchema } from "../../../validation/userAndRoleValidation.scheme";

interface RoleFormPropsType {
  formProps?: ModalFormProps;
  showForm: boolean;
}

interface FormState extends RoleDocument {
  roleError: string;
  descriptionError: string;
  editingMode: boolean;
}

interface FormValidationErrors {
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
  editingMode: true,
};

const RoleForm: React.FunctionComponent<RoleFormPropsType> = ({
  formProps,
  showForm,
}) => {
  const location = useLocation();
  const params = useParams();
  const navigate = useNavigate();

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

  // reset form state to the initial value on open ------------------------------
  useEffect(() => {
    if (showForm && formProps?.id) {
      takeRoleDataFromStore();
    } else {
      // setting initial form value for new user
      setFormState(initialFormState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formProps, showForm]);

  const takeRoleDataFromStore = () => {
    if (formProps?.id) {
      // getting user details and showing them
      const currentRole = resolveRoleById(formProps.id);
      if (currentRole) {
        const newFormState: FormState = {
          ...currentRole,
          roleError: "",
          descriptionError: "",
          editingMode: false,
        };
        if (!newFormState.description) newFormState.description = "";
        setFormState(newFormState);
      } else {
        // TODO: generate wrong role id error message
      }
    }
  };

  // input change handler --------------------------------------------------------
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "role":
        setFormState({ ...formState, role: e.target.value, roleError: "" });
        break;
      case "description":
        setFormState({
          ...formState,
          description: e.target.value,
          descriptionError: "",
        });
        break;
    }
  };

  // button click handlers ------------------------------------------------------
  const modalState = useSelector((state: RootState) => state.modalState.value);
  const formButtonClickHandler = async (
    clickSource:
      | "copyUrl"
      | "save"
      | "cancel"
      | "change"
      | "add"
      | "delete"
      | "close"
  ) => {
    switch (clickSource) {
      case "copyUrl":
        break;
      case "save":
        break;
      case "cancel":
        takeRoleDataFromStore();
        break;
      case "change":
        setFormState({ ...formState, editingMode: true });
        break;
      case "add":
        await attemptCreateRole();
        break;
      case "delete":
        if (formProps?.id && resolveRoleById(formProps?.id)?.role)
          handleConfirmationOpen(
            textRes.confirmDeleteRoleText +
              '"' +
              resolveRoleById(formProps?.id)?.role +
              '"'
          );
        break;
      case "close":
        resolveParentUrlAndCloseModal();
        break;
    }
  };

  // helper functions
  const resolveParentUrlAndCloseModal = () => {
    if (formProps?.id) {
      const regex = new RegExp(`/${formProps?.id}$`);
      navigate(location.pathname.replace(regex, ""));
    } else handleModalClose();
  };

  const attemptCreateRole = async () => {
    const roleInput: RoleInput = {
      role: formState.role,
    };
    if (formState.description !== "")
      roleInput.description = formState.description;

    const errors: any[] = await validateResourcesAsync(roleSchema, roleInput);

    if (!errors) {
      //if no errors proceed with trying to send create role api request
      const result = await createRoleService(roleInput);

      if (!result.error)
        resolveParentUrlAndCloseModal();    
      else {
        // TODO: show error mentioned in the api response
      }
    } else {
      // if there are errors - show them in the input fields
      const errorMessages: FormValidationErrors = {
        roleError: "",
        descriptionError: "",
      };
      console.log(errors);
      errors.forEach((error) => {
        if (error.path[0] === "role") {
          if (!errorMessages.roleError) errorMessages.roleError = error.message;
        }
        if (error.path[0] === "description") {
          if (!errorMessages.descriptionError) errorMessages.descriptionError = error.message;
        }
      });
      setFormState({ ...formState, ...errorMessages });
    }
  };

  // confirmation modal action handler
  useEffect(() => {
    if (modalState.actionIsConfirmed) {
      handleConfirmationClose();
      resolveParentUrlAndCloseModal();
      if (formProps?.id) deleteRoleService(formProps.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modalState.actionIsConfirmed]);

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
          sx={{ ...styles.inputField, display: formProps?.id ? "" : "none" }}
        />
        <TextField
          label={textRes.roleNameInputLabel}
          value={formState.role}
          fullWidth
          disabled={!formState.editingMode}
          name="role"
          type="text"
          helperText={formState.roleError}
          FormHelperTextProps={{ error: true }}
          error={formState.roleError === "" ? false : true}
          onChange={handleInputChange}
          sx={styles.inputField}
        />
        <TextField
          label={textRes.roleDescInputLabel}
          value={formState.description}
          fullWidth
          disabled={!formState.editingMode}
          name="description"
          type="text"
          helperText={formState.descriptionError}
          FormHelperTextProps={{ error: true }}
          error={formState.descriptionError === "" ? false : true}
          onChange={handleInputChange}
          sx={styles.inputField}
        />
        <TextField
          label={textRes.createdInputLabel}
          value={formState.createdAt}
          fullWidth
          disabled
          sx={{ ...styles.inputField, display: formProps?.id ? "" : "none" }}
        />
        <TextField
          label={textRes.updatedInputLabel}
          value={formState.updatedAt}
          fullWidth
          disabled
          sx={{ ...styles.inputField, display: formProps?.id ? "" : "none" }}
        />
        <TextField
          label={textRes.versInputLabel}
          value={formState.__v}
          fullWidth
          disabled
          sx={{ ...styles.inputField, display: formProps?.id ? "" : "none" }}
        />
      </DialogContent>
      <DialogActions>
        <ButtonGroup sx={styles.buttonGroup} fullWidth>
          <Button
            sx={{
              ...styles.button,
              display: !formState.editingMode && formProps?.id ? "" : "none",
            }}
            variant="outlined"
            color="info"
            onClick={() => formButtonClickHandler("copyUrl")}
          >
            {textRes.copyUrlBtnLabel}
          </Button>
          <Button
            sx={{
              ...styles.button,
              display: formState.editingMode && formProps?.id ? "" : "none",
            }}
            variant="contained"
            color="error"
            onClick={() => formButtonClickHandler("delete")}
          >
            {textRes.deleteBtnLabel}
          </Button>
          <Button
            sx={{
              ...styles.button,
              display: formState.editingMode && formProps?.id ? "" : "none",
            }}
            variant="contained"
            color="success"
            onClick={() => formButtonClickHandler("save")}
          >
            {textRes.saveBtnLabel}
          </Button>
          <Button
            sx={{
              ...styles.button,
              display: formState.editingMode && formProps?.id ? "" : "none",
            }}
            variant="contained"
            color="info"
            onClick={() => formButtonClickHandler("cancel")}
          >
            {textRes.cancelBtnLabel}
          </Button>
          <Button
            sx={{
              ...styles.button,
              display: !formState.editingMode && formProps?.id ? "" : "none",
            }}
            variant="contained"
            color="info"
            onClick={() => formButtonClickHandler("change")}
          >
            {textRes.changeBtnLabel}
          </Button>
          <Button
            sx={{
              ...styles.button,
              display: !formProps?.id ? "" : "none",
            }}
            variant="contained"
            color="success"
            onClick={() => formButtonClickHandler("add")}
          >
            {textRes.addBtnLabel}
          </Button>
          <Button
            sx={styles.button}
            variant="outlined"
            color="info"
            onClick={() => formButtonClickHandler("close")}
          >
            {textRes.closeBtnLabel}
          </Button>
        </ButtonGroup>
      </DialogActions>
    </Box>
  );
};

export default RoleForm;
