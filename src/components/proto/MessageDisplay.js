import { useCallback } from "react";
import PropertiesDisplay from "./PropertiesDisplay";
import styled from "@emotion/styled";
import KeywordSpan from "./KeywordSpan";
import NameSpan from "./NameSpan";
import { observer } from "mobx-react-lite";
import ShrinkSvg from "../ShrinkSvg";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Options from "./Options";
import DiagnosticWrapper from "./DiagnosticWrapper";
import Indent from "../Indent";
import Alert from "@mui/material/Alert";

const MessageWrapper = styled("div")`
  margin-bottom: 0.125rem;
  position: relative;
`;

let MessageDisplay = ({ message }) => {
  const renameClick = useCallback(() => {
    var name = prompt(
      "What should the message be called",
      message.name
    )?.trim();
    if (name === message.name) return;
    if (!name) return console.warn("No name entered, cancelling rename");
    message.setName(name);
  }, [message]);
  const {
    options,
    addOption,
    remainingText,
    diagnostics,
    removeProperty,
    warnings
  } = message;
  const onDeleteProperty = useCallback(
    (prop) => {
      removeProperty(prop);
    },
    [removeProperty]
  );
  return (
    <MessageWrapper>
      <div>
        <KeywordSpan>message </KeywordSpan>
        <NameSpan>{message.name}</NameSpan>
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
        {" {"}
      </div>
      <Indent>
        <Options options={options} addOption={addOption} />
      </Indent>
      <PropertiesDisplay
        properties={message.properties}
        onDelete={onDeleteProperty}
      />
      {!!warnings?.length &&
        warnings.map((warning, i) => (
          <Alert key={i} severity="warning">
            {warning}
          </Alert>
        ))}
      {!!remainingText?.length && (
        <>
          <h4>Remaining Text (currently unprocessed)</h4>
          <pre>{remainingText}</pre>
        </>
      )}
      {diagnostics && (
        <DiagnosticWrapper>
          <h4>Diagnostics</h4>

          <pre>{JSON.stringify(diagnostics, null, 2)}</pre>
        </DiagnosticWrapper>
      )}
      <div>{"}"}</div>
    </MessageWrapper>
  );
};

MessageDisplay = observer(MessageDisplay);

export default MessageDisplay;
