import React from 'react';

import SurveyWrapper from './SurveyWrapper';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Survey',
  component: SurveyWrapper,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <SurveyWrapper {...args} />;

const player = {
  data: {"name": "Ponder Stibbons"},
  get (key) {
    return this.data[key];
  }
}

const surveyJson = {
    elements: [{
      name: "FirstName",
      title: "Enter your first name:",
      type: "text"
    }, {
      name: "LastName",
      title: "Enter your last name:",
      type: "text"
    }]
  };


//👇 Each story then reuses that template
export const TestStory = Template.bind({});
TestStory.args = {
   player: player,
   surveyJson: surveyJson
};

