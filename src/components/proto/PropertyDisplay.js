import { useCallback } from "react";
import KeywordSpan from "./KeywordSpan";
import ValueSpan from "./ValueSpan";
import PropertyWrapper from "./PropertyWrapper";
import IconButton from "@mui/material/IconButton";
import ShrinkSvg from "../ShrinkSvg";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { observer } from "mobx-react-lite";

let PropertyDisplay = ({ property }) => {
  const {
    reserved,
    repeated,
    type,
    setType,
    name,
    setName,
    defaultValue,
    propertyIndex,
    setPropertyIndex,
    setDefaultValue,
    remove
  } = property;
  const renameClick = useCallback(() => {
    const newName = prompt("What do you want to set the name to?", name);
    if (!newName?.length)
      return console.debug(`No new name provided, exiting without changes.`);
    if (name === newName)
      return console.debug(
        `New name is same as old name (${name}), exiting without change.`
      );
    setName(newName);
  }, [name, setName]);
  const changeTypeClick = useCallback(() => {
    const newType = prompt("What do you want to set the type to?", type);
    if (!newType?.length)
      return console.debug(`No new type provided, exiting without changes.`);
    if (type === newType)
      return console.debug(
        `New type is same as old type (${type}), exiting without change.`
      );
    setType(newType);
  }, [type, setType]);
  const deleteClick = useCallback(() => {
    if (
      !window &&
      window.prompt(`Are you sure you wish to delete property ${name}?`)
    )
      return;
    remove();
  }, [name, remove]);
  const changeValueClick = useCallback(() => {
    const newValue = prompt(
      "What do you want to set the value/default to (empty for none)?",
      defaultValue
    );
    if (!newValue)
      return console.debug(`No new value provided, exiting without changes.`);
    if (defaultValue === newValue)
      return console.debug(
        `New value is same as old value (${defaultValue}), exiting without change.`
      );
    setDefaultValue(newValue.length ? newValue : undefined);
  }, [defaultValue, setDefaultValue]);
  const changePropertyIndexClick = useCallback(() => {
    var newIndex = prompt(
      "What do you want as the new index?",
      propertyIndex.toString()
    );
    if (!newIndex) return;
    newIndex = parseInt(newIndex, 10);
    setPropertyIndex(newIndex);
  }, [propertyIndex, setPropertyIndex]);
  return (
    <PropertyWrapper>
      {reserved && <KeywordSpan>reserved </KeywordSpan>}
      {repeated && <KeywordSpan>repeated </KeywordSpan>}
      {type ?? "/*MissingType*/"}
      <ShrinkSvg>
        <IconButton
          color="primary"
          size="small"
          aria-label="change type"
          onClick={changeTypeClick}
        >
          <EditIcon />
        </IconButton>
      </ShrinkSvg>{" "}
      {name}
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
      {" = "}
      <ValueSpan>{propertyIndex}</ValueSpan>
      <ShrinkSvg>
        <IconButton
          color="primary"
          size="small"
          aria-label="change property index"
          onClick={changePropertyIndexClick}
        >
          <EditIcon />
        </IconButton>
      </ShrinkSvg>
      {defaultValue && (
        <>
          {/*<pre>${defaultValue}</pre>*/}
          {defaultValue}
        </>
      )}
      <ShrinkSvg>
        <IconButton
          color="secondary"
          size="small"
          aria-label="changeValue"
          onClick={changeValueClick}
        >
          <EditIcon />
        </IconButton>
      </ShrinkSvg>
      ;
      <ShrinkSvg>
        <IconButton
          color="error"
          size="small"
          aria-label="delete"
          onClick={deleteClick}
        >
          <DeleteIcon />
        </IconButton>
      </ShrinkSvg>
    </PropertyWrapper>
  );
};

PropertyDisplay = observer(PropertyDisplay);

export default PropertyDisplay;
