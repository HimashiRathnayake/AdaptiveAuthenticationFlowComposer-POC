import React from "react";
import {AuthenticatorIcons} from "../SVGs/AuthenticatorIcons";
import {Tooltip} from "@material-ui/core";

type Props = {
    factorName: string,
    factorType: string,
    checked: boolean,
    onChange: Function,
    disabled: boolean,
}

export const Authenticator: React.FC<Props> = ({factorName, factorType, checked, onChange, disabled}) => {
    return(
        <div className="factorContainer">
            <Tooltip
                title={(factorName==='fido' || factorName==='totp')?'This is a second factor authenticator and this can be used only if a basic authenticator or a identifier-first authenticator has been added in a previous step':''}
                arrow={true}
                placement="top"
            >
                <button
                    className={checked ? "factor selectedFactor": "factor unselectedFactor"}
                    onClick={()=>onChange(factorName)}
                    disabled={disabled}
                >
                    <div className={factorType}>
                        <AuthenticatorIcons
                            type={factorName+"-icon"}
                            iconX={0}
                            iconY={0}
                            iconHeight={40}
                            iconWidth={40}
                        />
                    </div>
                </button>
            </Tooltip>
            <Tooltip title={factorName}>
                <div className="factorName">
                    {factorName}
                </div>
            </Tooltip>
        </div>
    );
}