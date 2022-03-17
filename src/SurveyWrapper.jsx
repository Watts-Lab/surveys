import 'survey-react/modern.min.css';
import { Survey, StylesManager, Model } from 'survey-react';
import PropTypes from "prop-types";
import React from "react";

StylesManager.applyTheme("modern");

export default class SurveyWrapper extends React.PureComponent {

    render () {
        const {player, surveyJson} = this.props;
        const survey = new Model(surveyJson);

        return(
            <Survey model={survey} />

        )
    }
}

SurveyWrapper.propTypes = {
    player: PropTypes.object.isRequired,
}