import React from "react";
import authFactors from "../AuthFactors.json";
import '../App.css';
import {DraggableStep} from "../visualEDitor/DraggableStep";
import {HTML5Backend} from "react-dnd-html5-backend";
import {DndProvider} from "react-dnd";

export const SideBar: React.FC = () => {

    return (
        <div style={{display: 'flex', flexDirection: 'column', justifyItems:'center'}}>
            <h3 style={{paddingLeft:'1.5rem'}}>Authentication Factors</h3>
            <DndProvider backend={HTML5Backend}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    {authFactors.map((factor: any) => (
                    <DraggableStep key={factor.id} name={factor.displayName}/>
                    ))}
                </div>
            </DndProvider>
            <h3 style={{paddingLeft:'1.5rem'}}>Components</h3>
            <DndProvider backend={HTML5Backend}>
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <DraggableStep name="Step" />
                    <DraggableStep name="HasRole" />
                </div>
            </DndProvider>
        </div>
    );
}
