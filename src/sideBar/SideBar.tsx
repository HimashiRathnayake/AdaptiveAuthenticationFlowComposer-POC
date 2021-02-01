import React from "react";
import '../styles/sidebar.css';
import {Template} from "./Template";
import {AiOutlineCopyrightCircle, HiUsers} from "react-icons/all";
import templates from "../api/Templates.json";

export const SideBar: React.FC = () => {

    return (
        <div className="container">
            <h3 className="templates-name">Templates</h3>
            <div className="options">
                {templates.map((template: any) => (
                    <Template key={template.name} name={template.name}/>
                ))}
            </div>
            <div className="side-bar-bottom">
                <AiOutlineCopyrightCircle className="copyright-icon"/> 2021 WSO2
            </div>
        </div>
    );
}
