import createPersistedState from "use-persisted-state";
const stateKey = "expanded:monaco";
const useMonacoExpandedState = createPersistedState(stateKey);

const useExpanded = (initialValue) => {
  const [expanded, setExpanded] = useMonacoExpandedState(initialValue);

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
