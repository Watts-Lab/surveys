export default function scoreFunc(responses) {
  console.log(responses);

  const reasonsYes = responses["reasonYesPanel"]
    .map((reason) => reason["reasonYes"])
    .filter((reason) => reason.length > 5);

  const reasonsNo = responses["reasonNoPanel"]
    .map((reason) => reason["reasonNo"])
    .filter((reason) => reason.length > 5);

  const result = {
    reasonsYes,
    reasonsNo,
    countReasonsYes: reasonsYes.length,
    countReasonsNo: reasonsNo.length,
  };

  return result;
}
