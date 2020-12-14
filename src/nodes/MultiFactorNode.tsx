import {Handle, Position} from "react-flow-renderer";
import React from "react";
import {Google} from "../svg/Google";
import {Facebook} from "../svg/Facebook";
import {Instagram} from "../svg/Instagram";
import {Twitter} from "../svg/Twitter";

// @ts-ignore
export const MultiFactorNode = ({data}) => {
    return (
        <div>
            <Handle
                type="target"
                position={Position.Left}
                style={{ opacity : 0 , top:200}}
                onConnect={(params) => console.log('handle onConnect', params)}
            />
            {data.type === "Google" ? <Google options={[]}/>
            : data.type === "Facebook" ? <Facebook/>
            : data.type === "Instagram" ? <Instagram/>
            // : data.type === "Twitter" ? <Twitter/>
            :<div className="multiFactor">{data.type}</div>
            }
            <Handle
                type="source"
                position={Position.Right}
                id="c"
                style={{ opacity : 0 , top:200}}
            />
        </div>
    );
};