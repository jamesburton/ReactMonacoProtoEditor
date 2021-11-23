import createPersistedState from "use-persisted-state";
const stateKey = "expanded:json";
const useJsonExpandedState = createPersistedState(stateKey);

const useExpanded = (initialValue) => {
  const [expanded, setExpanded] = useJsonExpandedState(initialValue);

  return {
    expanded,
    setExpanded: (value) =>
      setExpanded(typeof value === "undefined" ? true : !!value),
    open: () => setExpanded(true),
    close: () => setExpanded(false),
    toggle: () => setExpanded((previous) => !previous)
  };
};

export default useExpanded;
