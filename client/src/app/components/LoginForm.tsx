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
import store, { RootState } from "../../store/store";
import styles from "./LoginForm.styles";
import { loginService } from "../../store/storeServices/sessionServices";
import { LoginInput } from "../../store/features/appState.types";
import { validateResoucesAsync } from "../../validation/validateResources";
import {
  loginDataSchema,
  LoginDataInput,
} from "../../validation/userAndRoleValidation.scheme";

interface FormValidationErrors {
  emailError: string;
  passwordError: string;
}

interface FormState extends FormValidationErrors, LoginInput {
  alertMessage: string;
  alertType: "error" | "info";
  rememberMe: boolean;
}

const initialFormState: FormState = {
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

  // set email if it is stored in cookies
  useEffect(() => {
    const appCookies = store.getState().appState.value.cookiesData;
    if (appCookies?.storedEmail) {
      setFormState({...formState, email: appCookies.storedEmail});
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // form state variable --------------------------------------------------------
  const [formState, setFormState] = useState<FormState>(initialFormState);

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

  // login button click handler
  const loginClickHandler = async () => {
    const loginInput: LoginDataInput = {
      email: formState.email,
      password: formState.password,
    };
    // validate input data
    const errors: any[] = await validateResoucesAsync(
      loginDataSchema,
      loginInput
    );
    if (!errors) {
      // if no errors proceed with login
      console.log(formState.rememberMe);
      const result = await loginService(loginInput as LoginInput, formState.rememberMe);
      const storeAppState = store.getState().appState.value;
      console.log(storeAppState);
    } else {
      // if there are errors - process errors and show relevant messages
      const errorMessages: FormValidationErrors = {
        emailError: "",
        passwordError: "",
      };
      errors.forEach((error) => {
        if (error.path["0"] === "email") {
          errorMessages.emailError = error.message;
        }
        if (error.path["0"] === "password") {
          errorMessages.passwordError = error.message;
        }
      });
      setFormState({
        ...formState,
        ...errorMessages,
        alertType: "error",
        alertMessage: textRes.notValidLoginCredentialsMessage,
      });
    }
  };

  const onDownEnter: React.FormEventHandler = (
    e: React.KeyboardEvent<HTMLElement>
  ) => {
    if (e.key === "Enter") {
      loginClickHandler();
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
        inputRef={emailInputRef}
        value={formState.email}
        onChange={onInputChange}
        helperText={formState.emailError}
        FormHelperTextProps={{ error: true }}
        error={formState.emailError === "" ? false : true}
        onKeyDown={onDownEnter}
      />

      <FormControlLabel
        sx={styles.checkbox}
        label={textRes.rememberUserEmailLabel}
        control={
          <Checkbox
            value={formState.rememberMe}
            defaultChecked
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
        onKeyDown={onDownEnter}
      />

      <ButtonGroup sx={styles.buttonsGroup}>
        <Button sx={styles.loginButton} onClick={loginClickHandler}>
          {textRes.loginBtnName}
        </Button>
      </ButtonGroup>
    </Box>
  );
};

export default LoginForm;