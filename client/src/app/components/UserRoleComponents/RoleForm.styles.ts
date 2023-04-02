import { ComponentStylesType } from "../../ComponentStylesType";

const styles: ComponentStylesType = {
  viewPort: {
    width: "400px",
  },
  inputField: {
    marginTop: "4px",
    marginBottom: "4px",
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "black",
    },
  },
};

export default styles;
