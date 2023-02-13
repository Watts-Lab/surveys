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
        name: "valueLabels",
        type: "itemvalues",
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
        var option = document.createElement("div");
        option.classList.add("sliderLabel");
        // if (label.text) {
        //   option.innerHTML = `
        //     <div class="each_label">
        //         <div class="tick"></div>
        //         <div class="label_value">${label.text}</div>
        //     </div>
        //   `;
        //   option.setAttribute("value", label.value);
        //   dl.appendChild(option);
        // }
        console.log(
          `label ${label.text}, label isempty ${label.locTextValue.isEmpty}`,
          label
        );
        option.innerHTML = `
          <div class="each_label">
              <div class="tick"></div>
              <div class="label_value">${
                label.locTextValue.isEmpty ? " " : label.text
              }</div>
          </div>
        `;
        option.setAttribute("value", label.value);
        dl.appendChild(option);
      });
      dl.classList.add("sliderLabels");
      el.appendChild(dl);

      const slider = el.getElementsByTagName("input")[0];
      slider.setAttribute("list", dl.id);
      slider.classList.add("slider");

      if (question.showProgressBar) slider.classList.add("progressBar");

      slider.addEventListener("mousedown", () =>
        slider.classList.add("sliderClicked")
      );

      // added additionally for highlighting label
      let last = null;
      slider.addEventListener("input", (e) => {
        let val = e.target.value;
        last?.classList.remove("active");
        const activeEl = dl.querySelector(`[value='${val}']`);
        activeEl?.classList.add("active");
        last = activeEl;
      });
    },
  };

  SurveyJS.CustomWidgetCollection.Instance.addCustomWidget(
    widget,
    "labeledRange"
  );
}
