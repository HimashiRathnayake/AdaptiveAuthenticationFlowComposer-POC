import React from "react";
import {MultipleFactor} from "./MultipleFactor";

type props ={
    options:any
}

export const IdentifierFirst: React.FC<props> = ({options}) => {
    let Y= options.length*40;
    let height = 780+Y;
    let viewBox = `0 0 526 ${height}`;
    return(
        <div className="svgContainer">
            <svg xmlns="http://www.w3.org/2000/svg" width="300" height="370" viewBox={viewBox}>
                <g id="login" transform="translate(-748 1219)">
                    <g id="Rectangle_618" data-name="Rectangle 618" transform="translate(748 -1172.461)" fill="#fff" stroke="rgba(188,188,188,0.5)" strokeWidth="1">
                        <rect width="526" height={500+Y} rx="21" stroke="none"/>
                        <rect x="0.5" y="0.5" width="525" height={500+Y} rx="20.5" fill="none"/>
                    </g>
                    <text id="Sign_In" data-name="Sign In" transform="translate(966 -1069.461)" fill="#323232" fontSize="29" fontFamily="Roboto-Regular, Roboto"><tspan x="0" y="0">Sign In</tspan></text>
                    <text id="Forgot_Username" data-name="Forgot Username?" transform="translate(806 -915)" fill="#323232" fontSize="18" fontFamily="Roboto-Regular, Roboto"><tspan x="0" y="0">Forgot </tspan><tspan y="0" fill="#f47b20">Username</tspan><tspan y="0">?</tspan></text>
                    {/*<text id="WSO2_Identity_Server_2020" data-name="WSO2 Identity Server © 2020" transform="translate(898 -504.461)" fill="#fff" fontSize="17" fontFamily="Helvetica"><tspan x="0" y={-120+Y}>WSO2 Identity Server © 2020</tspan></text>*/}
                    <text id="Create_Account" data-name="Create Account" transform="translate(806 -839.461)" fill="#f47b20" fontSize="21" fontFamily="Helvetica"><tspan x="0" y="0">Create Account</tspan></text>
                    <g id="Component_1" data-name="Component 1" transform="translate(1065 -870.461)">
                        <rect id="Rectangle_25" data-name="Rectangle 25" width="158" height="51" rx="4" transform="translate(0 0)" fill="#f47b20"/>
                        <text id="Continue" transform="translate(0 15.085)" fill="#fff" fontSize="18" fontFamily="Roboto-Regular, Roboto" fontWeight="700"><tspan x="46.132" y="16">Continue</tspan></text>
                    </g>
                    <g id="Component_2" data-name="Component 2" transform="translate(800.558 -1021.338)">
                        <g id="Rectangle_25-2" data-name="Rectangle 25" fill="none" stroke="rgba(118,118,118,0.35)" strokeWidth="1">
                            <rect width="422.135" height="45.049" rx="4" stroke="none"/>
                            <rect x="0.5" y="0.5" width="421.135" height="44.049" rx="3.5" fill="none"/>
                        </g>
                        <text id="Username" transform="translate(62.569 11.262)" fill="rgba(0,0,0,0.6)" fontSize="14" fontFamily="Roboto-Regular, Roboto" opacity="0.35"><tspan x="0" y="13">Username</tspan></text>
                        <path id="user" d="M9.2,10.517A5.259,5.259,0,1,0,3.944,5.259,5.258,5.258,0,0,0,9.2,10.517Zm3.681,1.315H12.2a7.152,7.152,0,0,1-5.99,0H5.522A5.523,5.523,0,0,0,0,17.354v1.709a1.973,1.973,0,0,0,1.972,1.972H16.433a1.973,1.973,0,0,0,1.972-1.972V17.354A5.523,5.523,0,0,0,12.884,11.832Z" transform="translate(21.273 11.262)" fill="#767676"/>
                    </g>
                   {/*<g id="logo" transform="translate(888.154 -1219)">*/}
                   {/*     <circle id="Ellipse_1" data-name="Ellipse 1" cx="7.251" cy="7.251" r="7.251" transform="translate(37.029 1.785)" fill="#f47b20"/>*/}
                   {/*     <path id="Path_326" data-name="Path 326" d="M87.913,2.7,87.9,2.6H85.089l-.029.053q-.5.89-1,1.785l-.29.522q-.752-1.82-1.5-3.64Q81.489-.6,80.7-2.52L80.6-2.742l-.1.219Q79.934-1.266,79.371,0c-.517,1.154-1.052,2.346-1.589,3.514-.748-.007-1.5-.006-2.248-.005-.687,0-1.375,0-2.065,0h-.107l0,.107a5.277,5.277,0,0,0,.069.685l.018.123h.09q1.792,0,3.581,0h1.261l.028-.061q.551-1.216,1.1-2.437Q80.036.744,80.567-.427q.8,1.942,1.6,3.888.7,1.7,1.4,3.4l.082.2.106-.187q.721-1.283,1.434-2.571l.44-.793h2.286l.008-.1A4.451,4.451,0,0,0,87.913,2.7Z" transform="translate(-36.353 5.993)" fill="#fff"/>*/}
                   {/*     <path id="Path_327" data-name="Path 327" d="M29-6.615c.708,0,1.415,0,2.123,0q2.584,6.36,5.171,12.72c1.726-4.249,3.439-8.5,5.183-12.746q2.587,6.376,5.177,12.75Q49.242-.251,51.825-6.616c.715,0,1.432,0,2.147,0Q50.363,2.3,46.748,11.208c-.007.086-.131.228-.16.062Q44.033,4.947,41.476-1.375c-1.739,4.264-3.456,8.537-5.186,12.8Q32.638,2.411,29-6.615Z" transform="translate(-29 6.639)" fill="#f47b20"/>*/}
                   {/*     <path id="Path_328" data-name="Path 328" d="M60.18-5.7a5.7,5.7,0,0,1,3.964-.873,5.112,5.112,0,0,1,3.64,2.68c-.516.34-1.043.662-1.556,1.005-.274-.3-.459-.669-.745-.959A2.671,2.671,0,0,0,64.057-4.7a3.344,3.344,0,0,0-3.115.9A2.29,2.29,0,0,0,61.1-.526,17.566,17.566,0,0,0,63.336.8,18.118,18.118,0,0,1,66.2,2.288a5.372,5.372,0,0,1,1.669,1.541,4.85,4.85,0,0,1,.448,3.249,5.318,5.318,0,0,1-2.4,3.5,5.655,5.655,0,0,1-3.672.808,5.077,5.077,0,0,1-3.127-1.355,6.083,6.083,0,0,1-1.656-3.1c.637-.2,1.273-.386,1.909-.582a4.539,4.539,0,0,0,1.492,2.6,3.485,3.485,0,0,0,2.8.567,3.415,3.415,0,0,0,2.512-2.064A3.52,3.52,0,0,0,66.3,5.236a2.218,2.218,0,0,0-.927-1.2,19.509,19.509,0,0,0-2.824-1.559,14,14,0,0,1-2.172-1.2A4.951,4.951,0,0,1,58.9-.063a4.223,4.223,0,0,1-.445-3.085A4.137,4.137,0,0,1,60.18-5.7Z" transform="translate(-33.716 6.635)" fill="#f47b20"/>*/}
                   {/*     <path id="Path_329" data-name="Path 329" d="M79.612-6.6a9.091,9.091,0,0,1,4.272.721,9.016,9.016,0,0,1,4.4,12.472,9.051,9.051,0,0,1-6.125,4.627A9.113,9.113,0,0,1,77.01,10.8a9.03,9.03,0,0,1-3.971-3.018,8.942,8.942,0,0,1-1.775-4.929,8.955,8.955,0,0,1,1.83-5.927A9.029,9.029,0,0,1,79.612-6.6ZM78.53-4.557A7.208,7.208,0,0,0,73.951-.982,7.517,7.517,0,0,0,73.1,2.965h.02a5.439,5.439,0,0,0,.073.706,7.226,7.226,0,0,0,3.979,5.258,7.174,7.174,0,0,0,5.383.341,7.215,7.215,0,0,0,3.629-2.715,7.158,7.158,0,0,0,1.283-3.793,4.191,4.191,0,0,0-.008-.7,7.2,7.2,0,0,0-5.141-6.54A7.148,7.148,0,0,0,78.53-4.557Z" transform="translate(-36.002 6.636)" fill="#060709"/>*/}
                   {/*     <path id="Path_330" data-name="Path 330" d="M92.939,3.408a5.359,5.359,0,0,1,2.9.013A4.314,4.314,0,0,1,98.609,6.11a4.743,4.743,0,0,1-.481,3.96,18.24,18.24,0,0,1-2.091,2.613q-1.828,1.975-3.66,3.948,3.33-.005,6.66,0c0,.474,0,.948,0,1.422-3.289,0-6.579,0-9.868,0,2.1-2.278,4.223-4.538,6.316-6.824a6.8,6.8,0,0,0,1.876-3.037,2.9,2.9,0,0,0-.822-2.66A3.3,3.3,0,0,0,92.9,4.894,8.266,8.266,0,0,0,92.939,3.408Z" transform="translate(-38.972 5.006)" fill="#060709"/>*/}
                   {/* </g>*/}
                   {/* <text id="IDENTITY_SERVER" data-name="IDENTITY SERVER" transform="translate(957 -1201.461)" fill="#fff" fontSize="21" fontFamily="Helvetica"><tspan x="0" y="0">IDENTITY SERVER</tspan></text>*/}
                </g>
                <svg xmlns="http://www.w3.org/2000/svg" x="195" y="50" width="150" height="47.13" viewBox="0 0 325.5 47.13">
                    <g id="logo-1" transform="translate(-401.5 -178.71)">
                        <path id="Path_2308" data-name="Path 2308" d="M720.99,178.71l1.93,3.35-2.14,3.72h4.28l1.94,3.35H714.97Z" fill="#ff7300"/>
                        <path id="Path_2309" data-name="Path 2309" d="M705.95,189.13l1.94-3.36,4.28.01-2.14-3.72,1.93-3.35,6.02,10.42Z" fill="#ff7300"/>
                        <path id="Path_2310" data-name="Path 2310" d="M718.62,196.94l-2.14-3.71-2.15,3.71h-3.87l6.02-10.42,6.01,10.42Z"/>
                        <path id="Path_2311" data-name="Path 2311" d="M445.61,225.82V218h19.66a3.27,3.27,0,1,0,0-6.54h-8.6a11.06,11.06,0,0,1,0-22.12h19.66v7.79H456.67a3.419,3.419,0,0,0-3.31,3.32,3.26,3.26,0,0,0,3.27,3.27h8.6a11.06,11.06,0,0,1,0,22.12Z"/>
                        <path id="Path_2312" data-name="Path 2312" d="M497.42,225.82a18.23,18.23,0,1,1,0-36.45h15.36v7.79H497.42a10.44,10.44,0,0,0,0,20.87H505v-6.54h-5.73V203.7h13.52v22.12Z"/>
                        <path id="Path_2313" data-name="Path 2313" d="M587.11,225.82,569.53,208.4v17.42h-7.79V189.37H581.4a11.05,11.05,0,0,1,7.82,18.87,11.63,11.63,0,0,1-3.12,2.26l-2.32,1.13L598,225.82ZM581.4,203.7a3.3,3.3,0,0,0,0-6.59H569.53v6.54Z"/>
                        <path id="Path_2314" data-name="Path 2314" d="M600.89,225.82V189.37h15.36a18.23,18.23,0,1,1,0,36.45ZM616.25,218a10.44,10.44,0,0,0,0-20.87h-7.57V218Z"/>
                        <path id="Path_2315" data-name="Path 2315" d="M688.54,225.82a18.21,18.21,0,1,1,12.89-5.34,17.42,17.42,0,0,1-12.89,5.34Zm0-28.66a10.45,10.45,0,1,0,7.37,3.06A10.13,10.13,0,0,0,688.54,197.16Z"/>
                        <path id="Path_2316" data-name="Path 2316" d="M401.5,225.82h8.71l12.34-21.37,12.33,21.37h8.7l-21.03-36.45Z"/>
                        <path id="Path_2317" data-name="Path 2317" d="M516.16,225.82h8.71l12.33-21.37,12.33,21.37h8.71L537.2,189.37Z"/>
                        <path id="Path_2318" data-name="Path 2318" d="M637.84,225.71V189.39h30.45v7.72H645.61v6.68h17.01v7.53H645.61v6.66h22.68v7.73Z"/>
                    </g>
                </svg>
                {options.length>0 && (
                    <g>
                        <line x1="87" y1="430" x2="197" y2="430" stroke="#CACBCE" strokeWidth="2"/>
                        <text fontFamily="Cambria" fontSize="16" id="OR">
                            <tspan id="svg_1" y={435} x={261}>OR</tspan>
                        </text>
                        <line x1="327" y1="430" x2="437" y2="430" stroke="#CACBCE" strokeWidth="2"/>
                    </g>
                )}
                {options.map((option: string, index:number) => {
                    let x=87, y=460+50*index;
                    return (
                        <MultipleFactor key={index} type={option} x={x} y={y}/>
                    )})
                }
            </svg>
        </div>
    )
}