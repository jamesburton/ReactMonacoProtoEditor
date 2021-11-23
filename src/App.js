import { useCallback, useEffect, useState } from "react";
import "./styles.css";
import Editor from "@monaco-editor/react";
import useRootStore from "./hooks/useRootStore";
import { observer } from "mobx-react-lite";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
//import Loading from "./components/Loading";
import DisplayProtoFile from "./components/proto/DisplayProtoFile";
import useEditorExpanded from "./hooks/useEditorExpanded";
import useMonacoExpanded from "./hooks/useMonacoExpanded";
import useJsonExpanded from "./hooks/useJsonExpanded";

let App = () => {
  const store = useRootStore();
  const [currentText, setCurrentText] = useState(store.selectedProtoFile?.text);
  const [previousText, setPreviousText] = useState(
    store.selectedProtoFile?.text
  );
  const changed = currentText !== previousText;
  const currentTextChange = useCallback(
    (text) => {
      //if(!changed) {
      setCurrentText(text);
      setPreviousText(text);
      //}
    },
    [setCurrentText, setPreviousText]
  );
  useEffect(() => {
    // An effect to update the current text
    // NB: Should run only when the selected proto file changes,
    if (store.selectedProtoFile) {
      //const selectedProtoFile = store.selectedProtoFile;
      const removeListener = store.selectedProtoFile.removeListener;
      store.selectedProtoFile.addListener(currentTextChange);
      //return () => store.selectedProtoFile.removeListener(currentTextChange);
      //return () => selectedProtoFile.removeListener(currentTextChange);
      return () => removeListener(currentTextChange);
    }
  }, [store.selectedProtoFile, currentTextChange]);
  const save = useCallback(
    (text) => {
      let { selectedProtoFile } = store;
      var id = prompt(
        "What do you want to call this file?",
        selectedProtoFile?.id
      );
      if (!id) return console.warn("No name provided, so unable to save");
      if (id !== selectedProtoFile?.id) {
        selectedProtoFile = store.createProtoFile(id, text);
        store.setSelectedProtoFile(id);
      } else {
        selectedProtoFile.setText(text);
      }
      // Ensure we have the refreshed (re-extracted version) to match
      text = selectedProtoFile.text;
      setPreviousText(text);
      setCurrentText(text);
      return selectedProtoFile;
    },
    [store, setPreviousText]
  );
  const saveClick = useCallback(() => save(currentText), [save, currentText]);
  const resetClick = useCallback(() => {
    setCurrentText(previousText);
    //setPreviousText(previousText);
  }, [setCurrentText, previousText]);

  const fileSelectChange = useCallback(
    (e) => {
      const value = e.target.value?.length ? e.target.value : undefined;
      if (store.selectedProtoFile?.id === value) return; // No change required
      store.setSelectedProtoFile(value);
      const text = store.selectedProtoFile?.text;
      setCurrentText(text);
      setPreviousText(text);
    },
    [store, setCurrentText, setPreviousText]
  );

  const { expandedEditor, toggleEditor } = useEditorExpanded();
  const { expandedMonaco, toggleMonaco } = useMonacoExpanded();
  const { expandedJson, toggleJson } = useJsonExpanded();

  return (
    <div className="App">
      <h1>Monaco Editor - Proto</h1>
      <h2>The monaco-editor configured for .proto files within React.</h2>
      <div>
        <label>File: </label>
        <select
          value={store.selectedProtoFile?.id || ""}
          onChange={fileSelectChange}
        >
          <option></option>
          {store.protoFileNames &&
            [...store.protoFileNames].map((file) => (
              <option key={file}>{file}</option>
            ))}
        </select>
        {/* <div>
          {store.protoFileNames
            ? JSON.stringify(store.protoFileNames, null, 2)
            : typeof store.protoFileNames}
        </div> */}
      </div>
      <Accordion expanded={expandedMonaco} toggle={toggleMonaco}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Monaco Editor
        </AccordionSummary>
        <AccordionDetails>
          <Editor
            height="50vh"
            language="protobuf"
            //theme="protobuf"
            theme="vs-dark" // "vs" | "vs-dark" | "hc-black"
            //value={protoExample}
            //value={protoExample2}
            // value={store.selectedProtoFile?.text || ""}
            // //onChange={(value) => store.selectedProtoFile?.setText(value)}
            // onBlur={(value) =>
            //   /*store.selectedProtoFile?.setText(value)*/ alert(value)
            // }
            // //onChange={(value) => alert(value)}
            // // onChange={(value) =>
            // //   alert(store.selectedProtoFile.setText.toString())
            // // }
            value={currentText}
            onChange={setCurrentText}
          />
        </AccordionDetails>
        {changed ? (
          <>
            <Alert severity="warning">Unsaved Changes</Alert>
            <Button variant="primary" onClick={saveClick}>
              Save
            </Button>
            <Button variant="warning" onClick={resetClick}>
              Reset
            </Button>
          </>
        ) : (
          <>
            <Alert severity="success">No Changes</Alert>
            <Button variant="primary" disabled>
              Save
            </Button>
            <Button variant="warning" disabled>
              Reset
            </Button>
          </>
        )}
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">
            View/Edit File -{" "}
            <em>
              {store.selectedProtoFile
                ? store.selectedProtoFile.filename
                : "No file selected"}
            </em>
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          {store.selectedProtoFile ? (
            <DisplayProtoFile file={store.selectedProtoFile} />
          ) : (
            <em>No protofile selected</em>
          )}
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          MST JSON View
        </AccordionSummary>
        <AccordionDetails>
          <div>
            <pre>{JSON.stringify(store, null, 2)}</pre>
          </div>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

App = observer(App);

export default App;
