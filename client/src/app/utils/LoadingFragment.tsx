import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import styles from "./LoadingFragment.styles";
import { RootState } from "../../store/store";

interface LoadingFragmentPropsType {
  routing?: boolean;
}

const LoadingFragment: React.FunctionComponent<LoadingFragmentPropsType> = ({
  routing = false,
}) => {
  const navigate = useNavigate();
  const appUser = useSelector(
    (state: RootState) => state.appSettings.value.currentUser
  );

  useEffect(() => {
    if (routing) {
      if (appUser)
        navigate("/app"); // TODO: update this after login is implemented
      else
        navigate("/login-register");  
    }
  }, [appUser, navigate, routing]);

  return (
    <Box sx={styles.animationContainer}>
      <CircularProgress sx={styles.spinner} />
    </Box>
  );
};

export default LoadingFragment;
