import { useCallback } from "react";
import ValueSpan from "./ValueSpan";
import ShrinkSvg from "../ShrinkSvg";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

const SyntaxDisplay = ({ version, setVersion }) => {
  const renameClick = useCallback(() => {
    var newVersion = prompt(
      "What version would you like to set this to?",
      version
    );
    if (!newVersion)
      return console.debug("No new version provided, exiting without change");
    try {
      newVersion = parseInt(newVersion, 10);
    } catch (ex) {
      console.error(`Expected a numeric version, received: ${newVersion}`);
      return alert(`Expected a numeric version, received: ${newVersion}`);
    }
    if (version === newVersion)
      return console.debug(
        `newVersion = oldVersion (= ${version}), so exiting without change`
      );
    setVersion(newVersion);
  }, [version, setVersion]);
  return (
    <div>
      syntax = <ValueSpan>"proto{version}"</ValueSpan>;
      <ShrinkSvg>
        <IconButton
          color="primary"
          size="small"
          aria-label="rename"
          onClick={renameClick}
        >
          <EditIcon />
        </IconButton>
      </ShrinkSvg>
    </div>
  );
};

export default SyntaxDisplay;
