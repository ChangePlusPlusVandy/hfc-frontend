import React from "react";
import "./MultiStepProgressBar.css";
// import "react-step-progress-bar/styles.css";
// import { ProgressBar, Step } from "react-step-progress-bar";
import { Steps } from "rsuite";

const MultiStepProgressBar = (page) => {
    console.log(page);
    <Steps current={page}>
        <Steps.Item title="Mental Health" />
        <Steps.Item title="Life Skills" />
        <Steps.Item title="Social Skills" />
        <Steps.Item title="Education" />
        <Steps.Item title="Vocation" />
    </Steps>;
};

export default MultiStepProgressBar;
