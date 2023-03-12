import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { getTextResources } from "../../../resources/getTextResources";
import {
  FormsNames,
  LocalizedTextResources,
} from "../../../resources/getTextResources.types";
import { RootState } from "../../../store/store";
import styles from "./UserFragment.styles";

const UsersFragment: React.FunctionComponent = () => {
  
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

  return (
    <Box sx={styles.viewPort}>USER FRAGMENT IS GOING TO BE HERE ONE DAY</Box>
  );
};

export default UsersFragment;
