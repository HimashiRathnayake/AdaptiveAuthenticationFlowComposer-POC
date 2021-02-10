import React from "react";
import "../../styles/svg.css";
import { AuthenticatorIcons } from "./AuthenticatorIcons";

type props ={
    type:string,
    x:number,
    y:number
}

export const MultipleFactor: React.FC<props> = ({type,x,y}) => {
    let iconX = x+10,
        iconY = y+3,
        iconHeight = 30,
        iconWidth = 30;

    return(
        <g>
            <rect fill="#fff" rx="8" x={x} y={y} id="Rectangle_25" className="buttonRectangle"/>
            <AuthenticatorIcons type={type} iconX={iconX} iconY={iconY} iconHeight={iconHeight} iconWidth={iconWidth}/>
            <text x={x} y={y} className="buttonText" id="Sign_In_With_Google_Idp">
                <tspan className="textLeft" id="svg_1" y={y+22} x={x+60}>Sign In With </tspan>
                <tspan className="textRight" id="svg_2" y={y+22}>{type}</tspan>
            </text>
        </g>
    )
}