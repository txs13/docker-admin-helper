import { keyframes } from "@mui/material";
import { ComponentStylesType } from "../ComponentStylesType";

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const styles: ComponentStylesType = {
  animationContainer: {
    height: "100%",
    width: "100%",
    display: "grid",
    gridTemplateColumns: "auto",
    gridTemplateRows: "auto",
    alignItems: "center",
    justifyItems: "center",
  },
  spinner: {
    top: "50%",
    width: "64px",
    height: "64px",
    border: "8px solid",
    borderRadius: "50%",
    animation: `${spin} 1.2s linear infinite`,
  },
};

export default styles;
