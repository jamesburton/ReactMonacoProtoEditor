import { StrictMode } from "react";
import ReactDOM from "react-dom";
//import registerProtobuf from "monaco-proto";
import registerProtobuf from "./registerProtobuf.js";
import { loader } from "@monaco-editor/react";
import App from "./App";
import { RootStoreProvider } from "./contexts/RootStoreContext";
import rootStore from "./mst/RootStore";

loader.init().then((monaco) => {
  console.log("here is the monaco instance:", monaco);
  registerProtobuf(monaco);
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <RootStoreProvider value={rootStore}>
      <App />
    </RootStoreProvider>
  </StrictMode>,
  rootElement
);
