// Column.js
import React from "react";
import './Column.css';

const Column = ({ title, children }) => {
    return (
        <div className="column-toplevel">
            <h1>{title}</h1>
            <div className="column">
              {children}
            </div>
        </div>
    );
}

export default Column;
