import { ComponentStylesType } from "../ComponentStylesType";

const styles: ComponentStylesType = {
  viewPort: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto",
    alignItems: "center",
    justifyItems: "center",
  },
  formPort: {
    width: {
      xs: "100%",
      sm: "500px",
    },
    height: {
      xs: "100%",
      sm: "auto",
    },
  },
  tabsList: {
    borderBottom: 1,
    borderColor: "divider",
  },
  innerFormPort: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: {
      xs: "auto",
      sm: "30% 70%",
    },
    gridTemplateRows: "auto",
    alignItems: "center",
    justifyItems: "center",
  },
  logoBox: {
    height: "100%",
    width: "100%",
    display: {
      xs: "none",
      sm: "grid",
    },
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto",
    alignItems: "center",
    justifyItems: "center",
  },
  logoPicture: {
    fontSize: "4em",
  },
  loginForm: {
    height: "100%",
    width: "100%",
  },
  registerForm: {
    height: "100%",
    width: "100%",
  },
};

export default styles;
