import { ComponentStylesType } from "../../ComponentStylesType";

const styles: ComponentStylesType = {
  viewPort: {
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    textTransform: "uppercase",
  },
  grid: {
    "& .MuiDataGrid-cell:focus": {
      outline: "none",
    },
  },
  toolbar: {
    marginTop: "5px",
    marginBottom: "10px",
    gap: "10px",
  },
  searchFieldLabel: {},
  searchWhatLabel: {},
};

export default styles;
