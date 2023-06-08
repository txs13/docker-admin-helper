import {
  Box,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
  FormControlLabel,
  Switch,
  IconButton,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { DataGrid, GridEventListener, GridColDef } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";

import { getTextResources } from "../../../resources/getTextResources";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../../resources/getTextResources.types";
import { RootState } from "../../../store/store";
import styles from "./UserFragment.styles";
import { UserDocument } from "../../../store/features/appState.types";
import {
  handleModalClose,
  handleModalOpen,
} from "../../../store/storeServices/modalStateServices";
import { ModalForms } from "../../../store/features/modalState.types";

interface UsersFragmentPropsType {
  userID?: string;
}

type MenuValue = "email" | "name" | "familyname" | "company" | "description";

interface FilterMenuItem {
  id: string;
  label: string;
  value: MenuValue;
}

interface UserFilters {
  field: MenuValue;
  filterValue: string;
  showUnconfirmed: boolean;
}

const UsersFragment: React.FunctionComponent<UsersFragmentPropsType> = ({
  userID,
}) => {
  // handle screen size change --------------------------------------------------
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // navigate -------------------------------------------------------------------
  const navigate = useNavigate();

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
  }, [textRes, appLanguage]);

  // get users from the store----------------------------------------------------
  const users = useSelector(
    (state: RootState) => state.usersRoles.value.appUsers
  );
  const [filteredUsers, setFilteredUsers] = useState<UserDocument[]>([]);

  // open role details modal if we have one -------------------------------------
  useEffect(() => {
    if (userID) {
      handleModalOpen(ModalForms.USER_FORM, { id: userID });
    } else {
      handleModalClose();
    }
  }, [userID]);

  const columns: GridColDef[] = [
    {
      field: "isConfirmed",
      headerName: textRes.isConfirmedTableColumnHeader,
      minWidth: 150,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "_id",
      headerName: textRes.idTableColumnHeader,
      minWidth: 150,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "email",
      headerName: textRes.emailTableColumnHeader,
      minWidth: 150,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "name",
      headerName: textRes.nameTableColumnHeader,
      minWidth: 150,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "familyname",
      headerName: textRes.familynameTableColumnHeader,
      minWidth: 150,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "company",
      headerName: textRes.familynameTableColumnHeader,
      minWidth: 150,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "description",
      headerName: textRes.descriptionTableColumnHeader,
      minWidth: 300,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "createdAt",
      headerName: textRes.createdAtTableColumnHeader,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "updatedAt",
      headerName: textRes.updatedAtTableColumnHeader,
      minWidth: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "__v",
      type: "number",
      headerName: textRes.versionTableColumnHeader,
      minWidth: 50,
      align: "center",
      headerAlign: "center",
    },
  ];

  // filter handling block ---------------------------------------------------
  const menuItems: FilterMenuItem[] = [
    { id: "1", label: textRes.emailFilterMenuItem, value: "email" },
    { id: "2", label: textRes.nameFilterMenuItem, value: "name" },
    { id: "3", label: textRes.familynameFilterMenuItem, value: "familyname" },
    { id: "4", label: textRes.companyFilterMenuItem, value: "company" },
    {
      id: "5",
      label: textRes.descFilterMenuItem,
      value: "description",
    },
  ];
  const [filters, setFilters] = useState<UserFilters>({
    field: "name",
    filterValue: "",
    showUnconfirmed: false,
  });
  const filtersChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "field":
        setFilters({ ...filters, field: e.target.value as MenuValue });
        break;
      case "filterValue":
        setFilters({ ...filters, filterValue: e.target.value });
        break;
      case "showUnconfirmed":
        setFilters({ ...filters, showUnconfirmed: !filters.showUnconfirmed });
        break;
    }
  };

  useEffect(() => {
    let usersToFilter: UserDocument[] = [...(users || [])];
    // step one - apply field filter
    if (filters.filterValue) {
      usersToFilter = usersToFilter.filter((user) => {
        switch (filters.field) {
          case "company":
            return user.company
              ?.toLocaleLowerCase()
              .includes(filters.filterValue.toLowerCase());
          case "description":
            return user.description
              ?.toLocaleLowerCase()
              .includes(filters.filterValue.toLowerCase());

          case "email":
            return user.email
              .toLocaleLowerCase()
              .includes(filters.filterValue.toLowerCase());

          case "familyname":
            return user.familyname
              ?.toLocaleLowerCase()
              .includes(filters.filterValue.toLowerCase());

          case "name":
            return user.name
              .toLocaleLowerCase()
              .includes(filters.filterValue.toLowerCase());
          default:
            return false;
        }
      });
    }
    // step two - apply only UNconfirmed filter
    if (filters.showUnconfirmed) {
      usersToFilter = usersToFilter.filter((user) => !user.isConfirmed);
    }
    setFilteredUsers(usersToFilter);
  }, [filters.field, filters.filterValue, filters.showUnconfirmed, users]);

  // page event handlers -----------------------------------------------------
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    navigate(`/adminpanel/users/${params.row._id}`);
  };

  const addUserClickHandler = () => {
    handleModalOpen(ModalForms.USER_FORM);
  };

  return (
    <Box sx={styles.viewPort}>
      <Typography
        sx={{
          ...styles.header,
          borderBottom: `solid ${theme.palette.primary.main}`,
          color: theme.palette.primary.main,
        }}
      >
        {textRes.usersTabHeader}
      </Typography>
      <Toolbar
        sx={{ ...styles.toolbar, backgroundColor: theme.palette.grey[300] }}
      >
        <TextField
          select
          name="field"
          sx={styles.searchFieldLabel}
          label={textRes.searchFieldLabel}
          onChange={filtersChangeHandler}
          value={filters.field}
          variant="standard"
        >
          {menuItems.map((item) => (
            <MenuItem key={item.id} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </TextField>
        <TextField
          name="filterValue"
          onChange={filtersChangeHandler}
          value={filters.filterValue}
          sx={styles.searchWhatLabel}
          label={textRes.searchWhatLabel}
          variant="standard"
        />
        <FormControlLabel
          control={
            <Switch
              name="showUnconfirmed"
              onChange={filtersChangeHandler}
              value={filters.showUnconfirmed}
              size="small"
              defaultChecked={false}
            />
          }
          label={textRes.onlyUnconfirmedSwitchLabel}
        />
        <IconButton
          aria-label="add-user"
          size="large"
          onClick={addUserClickHandler}
        >
          <Add fontSize="inherit" />
          {isSmallScreen ? null : (
            <Typography>{textRes.addUserBtnLabel}</Typography>
          )}
        </IconButton>
      </Toolbar>
      <DataGrid
        sx={styles.grid}
        slots={{}}
        slotProps={{}}
        onRowClick={handleRowClick}
        getRowId={(row: UserDocument) => row?._id}
        columns={columns}
        sortModel={[{ field: "name", sort: "asc" }]}
        rows={filteredUsers || []}
        autoHeight
      />
    </Box>
  );
};

export default UsersFragment;
