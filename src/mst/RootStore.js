import { types } from "mobx-state-tree";
import ProtoFile from "./ProtoFile";
import postsProto from "../proto/posts.proto";
import posts2Proto from "../proto/posts2.proto";
import searchProto from "../proto/search.proto";
import libraryProto from "../proto/library.proto";
import protosProto from "../proto/protos.proto";
import { iteratorIncludes } from "../utils";

import { parseGRPC } from "../protoHelpers";

let RootStore = types
  .model("RootStore", {
    selectedProtoFile: types.maybe(types.reference(ProtoFile)),
    //protoFiles: types.optional(types.array(ProtoFile), [])
    protoFiles: types.map(ProtoFile)
  })
  .views((self) => ({
    get protoFileNames() {
      return [...self.protoFiles.keys()];
    }
  }))
  .actions((self) => ({
    setSelectedProtoFile(id) {
      self.selectedProtoFile = id;
    },
    loadExample: (id, importedBase64DataOctetStream) =>
      self.protoFiles.set(id, {
        id,
        text: atob(
          importedBase64DataOctetStream.replace(
            "data:application/octet-stream;base64,",
            ""
          )
        )
      }),
    loadExample2: (id, importedBase64DataOctetStream) => {
      var decoded = atob(
        importedBase64DataOctetStream.replace(
          "data:application/octet-stream;base64,",
          ""
        )
      );
      console.debug({ id, decoded });
      var protoFile = parseGRPC(id, decoded);
      console.debug(protoFile);
      self.protoFiles.set(id, protoFile);
    },
    loadExamples() {
      self.loadExample("search", searchProto);
      self.selectedProtoFile = "search";
      self.loadExample2("posts", postsProto);
      self.loadExample("posts2", posts2Proto);
      self.loadExample("protos", protosProto);
      self.selectedProtoFile = "posts2";
      try {
        self.loadExample2("library", libraryProto);
        self.selectedProtoFile = "library";
      } catch (ex) {
        console.error(ex);
      }
    },
    createProtoFile(id, text = undefined) {
      if (iteratorIncludes(self.protoFiles.keys(), id)) {
        throw new Error(`The name ${id} is already in use`);
      }
      self.protoFiles.set(id, { id, text });
      return self.protoFiles.get(id);
    }
  }));

export const rootStore = RootStore.create({});
rootStore.loadExamples();

export default rootStore;
