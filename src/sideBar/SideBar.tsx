import React from "react";
import authFactors from "../AuthFactors.json";
import '../styles/sidebar.css';
import {DraggableStep} from "../visualEditor/DraggableStep";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export const SideBar: React.FC = () => {

    return (
        <div className="container">
            <h3 className="type">AUTHENTICATION FACTORS</h3>
            <DndProvider backend={HTML5Backend}>
                <div className="options">
                    {authFactors.map((factor: any) => (
                    <DraggableStep key={factor.id} name={factor.displayName} type="auth-factor"/>
                    ))}
                </div>
                <h3 className="type">SOCIAL LOGIN</h3>
                <div className="options">
                    <DraggableStep name="Facebook" type="social-login"/>
                    <DraggableStep name="Twitter" type="social-login"/>
                    <DraggableStep name="Instagram" type="social-login"/>
                    <DraggableStep name="Google" type="social-login"/>
                </div>
            </DndProvider>
            {/*<div style={{height:'10px'}}></div>*/}
            {/*<DndProvider backend={HTML5Backend}>*/}
            {/*    <h3 className="type">COMPONENTS</h3>*/}
            {/*    <div className="options">*/}
            {/*        <DraggableStep name="Step" />*/}
            {/*    </div>*/}
            {/*    <h3 className="type">CONDITIONS</h3>*/}
            {/*    <div className="options">*/}
            {/*        <DraggableStep name="hasAnyOfTheRoles" />*/}
            {/*    </div>*/}
            {/*</DndProvider>*/}
        </div>
    );
}
