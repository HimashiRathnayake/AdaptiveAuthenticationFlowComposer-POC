import * as React from "react";

type Props = {
    step: string
}

const stepStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, .5)',
    margin: '0.2rem'
}

export const SuccessFailureStep: React.FC<Props> = ({step}) => {
    return(
        <div style={stepStyle}>Step {step}</div>
    );
}