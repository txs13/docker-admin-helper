import {
  Box,
  FormControlLabel,
  IconButton,
  MenuItem,
  Switch,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Add } from "@mui/icons-material";

import { getTextResources } from "../../../resources/getTextResources";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../../resources/getTextResources.types";
import { RoleDocument } from "../../../store/features/appState.types";
import { RootState } from "../../../store/store";
import styles from "./RolesFragment.styles";
import RoleForm from "../UserRoleComponents/RoleForm";
import { handleModalOpen } from "../../../store/storeServices/modalStateServices";
import { ModalForms } from "../../../store/features/modalState.types";
import { useNavigate } from "react-router-dom";

interface RolesFragmentPropsType {
  roleID?: string;
}

type MenuValue = "role" | "description";

interface FilterMenuItem {
  id: string;
  label: string;
  value: MenuValue;
}

interface UserFilters {
  field: MenuValue;
  filterValue: string;
  showPublic: boolean;
}

const RolesFragment: React.FunctionComponent<RolesFragmentPropsType> = ({
  roleID,
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

  // get roles from the store----------------------------------------------------
  const roles = useSelector(
    (state: RootState) => state.usersRoles.value.appRoles || []
  );
  const [filteredRoles, setFilteredRoles] = useState<RoleDocument[]>([]);

  // open role details modal if we have one -------------------------------------
  useEffect(() => {
    if (roleID) {
      handleModalOpen(ModalForms.ROLE_FORM, { id: roleID });
    }
  }, [roleID]);

  const columns: GridColDef[] = [
    {
      field: "_id",
      headerName: textRes.idTableColumnHeader,
      minWidth: 150,
      align: "left",
      headerAlign: "center",
    },
    {
      field: "role",
      headerName: textRes.roleTableColumnHeader,
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
    { id: "1", label: textRes.roleNameFilterMenuItem, value: "role" },
    {
      id: "2",
      label: textRes.roleDescFilterMenuItem,
      value: "description",
    },
  ];
  const [filters, setFilters] = useState<UserFilters>({
    field: "role",
    filterValue: "",
    showPublic: false,
  });
  const filtersChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "field":
        setFilters({ ...filters, field: e.target.value as MenuValue });
        break;
      case "filterValue":
        setFilters({ ...filters, filterValue: e.target.value });
        break;
      case "showPublic":
        setFilters({ ...filters, showPublic: !filters.showPublic });
        break;
    }
  };
  useEffect(() => {
    let rolesToFilter: RoleDocument[] = [...roles];
    // step one - apply field filter
    if (filters.filterValue) {
      rolesToFilter =
        rolesToFilter.filter((role) => {
          switch (filters.field) {
            case "role":
              return role.role
                .toLowerCase()
                .includes(filters.filterValue.toLowerCase());
            case "description":
              return role.description
                ?.toLowerCase()
                .includes(filters.filterValue.toLowerCase());
            default:
              return false;
          }
        }) || [];
    }
    // step two - apply public filter
    if (filters.showPublic) {
      rolesToFilter = rolesToFilter.filter(
        (role) => !role.role.toLowerCase().includes("admin")
      );
    }
    setFilteredRoles(rolesToFilter);
  }, [filters.field, filters.filterValue, filters.showPublic, roles]);

  // page event handlers -----------------------------------------------------
  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    //handleModalOpen(ModalForms.ROLE_FORM, { id: params.row._id });
    navigate(`/adminpanel/roles/${params.row._id}`);
  };

  const addRoleClickHandler = () => {
    handleModalOpen(ModalForms.ROLE_FORM);
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
        {textRes.rolesTabHeader}
      </Typography>
      <Toolbar
        sx={{ ...styles.toolbar, backgroundColor: theme.palette.grey[300] }}
      >
        <TextField
          select
          name="field"
          value={filters.field}
          onChange={filtersChangeHandler}
          sx={styles.searchFieldLabel}
          label={textRes.searchFieldLabel}
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
              name="showPublic"
              onChange={filtersChangeHandler}
              value={filters.showPublic}
              size="small"
              defaultChecked={false}
            />
          }
          label={textRes.onlyPublicSwitchLabel}
        />
        <IconButton
          aria-label="delete"
          size="large"
          onClick={addRoleClickHandler}
        >
          <Add fontSize="inherit" />
          {isSmallScreen ? null : (
            <Typography>{textRes.addRoleBtnLabel}</Typography>
          )}
        </IconButton>
      </Toolbar>
      <DataGrid
        sx={styles.grid}
        slots={{}}
        slotProps={{}}
        onRowClick={handleRowClick}
        getRowId={(row: RoleDocument) => row?._id}
        columns={columns}
        sortModel={[{ field: "role", sort: "asc" }]}
        rows={filteredRoles || []}
        autoHeight
      />
    </Box>
  );
};

export default RolesFragment;
