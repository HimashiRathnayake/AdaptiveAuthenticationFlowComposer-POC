import React from 'react';

const popup: React.CSSProperties = {
    height: window.innerHeight*2/3,
    width: window.innerWidth/2,
    paddingInline: '1rem',
    textAlign: 'center',
    fontSize: '1rem',
    lineHeight: 'normal',
    alignSelf: 'center',
    minHeight: '8rem',
    minWidth: '8rem',
    paddingBottom: '1rem',
    backgroundColor: 'rgba(0,0,0, 0.5)',
}
const popupInner: React.CSSProperties = {
    backgroundColor: 'white',
    margin: 100,
    height: window.innerHeight/3,
    paddingTop: 20,
}

type Props={
    onCancel: Function,
    onSuccess: Function,
    onFailure: Function
}

export const Popup: React.FC<Props> = ({onCancel, onSuccess, onFailure}) => {
    return (
        <div style={popup}>
            <div style={popupInner}>
                <h1>Select Type</h1>
                <button onClick={()=>onSuccess()}>onSuccess</button>
                <button onClick={()=>onFailure()}>onFailure</button>
                <button onClick={()=>onCancel()}>cancel</button>
            </div>
        </div>
    );
}
