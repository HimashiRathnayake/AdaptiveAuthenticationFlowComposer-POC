import {Step} from "./Step";
import {ConditionNode} from "./ConditionNode";
import {SuccessNode} from "./SuccessNode";
import {PlusNode} from "./PlusNode";
import {MultiFactorNode} from "./MultiFactorNode";
import {Connector} from "./Connector";
import {FailureNode} from "./FailureNode";
import {StartNode} from "./StartNode";

export const nodeTypes = {
    special: Step,
    condition: ConditionNode,
    success: SuccessNode,
    plus: PlusNode,
    multiFactor: MultiFactorNode,
    connector: Connector,
    start: StartNode,
    failure: FailureNode

};