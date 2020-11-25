import * as React from "react"
import { Dispatch } from "redux"
import { useDispatch } from "react-redux"
import {DroppableContainer} from "./DroppableContainer";
import {SuccessFailureStep} from "./SuccessFailureStep";

type Props = {
    step: string,
    success: any[],
    failure: any[]
    // removeStep: (article: IStep) => void
}

const style: React.CSSProperties = {
    padding: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    // flexDirection: "row"
    backgroundColor: 'rgba(0, 0, 0, .5)',
    border: '1px solid rgba(0,0,0,0.2)',
    minHeight: '6rem',
    minWidth: '6rem',
    // padding: '2rem',
    // paddingTop: '1rem',
    margin: '0.5rem',
    // float: 'left',
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
                width: 160, height:370,
                color: "white",
                marginLeft: "2px",
                marginTop: "10px",
                alignItems: "center"
            }}>
                <div style={{fontSize: '1.2rem', marginTop:"5px", marginBottom: "10px"}}>Step {step}</div>
                <div>
                    <div>onSuccess:</div>
                    <DroppableContainer styles={style} containerName={step+' onSuccess'}
                        children={success && success.map((step: any) => (
                            <SuccessFailureStep step={step}/>
                        ))}
                    />
                </div>
                <div>
                    <div>onFailure:</div>
                    <DroppableContainer styles={style} containerName={step+' onFailure'}
                        children={failure && failure.map((step: any) => (
                            <SuccessFailureStep step={step}/>
                        ))}
                    />
                </div>
                {/*<button>Delete</button>*/}
            </div>
            {/*<button onClick={() => deleteStep(step)}>Delete</button>*/}
        </div>
    )
}