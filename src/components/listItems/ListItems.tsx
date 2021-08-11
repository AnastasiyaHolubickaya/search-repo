import React from "react";
import classes from './listItem.module.css';
import {NavLink} from "react-router-dom";


type propsType = {
    data: any
    handleOnClick: (id: number) => void
}


export const ListItems: React.FC<propsType> = ({data, handleOnClick}) => {

    return (
        <div className={classes.block}>
            {data.map((item: any, index: number) => {
                return <div key={item.id.toString()} className={classes.block_item}>
                    <p>Имя репозитория: <b>{item.name}</b></p>
                    <p>Рейтинг: {item.stargazers_count}</p>
                    <NavLink to={'/details'}>
                        <button className={classes.btn} onClick={() => handleOnClick(index)}>детальнее</button>
                    </NavLink>
                    <button className={classes.btn}>добавить в избранное</button>
                </div>
            })}

        </div>
    )
};