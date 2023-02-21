import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { getTextResources } from "../../resources/getTextResources";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../resources/getTextResources.types";
import { RootState } from "../../store/store";
import styles from "./LoginForm.styles";

const initialFormState: {
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  alertMessage: string;
  alertType: "error" | "info";
  rememberMe: boolean;
} = {
  email: "",
  emailError: "",
  password: "",
  passwordError: "",
  alertMessage: "",
  alertType: "info",
  rememberMe: true,
};

const LoginForm: React.FunctionComponent = () => {
  // set email and password input references
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);

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

  // form state variable --------------------------------------------------------
  const [formState, setFormState] = useState(initialFormState);
  
  // form state change handler
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
      case "remember":
        setFormState({
          ...formState,
          rememberMe: !formState.rememberMe,
          alertMessage: "",
        });
        break;
      default:
        // TODO navigate to error page
        throw new Error("wrong input element(s) name property");
    }
  };

  // get local settings store ---------------------------------------------------

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
        inputRef={emailInputRef}
        value={formState.email}
        onChange={onInputChange}
        helperText={formState.emailError}
        FormHelperTextProps={{ error: true }}
        error={formState.emailError === "" ? false : true}
      />

      <FormControlLabel
        sx={styles.checkbox}
        label={textRes.rememberUserEmailLabel}
        control={
          <Checkbox
            value={formState.rememberMe}
            onChange={onInputChange}
            name="remember"
          />
        }
      />

      <TextField
        sx={styles.passwordInput}
        variant="outlined"
        margin="dense"
        label={textRes.passwordInputLabel}
        name="password"
        type="password"
        inputRef={passwordInputRef}
        value={formState.password}
        onChange={onInputChange}
        helperText={formState.passwordError}
        FormHelperTextProps={{ error: true }}
        error={formState.passwordError === "" ? false : true}
      />

      <ButtonGroup sx={styles.buttonsGroup}>
        <Button sx={styles.loginButton}>{textRes.loginBtnName}</Button>
      </ButtonGroup>
    </Box>
  );
};

export default LoginForm;
