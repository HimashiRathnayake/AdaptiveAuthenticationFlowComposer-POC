import React from "react";

type props ={
    type:string,
    x:number,
    y:number
}

export const MultipleFactor: React.FC<props> = ({type,x,y}) => {
    return(
        <g>
            <rect fill="#c4c4c6" rx="4" x={x} y={y} height="35" width="350" id="Rectangle_25"/>
            <text x={x} y={y} fontFamily="Cambria" fontSize="19" fill="#CACBCE" id="Sign_In_With_Google_Idp">
                <tspan id="svg_1" fill="black" y={y+22} x={x+40}>Sign In With </tspan>
                <tspan id="svg_2" fill="black" fontWeight="700" fontFamily="Cambria-Bold, Cambria" y={y+22}>{type}</tspan>
            </text>
        </g>
    )
}