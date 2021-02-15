import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {Google} from "../SVGs/Google";
import {Facebook} from "../SVGs/Facebook";
import {Instagram} from "../SVGs/Instagram";
import {Twitter} from "../SVGs/Twitter";
import {Fido} from "../SVGs/Fido";
import Jwt from "../../icons/jwt.png";
import {Totp} from "../SVGs/Totp";
// @ts-ignore
export const MultiFactorNode = ({data}) => {
    return (
        <div className="multiFactorNode">
            <Handle
                type="target"
                position={Position.Left}
                style={{ opacity : 0}}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            {data.type === "Google" ? <Google/>
            : data.type === "Facebook" ? <Facebook/>
            : data.type === "Instagram" ? <Instagram/>
            : data.type === "Twitter" ? <Twitter/>
            : data.type === "fido" ? <Fido/>
            : data.type === "totp" ? <Totp/>
            :<div className="multiFactor">
                <div className="multiFactorText">{data.type}</div>
                {data.type === "jwt-basic" ? <img src={Jwt} alt="Jwt" width="150" height="106"/>
                : <div>
                    <svg className="icon" width="50" height="50" viewBox="0 0 512.005 512.005">
                        <path className="path fill secondary"
                            d="M256.003 234.672c-11.76 0-21.333 9.573-21.333 21.333 0 7.792 4.409 14.329 10.667 18.053v13.947a10.66 10.66 0 0010.667 10.667 10.66 10.66 0 0010.667-10.667v-13.947c6.258-3.724 10.667-10.262 10.667-18.053-.002-11.76-9.575-21.333-21.335-21.333zM256.003 149.339c-17.646 0-32 14.354-32 32v10.667h64v-10.667c0-17.646-14.355-32-32-32z"/>
                        <path className="path fill secondary"
                            d="M440.888 64.609l-181.333-64a10.65 10.65 0 00-7.104 0l-181.333 64a10.683 10.683 0 00-7.115 10.063v128c0 165.646 24.563 226.188 187.198 308.188 1.51.76 3.156 1.146 4.802 1.146a10.67 10.67 0 004.802-1.146c162.635-82 187.198-142.542 187.198-308.188v-128c0-4.521-2.855-8.552-7.115-10.063zm-88.885 255.396c0 11.76-9.573 21.333-21.333 21.333H181.336c-11.76 0-21.333-9.573-21.333-21.333V213.339c0-11.76 9.573-21.333 21.333-21.333v-10.667c0-41.167 33.5-74.667 74.667-74.667s74.667 33.5 74.667 74.667v10.667c11.76 0 21.333 9.573 21.333 21.333v106.666z"/>
                    </svg>
                </div>
                }
            </div>
            }
            <Handle
                type="source"
                position={Position.Right}
                id="c"
                style={{ opacity : 0 }}
            />
        </div>
    );
}