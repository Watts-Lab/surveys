# Partisan Feeling Thermometer Survey (US)

This survey aims to gauge the participant's feeling toward the Democratic and Republican Party. The participant will be asked to rate Democrats and Republicans on a scale from 0 to 100. The order of whether question about Democrats or Republicans shows up first is randomized.

In designing our survey question, we adapted existing “feeling thermometer” wordings from prominent studies to create a version that balances clarity, brevity, and the need to encourage respondents to use the full scale. Drawing on insights from previous versions, we retained the key elements of the scale—using 0 to represent very cold or unfavorable feelings, 100 for very warm or favorable feelings, and 50 for neutrality. We chose to streamline the language to make the question easy and fast for respondents to read and understand, minimizing cognitive load while ensuring accurate responses. Additionally, we emphasized that respondents should feel free to use any number from 0 to 100, encouraging the use of the full range of the scale. By carefully selecting and refining these elements, we aimed to preserve the original intent of the measurement while improving respondent experience and reducing potential biases.

## Sources

> "We’d like you to rate how you feel towards Republican and Democratic Party voters/Republican and Democratic Party candidates and elected officials/the Democratic and Republican parties on a scale of 0 to 100, which we call a “feeling thermometer.” On this feeling thermometer scale, ratings between 0 and 49 degrees mean that you feel unfavorable and cold (with 0 being the most unfavorable/coldest). Ratings between 51 and 100 degrees mean that you feel favorable and warm (with 100 being the most favorable/warmest). A rating of 50 means you have no feelings one way or the other. How would you rate your feeling toward Republican and Democratic Party voters/Republican and Democratic Party candidates and elected officials/the Democratic and Republican parties?
> (Druckman, James N., and Matthew S. Levendusky. 2019. “What Do We Measure When We Measure Affective Polarization?” Public Opinion Quarterly 83 (1): 114–22.)"

> "(i) We would like to get your feelings toward both Democrats and Republicans. We would like you to rate them using something we call the feeling thermometer. Ratings between 50 degrees and 100 degrees mean that you feel favorable and warm toward them. Ratings between 0 degrees and 50 degrees mean that you don't feel favorable toward them and that you don't care too much for them. You would rate them at the 50 degree mark if you don't feel particularly warm or cold toward them. [Add graphic] (i.a) How would you rate Republicans? (i.b) How would you rate Democrats? (democratic voters, republican voters, democratic politicians, republican politicians (i) 101-point scale from “Very cold or unfavorable feeling” to “No feeling at all” to “Very warm or favorable feeling”" (Jan G. Voelkel, Michael N. Stagnaro, James Chu, Sophia Pink, Joseph S. Mernyk, Chrystal Redekopp, Matthew Cashman, James N. Druckman, David G. Rand, and Robb Willer. 2021. “Megastudy Identifying Successful Interventions to Strengthen Americans’ Democratic Attitudes.”)

> Please indicate how you feel toward [outgroup] using the scale below. 10 means that you feel very favorably or warm toward them, 0 that you feel very unfavorable or cold, and 5 are neutral. (Kamin, Julia. 2022. “Social Cohesion Impact Measurement (SCIM) Framework Overview.” Civic Health Project. https://docs.google.com/document/d/1_nsLJNgWZVaNSq71PFpAHx7YM488FvTPIPFYWsytwus.)

## Scores and their meanings

- `normRepublicanTemp` and `normDemocratTemp` are participant's feeling toward each party converted to a 0 to 1 scale.

- `rawScore` calculates if the participant shows a more positive attitude toward one party. A positive `rawScore` indicates that the participant rates Republicans higher, and vice versa.

- `normScore` is the absolute value of `rawScore`. It calculates the level of extremity of the participant's difference in rating toward each party.

- `order` records the order that the question shows up to the participant.
