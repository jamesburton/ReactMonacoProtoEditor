import { useCallback } from "react";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ShrinkSvg from "../ShrinkSvg";
import NameSpan from "./NameSpan";
import KeywordSpan from "./KeywordSpan";
import { observer } from "mobx-react-lite";
import MethodItem from "./MethodItem";
import Options from "./Options";
import Indent from "../Indent";

let MethodDisplay = ({ method }) => {
  const {
    name,
    parameterStream,
    parameterType,
    returnStream,
    returnType,
    options,
    addOption
  } = method || {};
  const renameClick = useCallback(() => {
    var name = prompt("What should the method be called", method.name)?.trim();
    if (name === method.name) return;
    if (!name) return console.warn("No name entered, cancelling rename");
    method.setName(name);
  }, [method]);
  return (
    <MethodItem>
      <KeywordSpan>rpc </KeywordSpan>
      <NameSpan>{name}</NameSpan>
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
      ({parameterStream && <KeywordSpan>stream </KeywordSpan>}
      <NameSpan>{parameterType}</NameSpan>) returns (
      {returnStream && <KeywordSpan>stream</KeywordSpan>}
      <NameSpan>{returnType}</NameSpan>){"{"}
      <Indent>
        <Options options={options} addOption={addOption} />
      </Indent>
      {method.innerText && <pre>{method.innerText}</pre>}
      {"}"}
    </MethodItem>
  );
};
MethodDisplay = observer(MethodDisplay);

export default MethodDisplay;
