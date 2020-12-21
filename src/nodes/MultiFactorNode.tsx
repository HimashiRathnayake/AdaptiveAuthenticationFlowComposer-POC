import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {Google} from "../authenticationFactors/Google";
import {Facebook} from "../authenticationFactors/Facebook";
import {Instagram} from "../authenticationFactors/Instagram";
import {Twitter} from "../authenticationFactors/Twitter";
import {Fido} from "../authenticationFactors/Fido";
import {Totp} from "../authenticationFactors/Totp";

// @ts-ignore
export const MultiFactorNode = ({data}) => {
    return (
        <div>
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
            // : data.type === "totp" ? <Totp/>
            :<div className="multiFactor">{data.type}</div>
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