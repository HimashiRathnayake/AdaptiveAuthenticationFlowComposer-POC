type AstState = {
    changedFromVisualEditor: boolean
    ast: Object
}

type StepsState = {
    steps: any[]
    useSubjectFrom: string
    useAttributesFrom: string
}

type AstAction = {
    type: string
    ast: Object
}

type StepAction = {
    type: string
    step: any
    factors?: any[]
}

type DispatchType = (args: AstAction|StepAction) => AstAction | StepAction
