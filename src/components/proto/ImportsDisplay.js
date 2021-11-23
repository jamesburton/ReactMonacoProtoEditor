import { useCallback } from "react";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";
import Button from "@mui/material/Button";
import KeywordSpan from "./KeywordSpan";
import ValueSpan from "./ValueSpan";
import ShrinkSvg from "../ShrinkSvg";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CopyIcon from "@mui/icons-material/ContentCopy";

const ImportsWrapper = styled("ul")`
  list-style: none;
  padding-inline-start: 0;
`;

const ImportWrapper = styled("li")``;

let ImportDisplay = ({ name, onEdit, onDelete, onCopy }) => {
  return (
    <ImportWrapper>
      <KeywordSpan>import </KeywordSpan>
      <ValueSpan>"{name}"</ValueSpan>

      <ShrinkSvg>
        <IconButton
          color="primary"
          size="small"
          aria-label="edit"
          onClick={onEdit}
        >
          <EditIcon />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          aria-label="delete"
          onClick={onDelete}
        >
          <DeleteIcon />
        </IconButton>
        <IconButton
          color="error"
          size="small"
          aria-label="copy"
          onClick={onCopy}
        >
          <CopyIcon />
        </IconButton>
      </ShrinkSvg>
    </ImportWrapper>
  );
};
ImportDisplay = observer(ImportDisplay);

let ImportsDisplay = ({ file }) => {
  const { imports, addImport, editImport, removeImport, clearImports } = file;
  const addClick = useCallback(() => {
    const name = prompt("What package would you like to import?");
    if (!name)
      return console.debug(
        `No name specified, so existing add import routine.`
      );
    addImport(name);
  }, [addImport]);
  //const clearClick = useCallback(() => clearImports(), [clearImports]);
  const clearClick = useCallback(() => {
    var answer =
      window && window.confirm(`Are you sure you wish to clear the imports?`);
    if (!answer) return;
    clearImports();
  }, [clearImports]);
  const editClick = useCallback(
    (name) => {
      var newName = prompt(
        "What would you like to change the import to?",
        name
      );
      if (!name)
        return console.warn(
          `No new name was provided, so "${name}" was not renamed.`
        );
      if (newName === name)
        return console.debug(
          "No name change, existing without modifying imports"
        );
      editImport(name, newName);
    },
    [editImport]
  );
  const deleteClick = useCallback(
    (name) => {
      var answer =
        window &&
        window.confirm(`Are you sure you wish to remove the import "${name}"`);
      if (!answer) return;
      removeImport(name);
    },
    [removeImport]
  );
  const copyClick = useCallback(
    (name) => {
      var answer =
        window && window.prompt("What is the new import name?", name);
      if (!answer) return;
      addImport(answer);
    },
    [addImport]
  );

  return (
    <ImportsWrapper>
      {imports &&
        [...imports].map((imp, i) => (
          <ImportDisplay
            name={imp}
            key={i}
            remove={() => removeImport(imp)}
            onEdit={() => editClick(imp)}
            onDelete={() => deleteClick(imp)}
            onCopy={() => copyClick(imp)}
          />
        ))}
      <ImportWrapper>
        <Button onClick={addClick}>Add Import</Button>
        <Button onClick={clearClick}>Clear Imports</Button>
      </ImportWrapper>
    </ImportsWrapper>
  );
};

ImportsDisplay = observer(ImportsDisplay);

export default ImportsDisplay;
