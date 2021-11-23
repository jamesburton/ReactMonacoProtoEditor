import { useCallback } from "react";
import PropertyDisplay from "./PropertyDisplay";
import styled from "@emotion/styled";
import Loading from "../Loading";
import PropertyWrapper from "./PropertyWrapper";
import Button from "@mui/material/Button";
import { observer } from "mobx-react-lite";

const PropertiesList = styled("ul")`
  list-style: none; /* margin-bottom: 0.25rem; */
`;

let PropertiesDisplay = ({ properties /*, onDelete*/, clear }) => {
  const addClick = useCallback(() => {
    //alert("PropertiesDisplay.addClick has yet to be implemented");
    const type =
      window &&
      window.prompt(
        `What type do you want to use for the property?\r\n\r\nstring | int32 | int64 | ClassName | Package.NameSpace.ClassName | etc.`
      );
    if (!type?.length) return;
    const name = window.prompt("What would you like to call the new property?");
    if (!name?.length) return;
    const defaultValue = window.prompt(
      `Would you like to set a default value?\r\n(Enter an empty string for no default)`
    );
    if (!defaultValue) return;
    properties.push({ type, name, defaultValue });
  }, [properties]);
  const clearClick = useCallback(() => {
    //alert("PropertiesDisplay.clearClick has yet to be implemented");
    clear();
  }, [clear]);
  const onDelete = useCallback((prop) => properties.remove(prop), [properties]);

  return !properties ? (
    <Loading />
  ) : !properties.length ? (
    <div>
      <em>No properties currently configured</em>
    </div>
  ) : (
    <PropertiesList>
      {properties.map((prop) => (
        <PropertyDisplay
          key={prop.name}
          property={prop}
          onDelete={() => onDelete(prop)}
        />
      ))}
      <PropertyWrapper>
        <Button color="primary" onClick={addClick}>
          Add Property
        </Button>
        <Button color="error" onClick={clearClick}>
          Clear Properties
        </Button>
      </PropertyWrapper>
    </PropertiesList>
  );
};

PropertiesDisplay = observer(PropertiesDisplay);

export default PropertiesDisplay;
