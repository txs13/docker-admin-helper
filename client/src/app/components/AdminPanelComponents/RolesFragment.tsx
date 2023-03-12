import { Box, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getTextResources } from "../../../resources/getTextResources";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../../resources/getTextResources.types";
import { RoleDocument } from "../../../store/features/appState.types";
import { RootState } from "../../../store/store";
import styles from "./RolesFragment.styles";

const RolesFragment: React.FunctionComponent = () => {
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

  // get roles from the store
  const roles = useSelector(
    (state: RootState) => state.usersRoles.value.appRoles
  );

  const columns: GridColDef[] = [
    { field: "_id", headerName: textRes.idTableColumnHeader },
    {
      field: "role",
      headerName: textRes.roleTableColumnHeader,
    },
    {
      field: "description",
      headerName: textRes.descriptionTableColumnHeader,
    },
    {
      field: "createdAt",
      headerName: textRes.createdAtTableColumnHeader,
    },
    {
      field: "updatedAt",
      headerName: textRes.updatedAtTableColumnHeader,
    },
    {
      field: "__v",
      type: "number",
      headerName: textRes.versionTableColumnHeader,
    },
  ];

  return (
    <Box sx={styles.viewPort}>
      <Typography>{textRes.rolesTabHeader}</Typography>
      <Toolbar></Toolbar>
      <DataGrid
        getRowId={(row: RoleDocument) => row?._id}
        columns={columns}
        rows={roles || []}
        autoHeight
      />
    </Box>
  );
};

export default RolesFragment;
