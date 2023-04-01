import { Box, Toolbar, Typography } from "@mui/material";
import { DataGrid, GridColDef, GridEventListener } from "@mui/x-data-grid";
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
import RoleForm from "../UserRoleComponents/RoleForm";
import { handleModalOpen } from "../../../store/storeServices/modalStateServices";
import { ModalForms } from "../../../store/features/modalState.types";

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

  const handleRowClick: GridEventListener<"rowClick"> = (params) => {
    handleModalOpen(ModalForms.ROLE_FORM, { id: params.row._id });
  };

  return (
    <Box sx={styles.viewPort}>
      <Typography>{textRes.rolesTabHeader}</Typography>
      <Toolbar></Toolbar>
      <DataGrid
      sx={styles.grid}
      slots={{}}
      slotProps={{}}
        onRowClick={handleRowClick}
        getRowId={(row: RoleDocument) => row?._id}
        columns={columns}
        sortModel={[{ field: "role", sort: "asc" }]}
        rows={roles || []}
        autoHeight
      />
    </Box>
  );
};

export default RolesFragment;
