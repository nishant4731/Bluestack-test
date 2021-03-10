import React from "react";
import "./Modal.css";

function Modal(props) {
    return(
        <div className="modal-wrap">
            <div className="inner-wrap">
                <h1>{props.heading}</h1>
                {props.children && props.children}
                <button onClick={props.onClose}>close</button>
            </div>
        </div>
    )
}

export default Modal;