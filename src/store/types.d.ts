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
    factor: any
}

type DispatchType = (args: AstAction|StepAction) => AstAction | StepAction
