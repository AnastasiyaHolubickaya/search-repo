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
                return <div key={item.id.toString()} className="card-panel white">
                    <p className="black-text">Name REPO: <b className="teal-text">{item.name}</b></p>
                    <p className="black-text">Rating: {item.stargazers_count}</p>
                    <NavLink to={'/details'}>
                        <button
                            className="waves-effect waves-light white teal-text  btn-small"
                            onClick={() => handleOnClick(index)}
                            style={{marginRight:"20px"}}> detail
                        </button>

                    </NavLink>
                    {localStorage.getItem(item.name) ?
                        <button onClick={() => handleRemoveFavorit(item.name)}
                                className="waves-effect waves-light lime lighten-2 teal-text  btn-small">remove to favorit
                        </button>
                        : <button onClick={() => handleAddFavorit(item.name, item.id)}
                                  className="waves-effect waves-light white teal-text lighten-2 btn-small"
                                  >add to favorit </button>
                    }
                </div>
            })}

        </div>

    )
};