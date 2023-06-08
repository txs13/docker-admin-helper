import { ComponentStylesType } from "../ComponentStylesType";

const styles: ComponentStylesType = {
  viewPort: {
    height: "100%",
    width: "100%",
  },
  flexBox: {
    height: "100%",
    minWidth: "100%",
    maxWidth: "100%",
    display: "flex",
    flexDirection: "row",
    background: "green",
  },
  tabsList: {},
  fragmentPort: {
    flex: "1",
    height: "100%",
    background: "yellow",
    // can't explain how it works with overflow: "hidden", the idea was found here:
    // https://stackoverflow.com/questions/75884242/datagrids-suddenly-stretched-their-parents-to-fit-them-in-full-capacity-without
    overflow: "hidden",
  },
};

export default styles;