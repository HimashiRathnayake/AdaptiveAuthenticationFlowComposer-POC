import React from "react";
import {AuthenticatorIcons} from "../../visualEditor/authenticationFactorSVGs/AuthenticatorIcons";
import {Tooltip} from "@material-ui/core";

type Props = {
    factorName: string,
    factorType: string,
    checked: boolean,
    onChange: Function
}

export const Authenticator: React.FC<Props> = ({factorName, factorType, checked, onChange}) => {
    return(
        <div className="factorContainer">
            <button
                className={checked ? "factor selectedFactor": "factor unselectedFactor"}
                onClick={()=>onChange(factorName)}
            >
                <div className={factorType}>
                    <AuthenticatorIcons type={factorName+"1"} iconX={0} iconY={0} iconHeight={40} iconWidth={40}/>
                </div>
            </button>
            <Tooltip title={factorName}>
                <div className="factorName">
                    {factorName}
                </div>
            </Tooltip>
        </div>
    );
}