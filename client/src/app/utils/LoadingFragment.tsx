import React, { useEffect } from "react";
import { Box, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import styles from "./LoadingFragment.styles";
import emailToPath from "./emailToPath";
import { RootState } from "../../store/store";

interface LoadingFragmentPropsType {
  routing?: boolean;
}

const LoadingFragment: React.FunctionComponent<LoadingFragmentPropsType> = ({
  routing = false
}) => {
  const navigate = useNavigate();
  const currentUser = useSelector((state: RootState) => state.appState.value.currentUser);
  const appState = useSelector((state: RootState) => state.appState.value);

  useEffect(() => {
    if (routing) {
      if (currentUser)
        navigate(`/${emailToPath(currentUser)}`);
      else
        navigate("/login-register");  
    }
  }, [appState, currentUser, navigate, routing]);

  return (
    <Box sx={styles.animationContainer}>
      <CircularProgress sx={styles.spinner} />
    </Box>
  );
};

export default LoadingFragment;
