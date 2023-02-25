import { Alert, Box, Button, ButtonGroup, MenuItem, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getTextResources } from "../../resources/getTextResources";
import { FormsNames, LocalizedTextResources } from "../../resources/getTextResources.types";
import { RootState } from "../../store/store";
import styles from "./RegisterForm.styles";

const initialFormState: {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  confirmPassword: string;
  confirmPasswordError: string;
  name: string;
  nameError: string;
  familyName: string;
  familyNameError: string;
  role: string;
  roleError: string;
  alertMessage: string;
  alertType: "error" | "info";
} = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  confirmPassword: "",
  confirmPasswordError: "",
  name: "",
  nameError: "",
  familyName: "",
  familyNameError: "",
  role: "",
  roleError: "",
  alertMessage: "",
  alertType: "info",
};

const RegisterForm: React.FunctionComponent = () => {
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

  // get store vars
  const appRoles = useSelector((state: RootState) => state.usersRoles.value.appRoles);

  // form state variable --------------------------------------------------------
  const [formState, setFormState] = useState(initialFormState);

  // form state change handler
  // TODO: refactor switch section later on
  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "email":
        setFormState({
          ...formState,
          email: e.target.value,
          emailError: "",
          alertMessage: "",
        });
        break;
      case "password":
        setFormState({
          ...formState,
          password: e.target.value,
          passwordError: "",
          alertMessage: "",
        });
        break;
      case "confirmpassword":
        setFormState({
          ...formState,
          confirmPassword: e.target.value,
          confirmPasswordError: "",
          alertMessage: "",
        });
        break;
      case "name":
        setFormState({
          ...formState,
          name: e.target.value,
          nameError: "",
          alertMessage: "",
        });
        break;
      case "familyname":
        setFormState({
          ...formState,
          familyName: e.target.value,
          familyNameError: "",
          alertMessage: "",
        });
        break;
      case "role":
        setFormState({
          ...formState,
          role: e.target.value,
          roleError: "",
          alertMessage: "",
        });
        break;
      default:
        // TODO navigate to error page
        throw new Error("wrong input element(s) name property");
    }
  };

  return (
    <Box sx={styles.loginViewPort}>
      <Alert
        sx={{
          ...styles.alert,
          display: formState.alertMessage === "" ? "none" : "",
        }}
        severity={formState.alertType}
      >
        {formState.alertMessage}
      </Alert>

      <TextField
        sx={styles.emailInput}
        variant="outlined"
        margin="dense"
        label={textRes.emailInputLabel}
        name="email"
        type="email"
        required
        value={formState.email}
        onChange={onInputChange}
        helperText={formState.emailError}
        FormHelperTextProps={{ error: true }}
        error={formState.emailError === "" ? false : true}
      />

      <TextField
        sx={styles.passwordInput}
        variant="outlined"
        margin="dense"
        label={textRes.passwordInputLabel}
        name="password"
        type="password"
        required
        value={formState.password}
        onChange={onInputChange}
        helperText={formState.passwordError}
        FormHelperTextProps={{ error: true }}
        error={formState.passwordError === "" ? false : true}
      />

      <TextField
        sx={styles.confirmPasswordInput}
        variant="outlined"
        margin="dense"
        label={textRes.confirmPasswordInputLabel}
        name="confirmpassword"
        type="password"
        required
        value={formState.confirmPassword}
        onChange={onInputChange}
        helperText={formState.confirmPasswordError}
        FormHelperTextProps={{ error: true }}
        error={formState.confirmPasswordError === "" ? false : true}
      />

      <TextField
        sx={styles.nameInput}
        variant="outlined"
        margin="dense"
        label={textRes.nameInputLabel}
        name="name"
        type="text"
        required
        value={formState.name}
        onChange={onInputChange}
        helperText={formState.nameError}
        FormHelperTextProps={{ error: true }}
        error={formState.nameError === "" ? false : true}
      />

      <TextField
        sx={styles.familyNameInput}
        variant="outlined"
        margin="dense"
        label={textRes.familyNameInputLabel}
        name="familyname"
        type="text"
        value={formState.familyName}
        onChange={onInputChange}
        helperText={formState.familyNameError}
        FormHelperTextProps={{ error: true }}
        error={formState.familyNameError === "" ? false : true}
      />

      <TextField
        select
        sx={styles.roleInput}
        variant="outlined"
        margin="dense"
        label={textRes.roleInputLabel}
        name="role"
        required
        value={formState.role}
        onChange={onInputChange}
        helperText={formState.roleError}
        FormHelperTextProps={{ error: true }}
        error={formState.roleError === "" ? false : true}
      >
        {appRoles?.map((role) => (
          <MenuItem key={role._id} value={role._id}>
            {role.role}
          </MenuItem>
        ))}
      </TextField>

      <ButtonGroup sx={styles.buttonsGroup}>
        <Button sx={styles.registerButton}>{textRes.registerBtnName}</Button>
      </ButtonGroup>
    </Box>
  );
};

export default RegisterForm;
