// Combining the party and strength questions to a single 7-point party axis scale

export default function scoreFunc(responses) {
  var position = undefined;
  var importance = undefined;
  if (responses["party"] === "Democrat") {
    if (responses["democratStrength"] === "Strong Democrat") position = 0;
    if (responses["democratStrength"] === "Not very strong Democrat")
      position = 1;
    importance = responses["democratImportance"];
  }
  if (responses["party"] === "Independent") {
    if (responses["independentLean"] === "Closer to Democratic Party")
      position = 2;
    if (responses["independentLean"] === "Neither") position = 3;
    if (responses["independentLean"] === "Closer to Republican Party")
      position = 4;
    importance = responses["independentImportance"];
  }
  if (responses["party"] === "Republican") {
    if (responses["republicanStrength"] === "Not very strong Republican")
      position = 5;
    if (responses["republicanStrength"] === "Strong Republican") position = 6;
    importance = responses["republicanImportance"];
  }
  if (responses["party"] === "Other") {
    importance = responses["otherImportance"];
  }

  const result = {
    party: responses["party"],
    position,
    normPosition: position !== undefined ? position / 6 : undefined,
    importance,
    normImportance: importance / 100,
  };

  return result;
}
