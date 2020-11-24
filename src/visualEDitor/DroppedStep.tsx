import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"

type Props = {
    step: string,
    success: string,
    failure: string
    // removeStep: (article: IStep) => void
}

export const DroppedStep: React.FC<Props> = ({step, success, failure
                                                // removeStep
}) => {
    const dispatch: Dispatch<any> = useDispatch()

    // const deleteStep = React.useCallback(
    //     (step: IStep) => dispatch(removeStep(step)),
    //     [dispatch, removeStep]
    // )

    return (
        <div className="Article">
            <div style={{
                backgroundColor: "grey",
                width: 120, height:120,
                color: "white",
                marginLeft: "2px",
                marginTop: "10px",
                alignItems: "center"
            }}>
                <div style={{fontSize: '1.2rem', marginTop:"5px", marginBottom: "10px"}}>Step {step}</div>
                <div>onSuccess: {success}</div>
                <div>onFailure: {failure}</div>
                <button>Delete</button>
            </div>
            {/*<button onClick={() => deleteStep(step)}>Delete</button>*/}
        </div>
    )
}