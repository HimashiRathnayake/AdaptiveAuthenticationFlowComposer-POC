import React from "react";
import '../styles/sidebar.css';
import {Template} from "./Template";
import {AiOutlineCopyrightCircle} from "react-icons/all";
import templates from "../api/Templates.json";

export const SideBar: React.FC = () => {

    return (
        <>
            <div className="sidebar">
                <h3 className="sidebar-header">
                    Templates
                </h3>
                <div className="sidebar-options">
                    {templates.map((template: any) => (
                        <Template
                            key={template.name}
                            name={template.name}
                        />
                    ))}
                </div>
                <div className="sidebar-bottom">
                    <AiOutlineCopyrightCircle className="copyright-icon"/>
                    2021 WSO2
                </div>
            </div>
        </>
    );
}
