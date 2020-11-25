import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import {Container} from "./Container";

type Props = {
    step: string,
    success: any[],
    failure: any[]
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
                width: 150, height:300,
                color: "white",
                marginLeft: "2px",
                marginTop: "10px",
                alignItems: "center"
            }}>
                <div style={{fontSize: '1.2rem', marginTop:"5px", marginBottom: "10px"}}>Step {step}</div>
                <div>
                    <div>onSuccess:</div>
                    <Container steps={success}/>
                </div>
                <div>
                    <div>onFailure:</div>
                    <Container steps={failure}/>
                </div>
                {/*<button>Delete</button>*/}
            </div>
            {/*<button onClick={() => deleteStep(step)}>Delete</button>*/}
        </div>
    )
}