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
import AccountCircle from "@mui/icons-material/AccountCircle";
import CoPresentTwoToneIcon from "@mui/icons-material/CoPresentTwoTone";

import { RootState } from "../store/store";
import styles from "./AppNavbar.styles";
import { getTextResources } from "../resources/getTextResources";
import {
  FormsNames,
  LocalizedTextResources,
} from "../resources/getTextResources.types";

enum MenuItemKeys {SETTINGS, PROFILE, LOGIN_REGISTER, LOGOUT, ABOUT}

interface MenuItemType {
  key: MenuItemKeys;
  text: string;
}

const AppNavbar: React.FunctionComponent = () => {
  const appUser = useSelector(
    (state: RootState) => state.appState.value.currentUser
  );
  const appLanguage = useSelector(
    (state: RootState) => state.appState.value.appLanguage
  );

  const [textRes, setTextRes] = useState<LocalizedTextResources>({});
  
  const [menuItems, setMenuItems] = useState<MenuItemType[]>([]);
  const [anchorElMenu, setAnchorElMenu] = React.useState<null | HTMLElement>(
    null
  );
  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(event.currentTarget);
  };
  const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElMenu(null);
    if ((event.target as HTMLElement).id) {
        const id = Number((event.target as HTMLElement).id);
        switch (id) {
          case MenuItemKeys.LOGIN_REGISTER:
            console.log("login-register");
            break;
          case MenuItemKeys.ABOUT:
            console.log("about");
            break;
          case MenuItemKeys.LOGOUT:
            console.log("logout");
            break;
          case MenuItemKeys.SETTINGS:
            console.log("settings");
            break;
          case MenuItemKeys.PROFILE:
            console.log("profile");
            break;
        }
    }
  };

  useEffect(() => {
    const updTextRes = getTextResources(appLanguage, FormsNames.NAVBAR);
    if (JSON.stringify(updTextRes) !== JSON.stringify(textRes)) {
        setTextRes(updTextRes);
    }

    if (appUser) {
      setMenuItems([
        { key: MenuItemKeys.LOGIN_REGISTER, text: textRes.loginRegisterMenuitem || " " },
        { key: MenuItemKeys.ABOUT, text: textRes.aboutMenuitem || " " },
      ]);
    } else {
      setMenuItems([
        { key: MenuItemKeys.PROFILE, text: textRes.profileMenuItem || " " },
        { key: MenuItemKeys.SETTINGS, text: textRes.settingsMenuItem || " " },
        { key: MenuItemKeys.LOGOUT, text: textRes.logoutMenuItem || " " },
      ]);
    }
  }, [appUser, textRes, appLanguage]);

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
              onClick={handleMenu}
            >
              <AccountCircle fontSize="large"/>
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElMenu}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElMenu)}
              onClose={handleCloseMenu}
            >
              {menuItems.map((menuItem) => (
                <MenuItem key={menuItem.key} onClick={handleCloseMenu}>
                  <Typography id={menuItem.key.toString()} textAlign="center">
                    {menuItem.text}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>

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
