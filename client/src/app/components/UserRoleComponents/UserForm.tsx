import {
  Box,
  Button,
  ButtonGroup,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { ModalFormProps } from "../../../store/features/modalState.types";
import styles from "./UserForm.styles";
import { UserDocument } from "../../../store/features/appState.types";
import { RootState } from "../../../store/store";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../../resources/getTextResources.types";
import { getTextResources } from "../../../resources/getTextResources";
import { handleModalClose } from "../../../store/storeServices/modalStateServices";
import { resolveUserById } from "../../../store/storeServices/usersRolesServices";

interface UserFormPropsType {
  formProps?: ModalFormProps;
  showForm: boolean;
}

interface FormState extends UserDocument {
  nameError: string;
  familynameError: string;
  emailError: string;
  phoneError: string;
  addressError: string;
  companyError: string;
  positionError: string;
  descriptionError: string;
  isConfirmedError: string;
  userroleError: string;
  editingMode: boolean;
  showPassword: boolean;
}

interface FormValidationErrors {
  nameError?: string;
  familynameError?: string;
  emailError?: string;
  phoneError?: string;
  addressError?: string;
  companyError?: string;
  positionError?: string;
  descriptionError?: string;
  isConfirmedError?: string;
  userroleError?: string;
}

interface IsConfirmedMenuItem {
  id: string;
  label: string;
  value: string;
}

const initialFormState: FormState = {
  _id: "",
  name: "",
  nameError: "",
  familyname: "",
  familynameError: "",
  email: "",
  emailError: "",
  phone: "",
  phoneError: "",
  address: "",
  addressError: "",
  company: "",
  companyError: "",
  position: "",
  positionError: "",
  description: "",
  descriptionError: "",
  password: "",
  showPassword: false,
  isConfirmed: false,
  isConfirmedError: "",
  userrole_id: "",
  userroleError: "",
  createdAt: new Date(),
  updatedAt: new Date(),
  __v: 0,
  editingMode: true,
};

const UserForm: React.FunctionComponent<UserFormPropsType> = ({
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
      takeUserDataFromStore();
    } else {
      // setting initial form value for new user
      setFormState(initialFormState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formProps, showForm]);

  const takeUserDataFromStore = () => {
    if (formProps?.id) {
      // getting user details and showing them
      const currentUser = resolveUserById(formProps.id);
      if (currentUser) {
        const newFormState: FormState = {
          ...currentUser,
          nameError: "",
          familynameError: "",
          emailError: "",
          phoneError: "",
          addressError: "",
          companyError: "",
          positionError: "",
          descriptionError: "",
          isConfirmedError: "",
          userroleError: "",
          showPassword: false,
          editingMode: false,
        };
        if (!newFormState.familyname) newFormState.familyname = "";
        setFormState(newFormState);
        if (!newFormState.phone) newFormState.phone = "";
        setFormState(newFormState);
        if (!newFormState.address) newFormState.address = "";
        setFormState(newFormState);
        if (!newFormState.company) newFormState.company = "";
        setFormState(newFormState);
        if (!newFormState.position) newFormState.position = "";
        setFormState(newFormState);
        if (!newFormState.description) newFormState.description = "";
        setFormState(newFormState);
      } else {
        // TODO: generate wrong role id error message
      }
    }
  };

  // roles list ----------------------------------------------------------------
  const roles = useSelector(
    (state: RootState) => state.usersRoles.value.appRoles
  );

  // handling right names for isConfirmed drop-down menu ------------------------
  const [isConfirmedMenu, setIsConfirmedMenu] = useState<IsConfirmedMenuItem[]>(
    [
      { id: "0", label: "true", value: "true" },
      { id: "1", label: "false", value: "false" },
    ]
  );
  useEffect(() => {
    setIsConfirmedMenu([
      { id: "0", label: textRes.userIsConfirmedMenuItem, value: "true" },
      { id: "1", label: textRes.userIsNotConfirmedMenuItem, value: "false" },
    ]);
  }, [textRes]);

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
        break;
      case "change":
        //setFormState({ ...formState, editingMode: true });
        break;
      case "add":
        break;
      case "delete":
        break;
      case "close":
        resolveParentUrlAndCloseModal();
        break;
    }
  };

  // helper functions ----------------------------------------------------------
  const resolveParentUrlAndCloseModal = () => {
    if (formProps?.id) {
      const regex = new RegExp(`/${formProps?.id}$`);
      navigate(location.pathname.replace(regex, ""));
    } else handleModalClose();
  };

  return (
    <Box sx={styles.viewPort}>
      <DialogTitle>
        {formProps?.id ? textRes.userFormHeader : textRes.newUserFormHeader}
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ ...styles.inputField, display: formProps?.id ? "" : "none" }}
          label={textRes.userIDInputLabel}
          value={formState._id}
          focused
          disabled
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userNameInputLabel}
          value={formState.name}
          helperText={formState.nameError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userFamilynameInputLabel}
          value={formState.familyname}
          helperText={formState.familynameError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userEmailInputLabel}
          value={formState.email}
          helperText={formState.emailError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userPhoneInputLabel}
          value={formState.phone}
          helperText={formState.phoneError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userAddressInputLabel}
          value={formState.address}
          helperText={formState.addressError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userCompanyInputLabel}
          value={formState.company}
          helperText={formState.companyError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userPositionInputLabel}
          value={formState.position}
          helperText={formState.positionError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userDescriptionInputLabel}
          value={formState.description}
          helperText={formState.descriptionError}
          fullWidth
        />
        <TextField
          sx={styles.inputField}
          label={textRes.userRoleInputLabel}
          value={formState.userrole_id}
          helperText={formState.userroleError}
          fullWidth
          select
        >
          {roles?.map((role) => (
            <MenuItem key={role._id} value={role._id}>
              {role.role}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={styles.inputField}
          label={textRes.userIsConfirmedInputLabel}
          value={formState.isConfirmed}
          fullWidth
          select
        >
          {isConfirmedMenu?.map((menuItem) => (
            <MenuItem key={menuItem.id} value={menuItem.value}>
              {menuItem.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          sx={{
            ...styles.inputField,
            display: formState.password ? "" : "none",
          }}
          label={textRes.userPasswordInputLabel}
          value={formState.description}
          helperText={formState.descriptionError}
          fullWidth
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
        <ButtonGroup>
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

export default UserForm;
