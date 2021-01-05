import React from "react";
import "../styles/svg.css";

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
            {type==="Google" &&
            <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x={iconX} y={iconY} height={iconHeight} width={iconWidth}
                 viewBox="-150 -150 700 700" enableBackground="new 0 0 512 512;" xmlSpace="preserve">
                <path fill="#167EE6" d="M492.668,211.489l-208.84-0.01c-9.222,0-16.697,7.474-16.697,16.696v66.715
                    c0,9.22,7.475,16.696,16.696,16.696h117.606c-12.878,33.421-36.914,61.41-67.58,79.194L384,477.589
                    c80.442-46.523,128-128.152,128-219.53c0-13.011-0.959-22.312-2.877-32.785C507.665,217.317,500.757,211.489,492.668,211.489z"/>
                <path fill="#12B347" d="M256,411.826c-57.554,0-107.798-31.446-134.783-77.979l-86.806,50.034
                    C78.586,460.443,161.34,512,256,512c46.437,0,90.254-12.503,128-34.292v-0.119l-50.147-86.81
                    C310.915,404.083,284.371,411.826,256,411.826z"/>
                <path fill="#0F993E" d="M384,477.708v-0.119l-50.147-86.81c-22.938,13.303-49.48,21.047-77.853,21.047V512
                    C302.437,512,346.256,499.497,384,477.708z"/>
                <path fill="#FFD500" d="M100.174,256c0-28.369,7.742-54.91,21.043-77.847l-86.806-50.034C12.502,165.746,0,209.444,0,256
                    s12.502,90.254,34.411,127.881l86.806-50.034C107.916,310.91,100.174,284.369,100.174,256z"/>
                <path fill="#FF4B26" d="M256,100.174c37.531,0,72.005,13.336,98.932,35.519c6.643,5.472,16.298,5.077,22.383-1.008
                    l47.27-47.27c6.904-6.904,6.412-18.205-0.963-24.603C378.507,23.673,319.807,0,256,0C161.34,0,78.586,51.557,34.411,128.119
                    l86.806,50.034C148.202,131.62,198.446,100.174,256,100.174z"/>
                <path fill="#D93F21" d="M354.932,135.693c6.643,5.472,16.299,5.077,22.383-1.008l47.27-47.27
                    c6.903-6.904,6.411-18.205-0.963-24.603C378.507,23.672,319.807,0,256,0v100.174C293.53,100.174,328.005,113.51,354.932,135.693z"/>
                </svg>
            }
            {type==="Instagram" &&
                <svg enableBackground="new 0 0 24 24" height={iconHeight} viewBox="-6 -5 30 30" width={iconWidth} xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x={iconX} y={iconY}>
                    <linearGradient id="SVGID_1_" gradientTransform="matrix(0 -1.982 -1.844 0 -132.522 -51.077)" gradientUnits="userSpaceOnUse" x1="-37.106" x2="-26.555" y1="-72.705" y2="-84.047"><stop offset="0" stopColor="#fd5"/><stop offset=".5" stopColor="#ff543e"/><stop offset="1" stopColor="#c837ab"/>
                    </linearGradient>
                    <path d="m1.5 1.633c-1.886 1.959-1.5 4.04-1.5 10.362 0 5.25-.916 10.513 3.878 11.752 1.497.385 14.761.385 16.256-.002 1.996-.515 3.62-2.134 3.842-4.957.031-.394.031-13.185-.001-13.587-.236-3.007-2.087-4.74-4.526-5.091-.559-.081-.671-.105-3.539-.11-10.173.005-12.403-.448-14.41 1.633z" fill="url(#SVGID_1_)"/>
                    <path d="m11.998 3.139c-3.631 0-7.079-.323-8.396 3.057-.544 1.396-.465 3.209-.465 5.805 0 2.278-.073 4.419.465 5.804 1.314 3.382 4.79 3.058 8.394 3.058 3.477 0 7.062.362 8.395-3.058.545-1.41.465-3.196.465-5.804 0-3.462.191-5.697-1.488-7.375-1.7-1.7-3.999-1.487-7.374-1.487zm-.794 1.597c7.574-.012 8.538-.854 8.006 10.843-.189 4.137-3.339 3.683-7.211 3.683-7.06 0-7.263-.202-7.263-7.265 0-7.145.56-7.257 6.468-7.263zm5.524 1.471c-.587 0-1.063.476-1.063 1.063s.476 1.063 1.063 1.063 1.063-.476 1.063-1.063-.476-1.063-1.063-1.063zm-4.73 1.243c-2.513 0-4.55 2.038-4.55 4.551s2.037 4.55 4.55 4.55 4.549-2.037 4.549-4.55-2.036-4.551-4.549-4.551zm0 1.597c3.905 0 3.91 5.908 0 5.908-3.904 0-3.91-5.908 0-5.908z" fill="#fff"/>
                </svg>
            }
            {type==="Twitter" &&
                <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x={iconX} y={iconY} height={iconHeight} width={iconWidth}
                     viewBox="-100 -100 600 600" enableBackground="new 0 0 512 512" xmlSpace="preserve">
                    <path fill="#03A9F4" d="M512,97.248c-19.04,8.352-39.328,13.888-60.48,16.576c21.76-12.992,38.368-33.408,46.176-58.016
                        c-20.288,12.096-42.688,20.64-66.56,25.408C411.872,60.704,384.416,48,354.464,48c-58.112,0-104.896,47.168-104.896,104.992
                        c0,8.32,0.704,16.32,2.432,23.936c-87.264-4.256-164.48-46.08-216.352-109.792c-9.056,15.712-14.368,33.696-14.368,53.056
                        c0,36.352,18.72,68.576,46.624,87.232c-16.864-0.32-33.408-5.216-47.424-12.928c0,0.32,0,0.736,0,1.152
                        c0,51.008,36.384,93.376,84.096,103.136c-8.544,2.336-17.856,3.456-27.52,3.456c-6.72,0-13.504-0.384-19.872-1.792
                        c13.6,41.568,52.192,72.128,98.08,73.12c-35.712,27.936-81.056,44.768-130.144,44.768c-8.608,0-16.864-0.384-25.12-1.44
                        C46.496,446.88,101.6,464,161.024,464c193.152,0,298.752-160,298.752-298.688c0-4.64-0.16-9.12-0.384-13.568
                        C480.224,136.96,497.728,118.496,512,97.248z"/>
                </svg>
            }
            {type==="Facebook" &&
                <svg height={iconHeight} width={iconWidth} viewBox="-100 -100 612 612" xmlns="http://www.w3.org/2000/svg" x={iconX} y={iconY}>
                    <path d="m483.738281 0h-455.5c-15.597656.0078125-28.24218725 12.660156-28.238281 28.261719v455.5c.0078125 15.597656 12.660156 28.242187 28.261719 28.238281h455.476562c15.605469.003906 28.257813-12.644531 28.261719-28.25 0-.003906 0-.007812 0-.011719v-455.5c-.007812-15.597656-12.660156-28.24218725-28.261719-28.238281zm0 0" fill="#4267b2"/>
                    <path d="m353.5 512v-198h66.75l10-77.5h-76.75v-49.359375c0-22.386719 6.214844-37.640625 38.316406-37.640625h40.683594v-69.128906c-7.078125-.941406-31.363281-3.046875-59.621094-3.046875-59 0-99.378906 36-99.378906 102.140625v57.035156h-66.5v77.5h66.5v198zm0 0" fill="#fff"/>
                </svg>
            }
            {type==="fido" &&
                <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x={iconX} y={iconY}
                     viewBox="0 0 503.488 503.488" enableBackground="new 0 0 503.488 503.488" xmlSpace="preserve" width={iconWidth} height={iconHeight}>
                    <g>
                        <g>
                            <path d="M382.616,133.644h-61.908c-2.148,0-4.156-0.436-4.156,1.7v61.904c0,2.14,2.008,3.28,4.156,3.28h15.516v49.764
                                l-70.82,69.436V113.972h27.86c0.024,0,0.056,0,0.056,0c2.164,0,3.892-2.744,3.892-4.88c0-0.78-0.228-2.016-0.624-2.628
                                L254.616,2.544C254.024,1.088,252.6,0,251.032,0c-1.58,0-3,0.892-3.584,2.352l-42.24,104.304
                                c-0.484,1.196-0.344,3.552,0.376,4.616c0.72,1.068,1.92,2.704,3.208,2.704h25.136v279.308l-66.884-69.672v-71.948
                                c11.804-5.852,18.888-17.824,18.888-31.188c0-19.208-15.856-34.832-35.06-34.832c-19.212,0-34.744,15.62-34.744,34.832
                                c0,13.364,7.64,25.336,19.444,31.188v78.356c0,0.992-0.116,2.008,0.084,3.056c0.084,0.388,0.1,0.756,0.22,1.124l0.084,0.436
                                c0.116,0.432,0.22,0.868,0.392,1.3c0.196,0.452,0.408,0.88,0.648,1.308l0.22,0.392c0.164,0.332,0.328,0.664,0.544,0.976
                                c0.584,0.88,1.24,1.676,1.932,2.364l85.872,85.868c-10.568,8.008-16.964,20.632-16.964,33.992
                                c0,23.52,19.132,42.652,42.656,42.652c23.516,0,41.976-19.132,41.976-42.652c0-17.776-12.1-33.412-27.836-39.752v-57.576
                                l96.5-95.836c0.704-0.7,1.712-1.504,2.288-2.38c0.22-0.308,0.556-0.64,0.728-0.976l0.296-0.396
                                c0.244-0.432,0.524-0.872,0.704-1.312c0.172-0.42,0.32-0.856,0.444-1.292l0.132-0.432c0.124-0.372,0.532-0.74,0.616-1.164
                                c0.196-1.008,0.58-2.028,0.58-3.016v-56.176h14.92c2.14,0,4.752-1.14,4.752-3.28v-61.904
                                C387.364,133.208,384.756,133.644,382.616,133.644z"/>
                        </g>
                    </g>
                </svg>
            }

            <text x={x} y={y} className="buttonText" id="Sign_In_With_Google_Idp">
                <tspan className="textLeft" id="svg_1" y={y+22} x={x+60}>Sign In With </tspan>
                <tspan className="textRight" id="svg_2" y={y+22}>{type}</tspan>
            </text>
        </g>
    )
}