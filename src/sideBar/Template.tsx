import React from 'react';
import "../styles/template.css";
import {BsGearFill, FiDatabase, FiLogIn, HiUsers} from "react-icons/all";

interface BoxProps {
    name: string,
    updateWithTemplate: Function
}

export const Template: React.FC<BoxProps> = ({ name, updateWithTemplate }) => {



    return (
        <div className="template-container" onClick={()=>updateWithTemplate(name)}>
            {name==="Role-Based" ? <HiUsers/> : name==="User Store-Based" ?  <FiDatabase/> : name==="Basic Login" ? <FiLogIn/>: <BsGearFill/>}
            <div className="template-text">{name}</div>
        </div>
    )
}
