// labeledRange.js
/* 
Modifies the existing range component to add track labels.
 the updated syntax for a range question should be:

 ```
  {
    "type": "text",
    "inputType": "range",
    "name": "republicanImportance",
    "title": "How important is being a Republican to you?",
    "description": "Below is a range from 0 to 100 indicating how important this is to you. Click on any space within this range and a bar will appear. Feel free to move that bar around to the number that best represents your answer.",
    "visibleIf": "{party} = 'Republican'",
    "min": 0,
    "max": 100,
    "step": 1,
    "valueLabels": [
      { "value": 0, "text": "Not important at all" },
      { "value": 25, "text": "" },
      { "value": 50, "text": "Moderately Important" },
      { "value": 75, "text": "" },
      { "value": 100, "text": "Extremely Important" }
    ]
  },
```

*/

export function labeledRange(SurveyJS) {
  var widget = {
    name: "labeledRange",

    isFit: (question) => {
      return question.getType() === "text" && question.inputType === "range";
    },

    isDefaultRender: true,

    init() {
      SurveyJS.JsonObject.metaData.addProperty("text", {
        name: "valueLabels:itemvalues",
        category: "slider",
        default: [
          { value: 0, text: "Strongly Disagree" },
          { value: 25, text: "" },
          { value: 50, text: "Neither agree nor disagree" },
          { value: 75, text: "" },
          { value: 100, text: "Strongly Agree" },
        ],
      });

      SurveyJS.JsonObject.metaData.addProperty("text", {
        name: "progressBar",
        type: "boolean",
        category: "slider",
        default: false,
      });
    },

    afterRender: (question, el) => {
      console.log("question", question);
      el.classList.add("sliderContainer");
      const dl = document.createElement("datalist");
      dl.id = `${question.name}_slider_vals`;
      question.valueLabels.forEach((label) => {
        // TODO: labels will be spaced evenly, so need to "fill in the gaps" in the passed in values.
        // This means we'll need to add ticks in some places, but not others, or stop spacing labels evenly.
        //
        var option = document.createElement("option");
        option.value = label.value;
        option.classList.add("sliderLabel");
        console.log(label);
        if (label.text) option.label = label.text;
        dl.appendChild(option);
      });
      //dl.style = "display: flex; justify-content: space-between;";
      dl.classList.add("sliderLabels");
      el.appendChild(dl);

      const slider = el.getElementsByTagName("input")[0];
      slider.setAttribute("list", dl.id);
      slider.classList.add("slider");

      if (question.showProgressBar) slider.classList.add("progressBar");

      slider.addEventListener("mousedown", () =>
        slider.classList.add("sliderClicked")
      );

      //Todo:
      // - style ticks
      // - remove leading bar in track
      // - set thumb visibility to false until onClick/onInput/onHover
      // - move labels closer to bar
    },
  };

  SurveyJS.CustomWidgetCollection.Instance.addCustomWidget(
    widget,
    "labeledRange"
  );
}
