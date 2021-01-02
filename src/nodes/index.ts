import {Step} from "./Step";
import {ConditionNode} from "./ConditionNode";
import {SuccessNode} from "./SuccessNode";
import {PlusNode} from "./PlusNode";
import {MultiFactorNode} from "./MultiFactorNode";
import {Connector} from "./Connector";
import {FailureNode} from "./FailureNode";

export const nodeTypes = {
    special: Step,
    condition: ConditionNode,
    success: SuccessNode,
    plus: PlusNode,
    multiFactor: MultiFactorNode,
    invisible: Connector,
    failure: FailureNode
};