import { types, applySnapshot, destroy } from "mobx-state-tree";
import ProtoService from "./ProtoService";
import ProtoMessage from "./ProtoMessage";
import ProtoOption from "./ProtoOption";
//import { execAll } from "../utils";

import {
  // commentsRegex,
  // syntaxRegex,
  // packageRegex,
  // serviceRegex,
  // methodRegex,
  // messageRegex,
  // propertyRegex,
  // optionRegex,
  // stripComments,
  // stripSyntax,
  // stripPackage,
  // stripServices,
  // stripMessages,
  // stripMethods,
  // stripProperties,
  // stripOptions,
  parseGRPC
} from "../protoHelpers.js";

let ProtoFile = types
  .model("ProtoFile", {
    id: types.identifier,
    // text: types.string, // NB: You can pass a model with just .text to be parse, or use .setText to set from modified text
    syntaxLine: types.maybeNull(types.maybe(types.string)),
    //syntaxVersion: types.optional(types.number, 3),
    syntaxVersion: 3,
    imports: types.optional(types.array(types.string), []),
    packageName: types.maybeNull(types.maybe(types.string)),
    //messageMatches: types.maybe(types.array(types.frozen())),
    options: types.maybeNull(types.maybe(types.array(ProtoOption))),
    //options: types.maybe(types.array(types.frozen())),
    //services: types.maybe(types.array(ProtoService)),
    service: types.maybeNull(types.maybe(ProtoService)),
    //service: types.maybe(types.frozen()),
    messages: types.maybeNull(types.maybe(types.array(ProtoMessage))),
    //messages: types.maybeNull(types.maybe(types.array(types.frozen()))),
    diagnostics: types.maybeNull(types.maybe(types.frozen())),
    remainingText: types.maybeNull(types.maybe(types.string))
  })
  .volatile((self) => ({
    listeners: []
  }))
  .views((self) => ({
    get filename() {
      return `${self.id}.proto`;
    },
    get text() {
      return `syntax = "proto${self.syntaxVersion}";
${self.importsText}
package ${self.packageName};

${self.optionsText}
${self.serviceText}

${self.messagesText}
`;
    },
    get optionsText() {
      return !self.options?.length
        ? ""
        : [...self.options].map((o) => o.text).join("\r\n") + "\r\n";
    },
    get importsText() {
      return !self.imports?.length
        ? ""
        : 'import "' + [...self.imports].join('";\r\nimport "') + '";\r\n';
    },
    get serviceText() {
      return !self.service ? "" : self.service.text;
    },
    get messagesText() {
      return !self.messages?.length
        ? "// Message classes to be added here\r\n"
        : [...self.messages].map((message) => message.text).join("\r\n\r\n");
    }
  }))
  .actions((self) => ({
    // onCreate() {
    //   // if (self.text) {
    //   //   self.setFromText();
    //   // }
    // },
    setText: (text) => {
      try {
        var newSnapshot = parseGRPC(self.id, text);
      } catch (ex) {
        console.error(ex);
        alert(ex.toString());
      }
      try {
        applySnapshot(self, newSnapshot);
        alert("Applied snapshot");
      } catch (ex) {
        alert(ex.toString());
        console.error(ex);
        throw ex;
      }
      if (self.listeners) {
        for (var listener of self.listeners) {
          listener(text);
        }
      }
    },
    setSyntaxVersion: (version) => (self.syntaxVersion = version),
    setPackageName: (name) => (self.packageName = name),
    addListener(fn) {
      self.listeners = [...self.listeners, fn];
    },
    removeListener(fn) {
      self.listeners = self.listeners?.filter((listener) => listener !== fn);
    },
    addImport(name) {
      self.imports.push(name);
    },
    removeImport(name) {
      self.imports.remove(name);
    },
    setImports(imports) {
      self.imports = imports;
    },
    editImport(oldName, newName) {
      self.imports = [...self.imports].map((i) =>
        i === oldName ? newName : i
      );
    },
    clearImports() {
      self.setImports([]);
    },
    addOption(name, value) {
      if (!self.options) self.options = [];
      self.options.push({ name, value });
    },
    removeOption(option) {
      destroy(option);
    },
    addService(name) {
      if (self.service)
        return console.warn(
          "Cannot add a service when one already exists, use rename instead."
        );
      self.service = { name, methods: [] /*, remainingText */ };
      //self.service = ProtoService.create({ name, methods: []/*, remainingText */ });
    }
  }));
ProtoFile = types.snapshotProcessor(ProtoFile, {
  preProcessor(snapshot) {
    return snapshot.text ? parseGRPC(snapshot.id, snapshot.text) : snapshot;
  }
});

export default ProtoFile;
