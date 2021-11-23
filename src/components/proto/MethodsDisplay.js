import { useCallback } from "react";
import Loading from "../Loading";
import MethodDisplay from "./MethodDisplay";
import styled from "@emotion/styled";
import MethodItem from "./MethodItem";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";

const MethodList = styled("ul")`
  list-style: none;
  /* border: 1px solid fuchsia;
  padding: 0.125rem; */
`;

const MethodsDisplay = ({ methods, addMethod }) => {
  const addMethodClick = useCallback(() => {
    const name = prompt("What would you like to call the method?");
    if (!name)
      return console.warn("Cannot create a method without a name, exiting");
    if ([...(methods || [])].find((method) => method.name === name)) {
      console.warn(`A method already existing with the name ${name}, exiting.`);
      alert(
        `A method already exists with the name ${name}, please retry with a unique name or edit the existing method.`
      );
    }
  }, [methods]);
  return !methods ? (
    <Loading />
  ) : !methods.length ? (
    <div>
      <em>No methods currently configured</em>
    </div>
  ) : (
    <MethodList>
      {methods.map((m) => (
        <MethodDisplay key={m.name} method={m} />
      ))}
      <MethodItem>
        <Button color="primary" size="small" onClick={addMethodClick}>
          <AddIcon />
          Add method
        </Button>
      </MethodItem>
    </MethodList>
  );
};

export default MethodsDisplay;
