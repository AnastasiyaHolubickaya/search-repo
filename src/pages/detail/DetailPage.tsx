import React from "react";
import classes from './detailPage.module.css';
import {listType} from "../../redux/reducer";

type propsType = {
    data: listType
}


export const DetailPage: React.FC<propsType> = ({data}) => {
    return (
        <div className={classes.block}>
            <div className={classes.block_photo}>
                <img src={data.owner.avatar_url} alt=""/>
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
                <a href={data.html_url}>Cсылка на GitHub</a>
            </div>
        </div>
    )
};