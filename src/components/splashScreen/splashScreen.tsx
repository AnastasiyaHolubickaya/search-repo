import React from "react";
import classes from './splash.module.css';
import {Animated} from "react-animated-css";


type propsType = {}


export const SplashScreen: React.FC<propsType> = () => {
    return (
        <div className={classes.container}>
            <Animated animationIn="zoomIn" animationOut="fadeOut" isVisible={true}>
                <p>
                    Анастасия Голубицкая
                </p>
            </Animated>
        </div>
    )
};
