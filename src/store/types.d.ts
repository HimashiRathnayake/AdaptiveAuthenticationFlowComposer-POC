type AstState = {
    changedFromVisualEditor: boolean
    ast: Object
}

type AstAction = {
    type: string
    ast: Object
}

type DispatchType = (args: AstAction) => AstAction

// interface IStep {
//     id: number
//     title: string
//     position: number
//     onSuccess?: IStep
//     onFail?: IStep
//     condition?: IStep
// }
//
// type StepState = {
//     steps: IStep[]
// }
//
// type StepAction = {
//     type: string
//     step: IStep
// }
//
// type StepsAction = {
//     type: string
// }
//
// type DispatchType = (args: StepAction) => StepAction
// type DispatchType2 = (args: StepsAction) => StepsAction