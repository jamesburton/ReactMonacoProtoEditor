import { types, getParent } from "mobx-state-tree";

const ProtoOption = types
  .model("ProtoOption", {
    name: types.string,
    value: types.maybe(types.string)
  })
  .views((self) => ({
    get file() {
      return getParent(getParent(self));
    },
    get text() {
      return `option ${self.name} = ${self.value};`;
    }
  }))
  .actions((self) => ({
    remove() {
      self.file.removeOption(self);
    },
    setName: (name) => (self.name = name),
    setValue: (value) => (self.value = value)
  }));

export default ProtoOption;
