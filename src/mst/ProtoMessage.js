import { types, destroy } from "mobx-state-tree";
import ProtoProperty from "./ProtoProperty";
import ProtoOption from "./ProtoOption";

const ProtoMessage = types
  .model("ProtoMessage", {
    name: types.identifier,
    properties: types.array(ProtoProperty),
    options: types.array(ProtoOption),
    remainingText: types.maybeNull(types.maybe(types.string))
  })
  .views((self) => ({
    get text() {
      return `message ${self.name} {
${
  !self.options?.length
    ? ""
    : "\t\t" +
      [...self.options].map((option) => `${option.text}`).join("\r\n\t\t")
}
${
  !self.properties?.length
    ? "\t// Add message properties here e.g. int63 id = 123;"
    : "\t" + [...self.properties].map((prop) => `${prop.text}`).join("\r\n\t")
}
}`;
    },
    get warnings() {
      return [...(self.propertyWarnings ?? [])];
    },
    get propertyWarnings() {
      return (
        self.properties &&
        [...self.properties].reduce(
          (prev, curr) => {
            if (prev.indexes.includes(curr.propertyIndex)) {
              prev.warnings = [
                ...(prev.warnings ?? []),
                `The property index ${curr.propertyIndex} is repeated`
              ];
            } else {
              prev.indexes.push(curr.propertyIndex);
            }
            if (prev.names.includes(curr.name)) {
              prev.warnings = [
                ...(prev.warnings ?? []),
                `The property name ${curr.name} is repeated`
              ];
            } else {
              prev.names.push(curr.name);
            }
            return prev;
          },
          { names: [], indexes: [] }
        ).warnings
      );
    }
  }))
  .actions((self) => ({
    setName: (name) => (self.name = name),
    setRemainingText: (value) => (self.remainingText = value),
    setProperties: (properties) => (self.properties = properties),
    addProperty: (property) => {
      if (!property.propertyIndex)
        property.propertyIndex = self.nextPropertyIndex;
      self.properties.push(property);
      return self.properties[self.properties.length - 1];
    },
    removeProperty: (property) => destroy(property),
    setOptions: (options) => (self.options = options),
    addOption(name, value) {
      if (!self.options) self.options = [];
      self.options.push({ name, value });
    },
    removeOption(option) {
      destroy(option);
    }
  }));

export default ProtoMessage;
