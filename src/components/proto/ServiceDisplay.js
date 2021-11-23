import { useCallback } from "react";
// import Typography from "@mui/material/Typography";
// import Alert from "@mui/material/Alert";
// import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ShrinkSvg from "../ShrinkSvg";
// import Loading from "./components/Loading";
import MethodsDisplay from "./MethodsDisplay";
import NameSpan from "./NameSpan";
import KeywordSpan from "./KeywordSpan";
import { observer } from "mobx-react-lite";
import styled from "@emotion/styled";

const ServiceWrapper = styled("div")`
  margin-bottom: 0.125rem;
`;

let ServiceDisplay = ({ service }) => {
  const { remainingText } = service;
  const renameClick = useCallback(() => {
    var name = prompt(
      "What should the service be called",
      service.name
    )?.trim();
    if (name === service.name) return;
    if (!name) return console.warn("No name entered, cancelling rename");
    service.setName(name);
  }, [service]);
  return (
    <ServiceWrapper>
      <div
        style={{
          position:
            "relative" /* NB: This ensures absolute position SpeedDial is within this block */
        }}
      >
        <div>
          <KeywordSpan>service </KeywordSpan>
          <NameSpan>{service.name}</NameSpan>
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
          {"{"}
        </div>
        <MethodsDisplay
          methods={service.methods}
          addMethod={service.addMethod}
        />
        {!!remainingText?.length && (
          <>
            <h4>Remaining Text (currently unprocessed)</h4>
            <pre>{remainingText}</pre>
          </>
        )}
        <div>{"}"}</div>
      </div>
    </ServiceWrapper>
  );
};
ServiceDisplay = observer(ServiceDisplay);

export default ServiceDisplay;
