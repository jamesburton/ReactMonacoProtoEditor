import { useContext } from "react";
import RootStoreContext from "../contexts/RootStoreContext";

const useRootStore = () => useContext(RootStoreContext);

export default useRootStore;
