import React, {useState} from "react";
import classes from './listItem.module.css';
import {NavLink} from "react-router-dom";



type propsType = {
    data: any
    handleOnClick: (id: number) => void
}


export const ListItems: React.FC<propsType> = ({data, handleOnClick}) => {
    const [isFavorit, setFavorit] = useState(false);


    const handleAddFavorit = (name: string, id: number) => {
       if(isFavorit){
           setFavorit(false)
       }else {
           setFavorit(true)
       }
        localStorage.setItem(name, JSON.stringify(id));
    };
    const handleRemoveFavorit = (name: string) => {
        if(isFavorit){
            setFavorit(false)
        }else {
            setFavorit(true)
        }
        localStorage.removeItem(name);
    };

    return (
        <div className={classes.block}>
            {data.map((item: any, index: number) => {
                return <div key={item.id.toString()} className={classes.block_item}>
                    <p>Имя репозитория: <b>{item.name}</b></p>
                    <p>Рейтинг: {item.stargazers_count}</p>
                    <NavLink to={'/details'}>
                        <button className={classes.btn} onClick={() => handleOnClick(index)}>детальнее</button>
                    </NavLink>
                    {localStorage.getItem(item.name) ?
                        <button onClick={() => handleRemoveFavorit(item.name)}
                                style={{color: "blue", border: "1px solid blue"}} className={classes.btn}>удалить из
                            избранное
                        </button>
                        : <button onClick={() => handleAddFavorit(item.name, item.id)}
                                  className={classes.btn}
                                  style={{color: "green", border: "1px solid green"}}>добавить в избранное </button>
                    }
                </div>
            })}

        </div>

    )
};