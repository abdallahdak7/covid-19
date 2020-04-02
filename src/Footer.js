import React from 'react';

var style = {
    backgroundColor: "#0f0f20",
    borderTop: "1px solid #E7E7E7",
    textAlign: "center",
    padding: "20px",
    position: "fixed",
    left: "0",
    bottom: "0",
    width: "100%",
}

var phantom = {
    display: 'block',
    padding: '20px',
    height: '60px',
    width: '100%',
}

function Footer({ children }) {
    return (
        <div>
            <div style={phantom} />

            <div style={style}>
                <p>Made by Abdallah Daknache &copy;</p>
             
            </div>
        </div>
    )
}

export default Footer