import { ComponentStylesType } from "./ComponentStylesType";

const styles: ComponentStylesType = {
  toolbar: {
    alignItems: "center",
  },
  logoBox: {
    display: "flex",
    flexGrow: 1,
    height: "100%",
    alignItems: "center",
    gap: "10px",
  },
  logo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: "10px",
    paddingLeft: "7px",
    paddingRight: "7px",
    borderRadius: "0.5em",
    background: "#90a4ae",
  },
  logoText: {
    fontSize: "1.1em",
  },
  buttonsBox: {
    display: "flex",
    flexDirection: "row-reverse",
    flexGrow: 1,
  },
  button: {
    display: "block",
    color: "inherit",
  },
};

export default styles;
