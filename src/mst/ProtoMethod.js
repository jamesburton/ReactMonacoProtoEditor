import { types } from "mobx-state-tree";
import ProtoOption from "./ProtoOption";

const ProtoMethod = types
  .model("ProtoMethod", {
    name: types.string,
    parameterRepeated: false,
    parameterStream: false,
    parameterType: types.string,
    returnRepeated: false,
    returnStream: false,
    returnType: types.maybe(types.string),
    options: types.array(ProtoOption),
    innerText: types.maybeNull(types.maybe(types.string))
  })
  .views((self) => ({
    get text() {
      return `rpc ${self.name}(${self.parameterStream ? "stream " : ""}${
        self.parameterType
      }) returns (${self.returnStream ? "stream " : ""}${self.returnType}) {
${
  !self.options?.length
    ? ""
    : "\t\t" +
      [...self.options].map((option) => `${option.text}`).join("\r\n\t\t")
}${self.innerText ? `\r\n{self.innerText}` : ""}
  }`;
    }
  }))
  .actions((self) => ({
    setName: (name) => (self.name = name),
    setParameterRepeated: (value) => (self.parameterRepeated = !!value),
    setParameterStream: (value) => (self.parameterStream = !!value),
    setParameterType: (type) => (self.parameterType = type),
    setReturnRepeated: (value) => (self.returnRepeated = !!value),
    setReturnStream: (value) => (self.returnStream = !!value),
    setReturnType: (type) => (self.returnType = type)
  }));

export default ProtoMethod;
