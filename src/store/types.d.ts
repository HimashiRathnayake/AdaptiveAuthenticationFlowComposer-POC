type AstState = {
    changedFromVisualEditor: boolean
    ast: Object
}

type StepsState = {
    steps: any[]
}

type AstAction = {
    type: string
    ast: Object
}

type StepAction = {
    type: string
    step: any
    factors: any[]
}

type DispatchType = (args: AstAction|StepAction) => AstAction | StepAction
