import { execAll } from "./utils";

// export const commentsRegex = /(?:\/\/(?:\\\n|[^\n])*\n)|(?:\/\*[\s\S]*?\*\/)|((?:R"([^(\\\s]{0,16})\([^)]*\)\2")|(?:@"[^"]*?")|(?:"(?:\?\?'|\\\\|\\"|\\\n|[^"])*?")|(?:'(?:\\\\|\\'|\\\n|[^'])*?'))/g;
// export const multiLineCommentsRegex = /\*(\*(?!\/)|[^*])*\*/g;
// export const singleLineCommentsRegex = /\/\/*?\r/g;
export const commentsRegex = /(\/\/.*| ?\/\*[^]*?\*\/)(,?)$/gm;
// export const syntaxRegex = /syntax\w.=\w."([a-xA-Z0-9]*)";/g;
export const syntaxRegex = /syntax\s*=\s*"proto([23])";/g;
export const importRegex = /\bimport\s+"([^"]+)"\s*;/g;
export const packageRegex = /\bpackage\s+([^ ]+)\s*;/g;
// export const serviceRegex = /.*service\s+([^{]+)\s*[:]?([^{]+){([^}]+)}/gm;
// export const serviceRegex = /\s*service\s+([^{]+)\s*{([^}]+)}/gm; // Removed inheritance synatax copied from class reading
//export const serviceRegex = /\s*service\s+([^{]+)\s*{(([^}]+{\s*})*([^}]+))}/gm; // Removed inheritance synatax copied from class reading
//export const serviceRegex = /\s*service\s+([^{]+)\s*{(([^}]+{([^{}]*{([^{}]*{[^{}]*}[^{}]*)*[^{}]*}[^{}]*)*\s*})*([^}]*))}/gm;
export const serviceRegex = /\bservice\s+([^\s]*)\s*{(((\s*)|([^{}]*)|({(({(({[^}]*})|([^{}]*))+})|([^{}]*))*}))*)}/gm;
//export const methodRegex = /\s*rpc\s+(\w+)\s*\(\s*(stream\s*)?(\w+)\)\s+returns\s+\(\s*(stream\s+)?(\w+)\)\s*\{\s*([^}]+)*\s*\}/gm;
//export const methodRegex = /\s+rpc\s+(\w+)\s*\(\s*(stream\s*)?(repeated\s*)?([\w.]*)\s*\)\s*returns\s*\(\s*(stream\s*)?(repeated\s*)?([\w.]*)\s*\)\s*{((\s*option\s*\([\w.]*\)\s*=[^;]*;)*[^}]*)}/g;
//export const methodRegex = /\s+rpc\s+(\w+)\s*\(\s*(stream\s*)?(repeated\s*)?([\w.]*)\s*\)\s*returns\s*\(\s*(stream\s*)?(repeated\s*)?([\w.]*)\s*\)\s*{((\s*option\s*\([\w.]*\)\s*=[^;]*;)*[^}]*)}/g;
export const methodRegex = /\brpc\s+(\w+)\((stream\s+)?(repeated\s+)?([\w.]+)\)\s*returns\s*\((stream\s+)?(repeated\s+)?([\w.]+)\)\s*{((({(({[^}]*})|([^{}]*))+})|([^{}]*))*)?}/gm;
//export const messageRegex = /.*message\s+([^{]+)\s*[:]?([^{]+){([^}]+)}/gm;
//export const messageRegex = /\bmessage\s+([^{]+)\s*{([^}]+)}/gm; // Removed inheritance synatax copied from class reading
export const messageRegex = /\bmessage\s+([^\s]*)\s*{(((\s*)|([^{}]*)|({(({(({[^}]*})|([^{}]*))+})|([^{}]*))*}))*)}/gm;
//export const propertyRegex = /\s*(reserved\s+)?(repeated\s)?(string|int64|int32)\s+([a-zA-Z_0-9])(\s*=\s*[a-zA-Z0-9_!]+)?;/g;
//export const propertyRegex = /\s*(reserved\s+)?(repeated\s)?(string|int64|int32|([a-zA-Z0-9_]+)+)\s+(=[^;]+)?;/gm;
//export const propertyRegex = /(reserved\s+)?(repeated\s+)?(string|int32|int64|[\w]+)\s+([\w]+)\s*(=\s*([^;]+)\s*)?;/gm;
//export const propertyRegex = /\b(reserved\s+)?(repeated\s+)?(string|int32|int64|[\w.]+)\s+([\w]+)(\s*=\s*("[^"]"|[^;]+))?\s*;/gm;
export const propertyRegex = /\b(reserved\s+)?(repeated\s+)?([\w.]+)\s+([\w.]+)\s*=\s+([0-9]*[1-9][0-9]*)\s*(\[([^\]]*)\])?;/gm;
//export const optionRegex = /\boption\s+(\w+)\s*=\s*(("[^"]*")|([^;]+));/gm;
export const optionRegex = /\boption\s+([\w().]+)\s*=\s*(("[^"]*")|([^;]+));/gm;
export const optionMatchToOption = ([_fullText, name, value]) => ({
  name,
  value
});
export const stripComments = (text) => text && text.replace(commentsRegex, "");
//export const stripComments = (text) => text && text.replace(multiLineCommentsRegex, "").replace(singleLineCommentsRegex, "");
export const stripSyntax = (text) =>
  text && text.replace(syntaxRegex, "").trim();
export const stripImports = (text) =>
  text && text.replace(importRegex, "").trim();
export const stripPackage = (text) =>
  text && text.replace(packageRegex, "").trim();
export const stripServices = (text) =>
  text && text.replace(serviceRegex, "").trim();
export const stripMessages = (text) =>
  text && text.replace(messageRegex, "").trim();
export const stripMethods = (text) =>
  text && text.replace(methodRegex, "").trim();
export const stripProperties = (text) =>
  text && text.replace(propertyRegex, "").trim();
export const stripOptions = (text) =>
  text && text.replace(optionRegex, "").trim();

export const parseMessage = (name, innerText) => {
  const optionMatches = [...execAll(innerText, optionRegex)];
  const options = optionMatches.map(optionMatchToOption);
  let remainingText = stripOptions(innerText);
  // const propertyMatches = [...execAll(innerText, propertyRegex)];
  const propertyMatches = [...execAll(remainingText, propertyRegex)];
  // //const properties = propertyMatches?.map((match) => JSON.stringify(match));
  //const properties = propertyMatches;
  // Property match groups: 0=whole property, 1="reserved "|null, 2="repeated "|null, 3=type, 4=name, 5="= ..."|null,6=default|null
  const properties = propertyMatches.map(
    // ([text, reserved, repeated, type, name, _defaultClause, defaultValue]) => ({
    ([text, reserved, repeated, type, name, propertyIndex, defaultValue]) => ({
      text,
      //reserved,
      reserved: !!reserved,
      //repeated,
      repeated: !!repeated,
      type,
      name,
      //_defaultClause,
      propertyIndex: parseInt(propertyIndex, 10),
      defaultValue
    })
  );
  remainingText = stripProperties(remainingText);

  return {
    name: name.trim(),
    //innerText,
    //innerText: innerText.replace(propertyRegex, "").trim(),
    //innerText: stripProperties(innerText),
    options,
    properties,
    // diagnostics: {
    //   propertyMatchCount: propertyMatches?.length
    // },
    remainingText
  };
};

export const parseMethod = ({
  name,
  parameterStream,
  parameterRepeated,
  parameterType,
  returnStream,
  returnRepeated,
  returnType,
  innerText
}) => {
  let remainingText = innerText?.trim();
  let optionMatches = [...execAll(remainingText, optionRegex)];
  var options = optionMatches.map(optionMatchToOption);
  remainingText = stripOptions(remainingText) || "";

  return {
    name,
    parameterStream,
    parameterRepeated,
    parameterType,
    returnStream,
    returnRepeated,
    returnType,
    //innerText,
    options,
    innerText: remainingText
  };
};

export const parseService = (name, innerText) => {
  if (!innerText) return;
  var methodMatches = [...execAll(innerText, methodRegex)];
  // console.debug(
  //   `parseService: name=${name}, methodMatches=`,
  //   methodMatches,
  //   ", innerText=",
  //   innerText
  // );
  var remainingText = stripMethods(innerText);
  var optionMatches = [...execAll(remainingText, optionRegex)];
  remainingText = stripOptions(remainingText);
  // var methods = methodMatches.map(
  //   ([
  //     _fullText,
  //     name,
  //     parameterStream,
  //     parameterRepeated,
  //     parameterType,
  //     returnStream,
  //     returnRepeated,
  //     returnType,
  //     innerText
  //   ]) => ({
  //     name: name.trim(),
  //     parameterStream: !!parameterStream,
  //     parameterRepeated: !!parameterRepeated,
  //     parameterType: parameterType.trim(),
  //     returnStream: !!returnStream,
  //     returnRepeated: !!returnRepeated,
  //     returnType: returnType.trim(),
  //     innerText
  //   })
  // );
  var methods = methodMatches.map(
    ([
      _fullText,
      name,
      parameterStream,
      parameterRepeated,
      parameterType,
      returnStream,
      returnRepeated,
      returnType,
      innerText
    ]) =>
      parseMethod({
        name: name.trim(),
        parameterStream: !!parameterStream,
        parameterRepeated: !!parameterRepeated,
        parameterType: parameterType.trim(),
        returnStream: !!returnStream,
        returnRepeated: !!returnRepeated,
        returnType: returnType.trim(),
        innerText
      })
  );
  var options = optionMatches.map(([_fullText, optionName, optionValue]) => ({
    name: optionName.trim(),
    value: optionValue?.trim()
  }));
  console.debug({ methods, options });
  return {
    name: name.trim(),
    methods,
    options,
    remainingText
  };
};

export const parseGRPC = (id, text) => {
  // console.debug(`Before stripping comments: id=${id}, text=`, text);
  text = stripComments(text.trim());

  var importMatches = [...execAll(text, importRegex)];
  var imports = importMatches.map(([_fullText, name]) => name);
  text = stripImports(text);

  var packageMatches = packageRegex.exec(text);
  // alert(JSON.stringify(packageMatches));
  var packageName = packageMatches && packageMatches[1];
  // console.debug(`Before stripping package: text=`, text);
  text = stripPackage(text);
  //console.debug("parseGRPC minus comments:\r\n" + text);
  var matches = syntaxRegex.exec(text);
  //alert(JSON.stringify(matches));
  //console.debug("protoHelper.parseGRPC: syntax matches: ", matches);
  var matchDetails = matches
    ? {
        syntaxLine: matches[0],
        syntaxVersion: parseInt(matches[1], 10)
      }
    : { syntaxVersion: 3 }; /* NB: Add a default of version 3 */
  if (!matchDetails)
    console.warn(
      'parseGRPC failed to identify a syntax line as applied a default of "proto3"'
    );
  // console.debug(
  //   `parseGPRC: synatax matchDetails:\r\n${JSON.stringify(
  //     matchDetails
  //   )}\r\n\r\ntext=${text}\r\nmatches=${matches}`
  // );
  //alert(JSON.stringify(matchDetails));
  // console.debug(`Before stripping syntax: text=`, text);
  text = stripSyntax(text);
  //var serviceMatches = [...execAll(text, serviceRegex)];
  var serviceMatch = serviceRegex.exec(text);
  if (serviceMatch)
    console.debug("protoHelpers.parseGRPC: serviceMatch=", serviceMatch);
  else
    console.warn(
      `protoHelpers.parseGRPC failed to match service: id=${id}, text=`,
      text
    );
  // console.debug(
  //   `parseGRPC calling parseService with name=${serviceMatch[1].trim()}, innerText=${
  //     serviceMatch[2]
  //   }`
  // );
  var service = parseService(
    /* name */ serviceMatch[1].trim(),
    /* innerText */ serviceMatch[2].trim()
  );

  text = stripServices(text);
  var messageMatches = [...execAll(text, messageRegex)];
  text = stripMessages(text.trim());
  var optionMatches = [...execAll(text, optionRegex)];
  // console.debug(
  //   `protoHelpers.parseGRPC: id=${id}, optionMatches=`,
  //   optionMatches,
  //   ", text=",
  //   text
  // );
  // NB: Options are done after services and messages to allow them to include their own without them being stripped here to the wrong layer.
  text = stripOptions(text);
  const options = optionMatches?.map(([_fullText, name, value]) => ({
    name: name.trim(),
    value: value?.trim()
  }));
  console.debug(`protoHelpers.parseGRPC: id=${id}, options=`, options);
  const messages = messageMatches.map(([_fullText, name, innerText]) =>
    parseMessage(name, innerText)
  );
  text = stripMessages(text);
  console.debug({
    syntaxVersion: matchDetails
      ? matchDetails.syntaxVersion
      : "Not found (default to 3)",
    packageName,
    messages,
    options,
    service
  });
  return {
    id: id.trim(),
    //text,
    syntaxLine: matchDetails?.syntaxLine,
    syntaxVersion: matchDetails?.syntaxVersion ?? "3",
    imports,
    packageName: packageName?.trim(),
    service,
    options,
    messages,
    // diagnostics: {
    //   optionMatches
    // }
    remainingText: text
  };
};
