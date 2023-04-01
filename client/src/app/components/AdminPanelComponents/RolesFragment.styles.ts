import { ComponentStylesType } from "../../ComponentStylesType";

const styles: ComponentStylesType = {
  viewPort: {
    width: "100%",
    height: "100%",
  },
  grid: {
    "& .MuiDataGrid-cell:focus": {
      outline: "none"
    }
  }
};

export default styles;
