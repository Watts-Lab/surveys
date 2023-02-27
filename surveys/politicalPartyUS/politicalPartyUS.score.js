// Combining the party and strength questions to a single 7-point party axis scale

export default function scoreFunc(responses) {
  var position = undefined;
  var importance = undefined;
  if (responses["party"] === "Democrat") {
    if (responses["democratStrength"] === "Strong Democrat") position = -3;
    if (responses["democratStrength"] === "Not very strong Democrat")
      position = -2;
    importance = responses["democratImportance"];
  }
  if (responses["party"] === "Independent") {
    if (responses["independentLean"] === "Closer to Democratic Party")
      position = -1;
    if (responses["independentLean"] === "Neither") position = 0;
    if (responses["independentLean"] === "Closer to Republican Party")
      position = 1;
    importance = responses["independentImportance"];
  }
  if (responses["party"] === "Republican") {
    if (responses["republicanStrength"] === "Not very strong Republican")
      position = 2;
    if (responses["republicanStrength"] === "Strong Republican") position = 3;
    importance = responses["republicanImportance"];
  }
  if (responses["party"] === "Other") {
    importance = responses["otherImportance"];
  }

  const result = {
    party: responses["party"],
    position,
    normPosition: position !== undefined ? (position + 3) / 6 : undefined,
    importance,
    normImportance: importance / 100,
  };

  return result;
}
