import { getParent, types } from "mobx-state-tree";

const ProtoProperty = types
  .model("ProtoProperty", {
    //text: types.string,
    reserved: false,
    repeated: false,
    type: types.maybe(types.string),
    name: types.maybe(types.string),
    // //defaultClause,
    propertyIndex: types.number,
    defaultValue: types.maybe(types.string)
  })
  .views((self) => ({
    get parent() {
      return getParent(getParent(self));
    },
    get message() {
      return getParent(getParent(self));
    },
    get text() {
      return `${self.reserved ? "reserved " : ""}${
        self.repeated ? "repeated " : ""
      }${self.type} ${self.name} = ${self.propertyIndex}${
        self.defaultValue ? ` ${self.defaultValue}` : ""
      };`;
    }
  }))
  .actions((self) => ({
    remove() {
      self.parent.removeProperty(self);
    },
    setReserved: (value) => (self.reserved = value),
    setRepeated: (value) => (self.repeated = value),
    setType: (type) => (self.type = type),
    setName: (name) => (self.name = name),
    setPropertyIndex: (value) => (self.propertyIndex = value),
    setDefaultValue: (value) => (self.defaultValur = value),
    clearDefaultValue: () => self.setDefaultValue()
  }));

export default ProtoProperty;
