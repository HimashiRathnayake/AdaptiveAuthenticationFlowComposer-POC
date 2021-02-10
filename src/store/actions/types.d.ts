type AstState = {
    changedFromVisualEditor: boolean
    ast: Object
}

type Step = {
    id: number,
    options?: string[]
}

type StepsState = {
    steps: Step[]
    useSubjectFrom: number
    useAttributesFrom: number
}

type AstAction = {
    type: string
    ast: Object
}

type StepAction = {
    type: string
    step: number
    factors?: string[]
}

type DispatchType = (args: AstAction|StepAction) => AstAction | StepAction
