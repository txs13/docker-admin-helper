import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useTheme } from "@emotion/react";

import { RootState } from "../store/store";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";
import AccountCircle from "@mui/icons-material/AccountCircle";
import styles from "./AppNavbar.styles";

interface MenuItemType {
  key: "SETTINGS" | "PROFILE" | "LOGIN_REGISTER" | "LOGOUT" | "ABOUT";
  text: string;
}

const AppNavbar: React.FunctionComponent = () => {
  const appUser = useSelector(
    (state: RootState) => state.appSettings.value.currentUser
  );
  const appLanguage = useSelector(
    (state: RootState) => state.appState.value.appLanguage
  );
  const theme = useTheme();
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);

  useEffect(() => {
    if (appUser) {
      setMenuItems([
        { key: "LOGIN_REGISTER", text: " " },
        { key: "ABOUT", text: "" },
      ]);
    } else {
      setMenuItems([
        { key: "PROFILE", text: " " },
        { key: "SETTINGS", text: "" },
        { key: "LOGOUT", text: "" },
      ]);
    }
  }, [appUser]);

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters variant="dense" sx={styles.toolbar}>
          <Box sx={styles.logoBox}>
            <Box sx={styles.logo}>
              <Box>
                <CoPresentTwoToneIcon color="action" fontSize="large" />
              </Box>
              <Typography sx={styles.logoText} variant="h6">
                Docker Admin Helper
              </Typography>
            </Box>
            <Button sx={styles.button} variant="outlined">
              About App
            </Button>
          </Box>
          <Box sx={styles.buttonsBox}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Button sx={styles.button} variant="outlined">
              App Button 2
            </Button>
            <Button sx={styles.button} variant="outlined">
              App Button 1
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default AppNavbar;
