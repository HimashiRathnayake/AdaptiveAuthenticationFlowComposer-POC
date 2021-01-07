import React from "react";
import {MultipleFactor} from "./MultipleFactor";

type props ={
    options:any
}

export const Login: React.FC<props> = ({options}) => {
    let Y= options.length*50;
    let height = 780;
    let viewBox = `0 0 526 ${height}`;
    return(
        <div className="svgContainer">
            <svg xmlns="http://www.w3.org/2000/svg" width="526" height="370" viewBox={viewBox}>
                <g id="login" transform="translate(-748 1219)">
                    <g id="Rectangle_618" data-name="Rectangle 618" transform="translate(748 -1172.461)" fill="#fff" stroke="rgba(188,188,188,0.5)" strokeWidth="1">
                        <rect width="526" height={500+Y} rx="21" stroke="none"/>
                        <rect x="0.5" y="0.5" width="525" height={500+Y} rx="20.5" fill="none"/>
                    </g>
                    <text id="Sign_In" data-name="Sign In" transform="translate(966 -1109.461)" fill="#323232" fontSize="29" fontFamily="Roboto-Regular, Roboto"><tspan x="0" y="0">Sign In</tspan></text>
                    <text id="WSO2_Identity_Server_2020" data-name="WSO2 Identity Server © 2020" transform="translate(898 -504.461)" fill="#fff" fontSize="17" fontFamily="Helvetica"><tspan x="0" y={-120+Y}>WSO2 Identity Server © 2020</tspan></text>
                    <g id="logo" transform="translate(888.154 -1219)">
                        <circle id="Ellipse_1" data-name="Ellipse 1" cx="7.251" cy="7.251" r="7.251" transform="translate(37.029 1.785)" fill="#f47b20"/>
                        <path id="Path_326" data-name="Path 326" d="M87.913,2.7,87.9,2.6H85.089l-.029.053q-.5.89-1,1.785l-.29.522q-.752-1.82-1.5-3.64Q81.489-.6,80.7-2.52L80.6-2.742l-.1.219Q79.934-1.266,79.371,0c-.517,1.154-1.052,2.346-1.589,3.514-.748-.007-1.5-.006-2.248-.005-.687,0-1.375,0-2.065,0h-.107l0,.107a5.277,5.277,0,0,0,.069.685l.018.123h.09q1.792,0,3.581,0h1.261l.028-.061q.551-1.216,1.1-2.437Q80.036.744,80.567-.427q.8,1.942,1.6,3.888.7,1.7,1.4,3.4l.082.2.106-.187q.721-1.283,1.434-2.571l.44-.793h2.286l.008-.1A4.451,4.451,0,0,0,87.913,2.7Z" transform="translate(-36.353 5.993)" fill="#fff"/>
                        <path id="Path_327" data-name="Path 327" d="M29-6.615c.708,0,1.415,0,2.123,0q2.584,6.36,5.171,12.72c1.726-4.249,3.439-8.5,5.183-12.746q2.587,6.376,5.177,12.75Q49.242-.251,51.825-6.616c.715,0,1.432,0,2.147,0Q50.363,2.3,46.748,11.208c-.007.086-.131.228-.16.062Q44.033,4.947,41.476-1.375c-1.739,4.264-3.456,8.537-5.186,12.8Q32.638,2.411,29-6.615Z" transform="translate(-29 6.639)" fill="#f47b20"/>
                        <path id="Path_328" data-name="Path 328" d="M60.18-5.7a5.7,5.7,0,0,1,3.964-.873,5.112,5.112,0,0,1,3.64,2.68c-.516.34-1.043.662-1.556,1.005-.274-.3-.459-.669-.745-.959A2.671,2.671,0,0,0,64.057-4.7a3.344,3.344,0,0,0-3.115.9A2.29,2.29,0,0,0,61.1-.526,17.566,17.566,0,0,0,63.336.8,18.118,18.118,0,0,1,66.2,2.288a5.372,5.372,0,0,1,1.669,1.541,4.85,4.85,0,0,1,.448,3.249,5.318,5.318,0,0,1-2.4,3.5,5.655,5.655,0,0,1-3.672.808,5.077,5.077,0,0,1-3.127-1.355,6.083,6.083,0,0,1-1.656-3.1c.637-.2,1.273-.386,1.909-.582a4.539,4.539,0,0,0,1.492,2.6,3.485,3.485,0,0,0,2.8.567,3.415,3.415,0,0,0,2.512-2.064A3.52,3.52,0,0,0,66.3,5.236a2.218,2.218,0,0,0-.927-1.2,19.509,19.509,0,0,0-2.824-1.559,14,14,0,0,1-2.172-1.2A4.951,4.951,0,0,1,58.9-.063a4.223,4.223,0,0,1-.445-3.085A4.137,4.137,0,0,1,60.18-5.7Z" transform="translate(-33.716 6.635)" fill="#f47b20"/>
                        <path id="Path_329" data-name="Path 329" d="M79.612-6.6a9.091,9.091,0,0,1,4.272.721,9.016,9.016,0,0,1,4.4,12.472,9.051,9.051,0,0,1-6.125,4.627A9.113,9.113,0,0,1,77.01,10.8a9.03,9.03,0,0,1-3.971-3.018,8.942,8.942,0,0,1-1.775-4.929,8.955,8.955,0,0,1,1.83-5.927A9.029,9.029,0,0,1,79.612-6.6ZM78.53-4.557A7.208,7.208,0,0,0,73.951-.982,7.517,7.517,0,0,0,73.1,2.965h.02a5.439,5.439,0,0,0,.073.706,7.226,7.226,0,0,0,3.979,5.258,7.174,7.174,0,0,0,5.383.341,7.215,7.215,0,0,0,3.629-2.715,7.158,7.158,0,0,0,1.283-3.793,4.191,4.191,0,0,0-.008-.7,7.2,7.2,0,0,0-5.141-6.54A7.148,7.148,0,0,0,78.53-4.557Z" transform="translate(-36.002 6.636)" fill="#060709"/>
                        <path id="Path_330" data-name="Path 330" d="M92.939,3.408a5.359,5.359,0,0,1,2.9.013A4.314,4.314,0,0,1,98.609,6.11a4.743,4.743,0,0,1-.481,3.96,18.24,18.24,0,0,1-2.091,2.613q-1.828,1.975-3.66,3.948,3.33-.005,6.66,0c0,.474,0,.948,0,1.422-3.289,0-6.579,0-9.868,0,2.1-2.278,4.223-4.538,6.316-6.824a6.8,6.8,0,0,0,1.876-3.037,2.9,2.9,0,0,0-.822-2.66A3.3,3.3,0,0,0,92.9,4.894,8.266,8.266,0,0,0,92.939,3.408Z" transform="translate(-38.972 5.006)" fill="#060709"/>
                    </g>
                    <text id="IDENTITY_SERVER" data-name="IDENTITY SERVER" transform="translate(957 -1201.461)" fill="#fff" fontSize="21" fontFamily="Helvetica"><tspan x="0" y="0">IDENTITY SERVER</tspan></text>
                </g>
                {options.length===0 &&
                    <text x={190} y={220} className="textEmpty" id="textEmpty">
                        <tspan className="textAddAuthenticators" id="svg_1">Add authenticators </tspan>
                        <tspan className="textAddAuthenticators" id="svg_1" x={120} y={240}>to build an authentication sequence.</tspan>
                    </text>
                }
                {options.map((option: string, index:number) => {
                    let x=87, y=200+50*index;
                    return (
                        <MultipleFactor key={index} type={option} x={x} y={y}/>
                    )})
                }
            </svg>
        </div>
    )
}