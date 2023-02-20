import {
  Alert,
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  FormControlLabel,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";
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

  // get local settings store ---------------------------------------------------

  // form state variable --------------------------------------------------------
  const [formState, setFormState] = useState(initialFormState);

  return (
    <Box>
      <Alert severity={formState.alertType}>{formState.alertMessage}</Alert>
      <TextField value={formState.email} helperText={formState.emailError} />
      <FormControlLabel label="remember me" control={<Checkbox value={formState.rememberMe} />} />
      <TextField value={formState.password} helperText={formState.passwordError} />
      <ButtonGroup>
        <Button>Login</Button>
      </ButtonGroup>
    </Box>
  );
};

export default LoginForm;
