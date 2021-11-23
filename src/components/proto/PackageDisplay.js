import KeywordSpan from "./KeywordSpan";
import ShrinkSvg from "../ShrinkSvg";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const PackageDisplay = ({ name, onEdit }) => {
  return (
    <div>
      <KeywordSpan>package </KeywordSpan>
      {name};
      <ShrinkSvg>
        <IconButton
          color="primary"
          size="small"
          aria-label="edit"
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
      </ShrinkSvg>
    </div>
  );
};

export default PackageDisplay;
