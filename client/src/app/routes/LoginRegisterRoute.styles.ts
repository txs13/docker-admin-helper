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
      sm: "500px"
    },
    height: {
      xs: "100%",
      sm: "auto"
    }
  },
  tabsList: {
    borderBottom: 1,
    borderColor: "divider",
  },
};

export default styles;