# Partisan Feeling Thermometer Survey (US)

This survey aims to gauge the participant's feeling toward the Democratic and Republican Party. The participant will be asked to rate Democrats and Republicans on a scale from 0 to 100. The order of whether question about Democrats or Republicans shows up first is randomized.

### Scores and their meanings

- `normRepublicanTemp` and `normDemocratTemp` are participant's feeling toward each party converted to a 0 to 1 scale.

- `rawScore` calculates if the participant shows a more positive attitude toward one party. A positive `rawScore` indicates that the participant rates Republicans higher, and vice versa.

- `normScore` is the absolute value of `rawScore`. It calculates the level of extremity of the participant's difference in rating toward each party.

- `order` records the order that the question shows up to the participant.