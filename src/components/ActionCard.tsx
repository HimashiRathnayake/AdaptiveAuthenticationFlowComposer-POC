import React, {ReactComponentElement} from 'react';
import "../styles/card.css";

type Props={
    icon: ReactComponentElement<any>,
    heading: string,
    subHeading: string,
    onClick: Function
}

export const ActionCard: React.FC<Props> = ({icon, heading, subHeading, onClick}) => {

    return (
        <div className="card" onClick={()=>onClick()}>
            <div className="image-container">
                {icon}
            </div>
            <div className="bottom-container">
                <div className="text-container">
                    <div className="heading">{heading}</div>
                    <div className="sub-heading">{subHeading}</div>
                </div>
            </div>
        </div>
    );
}
