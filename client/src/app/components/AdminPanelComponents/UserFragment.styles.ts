import { ComponentStylesType } from "../../ComponentStylesType";

const styles: ComponentStylesType = {
  viewPort: {
    width: "100%",
    height: "100%",
  },
  header: {
    textTransform: "uppercase",
  },
  toolbar: {
    marginTop: "5px",
    marginBottom: "10px",
    gap: "10px",
  },
  grid: {
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  },
};

export default styles;
