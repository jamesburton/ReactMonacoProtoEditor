import { types } from "mobx-state-tree";
import ProtoMethod from "./ProtoMethod";
import ProtoOption from "./ProtoOption";

const ProtoService = types
  .model("ProtoService", {
    //name: types.identifier, // This prohibits renaming
    name: types.string,
    methods: types.maybeNull(types.maybe(types.array(ProtoMethod))),
    options: types.maybeNull(types.maybe(types.array(ProtoOption))),
    remainingText: types.maybe(types.string)
  })
  .views((self) => ({
    get text() {
      return `service ${self.name} {
${
  !self.options?.length
    ? ""
    : "\t" +
      [...self.options].map((option) => `${option.text}`).join("\r\n\t") +
      "\r\n"
}
${
  !self.methods?.length
    ? "\t// Add service methods here e.g. rpc MyMethod(MethodRequest) returns (MethodResponse) {}"
    : "\t" +
      [...self.methods].map((method) => `${method.text}`).join("\r\n\t") +
      "\r\n"
}
}`;
    }
  }))
  .actions((self) => ({
    setName: (name) => (self.name = name?.trim()),
    addMethod: (name) => self.method.push({ name })
  }));

export default ProtoService;
