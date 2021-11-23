import { PixelSpinner } from "react-epic-spinners";

const Loading = ({ color = "rgba(8,8,8,0.3)" }) => (
  <PixelSpinner color={color} />
);

export default Loading;
