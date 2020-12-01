type AstState = {
    changedFromVisualEditor: boolean
    ast: Object
}

type AstAction = {
    type: string
    ast: Object
}

type DispatchType = (args: AstAction) => AstAction