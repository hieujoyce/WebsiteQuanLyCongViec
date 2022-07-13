import React from "react";
import "./style.scss";

const NotFound = () => {
    return (
        <div className="not-found">
            <div class="container">
                <h1 class="first-four">4</h1>
                <div class="cog-wheel1">
                    <div class="cog1">
                        <div class="top"></div>
                        <div class="down"></div>
                        <div class="left-top"></div>
                        <div class="left-down"></div>
                        <div class="right-top"></div>
                        <div class="right-down"></div>
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                </div>

                <div class="cog-wheel2">
                    <div class="cog2">
                        <div class="top"></div>
                        <div class="down"></div>
                        <div class="left-top"></div>
                        <div class="left-down"></div>
                        <div class="right-top"></div>
                        <div class="right-down"></div>
                        <div class="left"></div>
                        <div class="right"></div>
                    </div>
                </div>
                <h1 class="second-four">4</h1>
                <h2 class="wrong-para">Uh Oh! Page not found!</h2>
            </div>
        </div>
    );
};

export default NotFound;
