import { useCallback } from "react";
import ValueSpan from "./ValueSpan";
import KeywordSpan from "./KeywordSpan";
import OptionWrapper from "./OptionWrapper";
import ShrinkSvg from "../ShrinkSvg";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { observer } from "mobx-react-lite";

let OptionDisplay = ({ option }) => {
  const { name, setName, value, setValue, remove } = option;
  const onChangeName = useCallback(() => {
    const newName = prompt("What do you want to name the option?", name);
    if (!newName)
      return console.debug("No new name provided, exiting without changes.");
    if (name === newName)
      return console.debug(
        `New name same as old name (${name}), exiting without changes.`
      );
    setName(newName);
  }, [name, setName]);
  const onChangeValue = useCallback(() => {
    const newValue = prompt(
      "What value do you want to set for the option?",
      value
    );
    if (!newValue)
      return console.debug("No new value provided, exiting without changes.");
    if (value === newValue)
      return console.debug(
        `New value same as old value (${value}), exiting without changes.`
      );
    setValue(newValue);
  }, [value, setValue]);
  const onDelete = useCallback(() => remove(), [remove]);

  return (
    <OptionWrapper>
      <KeywordSpan>option </KeywordSpan>
      <span>{name}</span>
      <ShrinkSvg>
        <IconButton
          color="primary"
          size="small"
          aria-label="edit"
          onClick={onChangeName}
        >
          <EditIcon />
        </IconButton>
      </ShrinkSvg>
      =<ValueSpan>{value}</ValueSpan>;
      <ShrinkSvg>
        <IconButton
          color="primary"
          size="small"
          aria-label="edit"
          onClick={onChangeValue}
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
      </ShrinkSvg>
    </OptionWrapper>
  );
};
OptionDisplay = observer(OptionDisplay);

export default OptionDisplay;
