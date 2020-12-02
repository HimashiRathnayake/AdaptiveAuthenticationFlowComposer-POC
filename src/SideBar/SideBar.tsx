import React from "react";
import authFactors from "../AuthFactors.json";
import '../styles/sidebar.css';
import {DraggableStep} from "../visualEDitor/DraggableStep";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export const SideBar: React.FC = () => {

    return (
        <div className="container">
            <h3 className="type">MULTI-FACTOR AUTHENTICATION</h3>
            <DndProvider backend={HTML5Backend}>
                <div className="options">
                    {authFactors.map((factor: any) => (
                    <DraggableStep key={factor.id} name={factor.displayName}/>
                    ))}
                </div>
            </DndProvider>
            <div style={{height:'10px'}}></div>
            <h3 className="type">COMPONENTS</h3>
            <DndProvider backend={HTML5Backend}>
                <div className="options">
                    <DraggableStep name="Step" />
                    <DraggableStep name="hasAnyOfTheRoles" />
                </div>
            </DndProvider>
        </div>
    );
}
