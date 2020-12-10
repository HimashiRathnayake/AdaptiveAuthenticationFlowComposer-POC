import React from "react"

type props ={
    type:string
}

export const SocialLogin: React.FC<props> = ({type}) => {
    return(

        <g>
            <title>Layer 1</title>
            <rect fill="#959392" rx="4" height="40" width="239" id="Rectangle_25"/>
            <text x="-53.06599" y="16.417" font-family="Cambria" font-size="16" fill="#060606" id="Sign_In_With_Google_Idp">
                <tspan id="svg_1" y="26" x="19.85001">Sign In With </tspan>
                <tspan id="svg_2" font-weight="700" font-family="Cambria-Bold, Cambria" y="26">{type}</tspan>
            </text>
        </g>

    )
}