import { ComponentStylesType } from "../../ComponentStylesType";

const styles: ComponentStylesType = {
  viewPort: {
    width: "400px",
  },
  inputField: {
    marginTop: "6px",
    marginBottom: "4px",
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "black",
    },
  },
  buttonGroup:{
    paddingRight: "14px",
    paddingLeft: "14px"
  },
  button: {

  }
};

export default styles;
