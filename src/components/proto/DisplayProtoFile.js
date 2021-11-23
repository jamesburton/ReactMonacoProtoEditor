import { useCallback } from "react";
import Messages from "./Messages";
import Options from "./Options";
import SyntaxDisplay from "./SyntaxDisplay";
import PackageDisplay from "./PackageDisplay";
//import Loading from "../Loading";
import ServiceDisplay from "./ServiceDisplay";
import styled from "@emotion/styled";
import { observer } from "mobx-react-lite";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import ImportsDisplay from "./ImportsDisplay";
import DiagnosticWrapper from "./DiagnosticWrapper";

const FileWrapper = styled(Paper)`
  width: 100%;
`;

const FileHeader = styled("h2")`
  background-color: 1px solid rgba(0, 0, 0, 0.25);
  padding: 0.125rem;
  width: 100%;
  margin: 0 0.25rem;
`;

let DisplayProtoFile = ({ file = {} }) => {
  const {
    //id,
    filename,
    //text,
    //syntaxLine,
    syntaxVersion,
    setSyntaxVersion,
    //imports,
    packageName,
    setPackageName,
    options,
    addOption,
    //services,
    service,
    messages,
    diagnostics,
    remainingText
  } = file;
  const createService = () => {
    var name = prompt("What do you want to call the service?");
    if (!name) return console.warn("Cannot create a service without a name");
    file.addService(name);
  };
  const packageEditClick = useCallback(() => {
    var name = prompt(
      "What do you want to change the package name to?",
      packageName
    );
    if (!name)
      return console.debug(
        "No alternate package name provided, no changes applied."
      );
    if (name === packageName)
      return console.debug(
        `Package name unchanged (${name}), no changes applied.`
      );
    setPackageName(name);
  }, [packageName, setPackageName]);
  return (
    <FileWrapper>
      <FileHeader>{filename}</FileHeader>
      <SyntaxDisplay version={syntaxVersion} setVersion={setSyntaxVersion} />
      <ImportsDisplay file={file} />
      {/* <div>
        <pre>
          imports = {imports ? JSON.stringify(imports) : typeof imports}
        </pre>
      </div> */}
      <PackageDisplay name={packageName} onEdit={packageEditClick} />
      {/* <div>
        <pre>
          options={options ? JSON.stringify(options, null, 2) : typeof options}
        </pre>
      </div> */}
      <Options options={options} addOption={addOption} />
      {/* <Services services={services} /> */}
      {service ? (
        <ServiceDisplay service={service} />
      ) : (
        <div>
          <em>No service defined/matched</em>
          <Button onClick={createService}>Add Service</Button>
        </div>
      )}
      <Messages messages={messages} />
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
    </FileWrapper>
  );
};
DisplayProtoFile = observer(DisplayProtoFile);

export default DisplayProtoFile;
