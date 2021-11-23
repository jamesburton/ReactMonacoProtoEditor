import { useCallback } from "react";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import OptionWrapper from "./OptionWrapper";
import OptionDisplay from "./OptionDisplay";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";

// const OptionsWrapper = styled("div")`
const OptionsWrapper = styled("ul")`
  margin-bottom: 0.5rem;
  list-style: none;
  padding-inline-start: 0;
`;

let Options = ({ options, addOption }) => {
  const addOptionClick = useCallback(() => {
    var optionName = prompt("What is the name of the new option?");
    if (!optionName) return;
    var value = prompt("What is the option value?", '""');
    if (!value) return;
    addOption(optionName, value);
  }, [addOption]);
  return (
    <OptionsWrapper>
      {options ? (
        [...options].map((o) => <OptionDisplay option={o} key={o.name} />)
      ) : (
        //[...options].map((o) => <li key={o.name}>{o.name}</li>)
        <em>No options</em>
      )}
      {/* <div>
        <pre>
          options={options ? JSON.stringify(options, null, 2) : typeof options}
          !!options={(!!options).toString()}
          option count={options?.length}
        </pre>
      </div> */}
      {/* {options &&
        [...options].map((o, i) => (
          <div key={i}>
            <pre>
              #{i}: {JSON.stringify(o, null, 2)}
            </pre>
          </div>
        ))} */}
      <OptionWrapper>
        <Button color="primary" size="small" onClick={addOptionClick}>
          <AddIcon />
          Add option
        </Button>
      </OptionWrapper>
    </OptionsWrapper>
  );
};

Options = observer(Options);

export default Options;
