import React from "react";
import "./header.css";

function Header(props) {
    return(
        <header className="header-container">
        <div className="header-wrapper">
            <img src={props.imageSrc}/>
        </div>
        </header>
    )
}
export default Header;