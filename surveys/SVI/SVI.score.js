function reverseCode(value, minVal, maxVal) {
  const floatVal = parseFloat(value);
  if (Number.isNaN(floatVal)) return undefined;
  return maxVal - (value - minVal);
}

function sum(array) {
  return array.reduce((acc, val) => acc + val, 0);
}

function mean(array) {
  //Ensure Mean is robust to NA's
  const filteredArr = array.filter(num => typeof num === 'number' && !isNaN(num));
  if (filteredArr.length === 0) {
    return NaN;
  }
  return sum(filteredArr) / filteredArr.length;}

export default function scoreFunc(responses) {
  const minVal = 1;
  const maxVal = 7;

  // Instrumental Outcome
  const rawInstrumentalOutcomeValues = [
    responses["Instrumental Outcome 1"],
    responses["Instrumental Outcome 2"],
    responses["Instrumental Outcome 4"],
    reverseCode(responses["Instrumental Outcome 3"], minVal, maxVal)
  ].map(parseFloat);

  // Self
  const rawSelfValues = [
    reverseCode(responses["Self 1"], minVal, maxVal),
    responses["Self 2"],
    responses["Self 3"],
    responses["Self 4"]
  ].map(parseFloat);

  // Process
  const rawProcessValues = [
    responses["Process 1"],
    responses["Process 2"],
    responses["Process 3"],
    responses["Process 4"]
  ].map(parseFloat);

  // Relationship
  const rawRelationshipValues = [
    responses["Relationship 1"],
    responses["Relationship 2"],
    responses["Relationship 3"],
    responses["Relationship 4"]
  ].map(parseFloat);

  // Global
  const rawGlobalValues = [
    responses["Instrumental Outcome 1"],
    responses["Instrumental Outcome 2"],
    responses["Instrumental Outcome 4"],
    reverseCode(responses["Instrumental Outcome 3"], minVal, maxVal),
    reverseCode(responses["Self 1"], minVal, maxVal),
    responses["Self 2"],
    responses["Self 3"],
    responses["Self 4"],
    responses["Process 1"],
    responses["Process 2"],
    responses["Process 3"],
    responses["Process 4"],
    responses["Relationship 1"],
    responses["Relationship 2"],
    responses["Relationship 3"],
    responses["Relationship 4"]
  ].map(parseFloat);

  // Rapport
  const rawRapportValues = [
    responses["Process 1"],
    responses["Process 2"],
    responses["Process 3"],
    responses["Process 4"],
    responses["Relationship 1"],
    responses["Relationship 2"],
    responses["Relationship 3"],
    responses["Relationship 4"]
  ].map(parseFloat);


  const result = {
    InstrumentalOutcome: mean(rawInstrumentalOutcomeValues).toFixed(3),
    Self: mean(rawSelfValues).toFixed(3),
    Process: mean(rawProcessValues).toFixed(3),
    Relationship: mean(rawRelationshipValues).toFixed(3),
    Global: mean(rawGlobalValues).toFixed(3),
    Rapport: mean(rawRapportValues).toFixed(3)};
    
  return result;
}
