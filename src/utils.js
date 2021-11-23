// Function to feturn an iterator as an array
// From https://stackoverflow.com/a/65997629
export function* execAll(str, regex) {
  if (!regex.global) {
    console.error(
      "RegExp must have the global flag to retrieve multiple results."
    );
  }

  let match;
  // eslint-disable-next-line
  while ((match = regex.exec(str))) {
    yield match;
  }
}

// NB: Method to extract decoded text from imported non-json files (such as .proto files)
export const base64DataOctetStreamToString = (dataStream) =>
  atob(dataStream.replace("data:application/octet-stream;base64,", ""));

// A method to check if an iterator contains a given value
export const iteratorIncludes = (it, value) => {
  for (var x of it) {
    if (x === value) return true;
  }
  return false;
};
