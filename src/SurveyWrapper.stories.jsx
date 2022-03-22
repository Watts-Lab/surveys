import React from 'react';
import SurveyWrapper from './SurveyWrapper';

export default {
  /* 👇 The title prop is optional.
  * See https://storybook.js.org/docs/react/configure/overview#configure-story-loading
  * to learn how to generate automatic titles
  */
  title: 'Components/Wrapper Component',
  component: SurveyWrapper,
};

//👇 We create a “template” of how args map to rendering
const Template = (args) => <SurveyWrapper {...args} />;


// Basic no-frills survey
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


export const Basic = Template.bind({});
Basic.args = {
   surveyJson: surveyJson
};


