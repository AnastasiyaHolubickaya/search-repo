import React from "react";
import classes from './detailPage.module.css';
import {listType} from "../../redux/reducer";
import {NavLink} from "react-router-dom";

type propsType = {
    data: listType
}


export const DetailPage: React.FC<propsType> = ({data}) => {
    return (
        <div className="card-panel white ">
            <div className={classes.block}>
                <div className="card-image" style={{width:"200px", marginRight:"20px"}}>
                    <img style={{width:"100%"}} src={data.owner.avatar_url} alt=""/>
                </div>
                <div className={classes.block_info}>
                    <span>Имя репозитория:</span>
                    <span>{data.name}</span>
                    <span>Автор: </span>
                    <span>{data.owner.login}</span>
                    <span>Описание: </span>
                    <span>{data.description}</span>
                    <span>Дата создания: </span>
                    <span>{data.created_at}</span>
                    <a className="card-action lime-text" href={data.html_url}><b>Link GitHub</b></a>
                    <NavLink className="waves-effect waves-light white teal-text  btn-small" to ="/" >HOME</NavLink>
                </div>
            </div>
        </div>
    )
};