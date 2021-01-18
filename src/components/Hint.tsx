import React from 'react';
import "../styles/hint.css";
import {FaInfoCircle} from "react-icons/all";

type Props={
    hint: string
}

export const Hint: React.FC<Props> = ({hint}) => {

    return (
        <div className="hint-container">
            <FaInfoCircle className="hint-icon"/>
            {hint}
        </div>
    );
}
