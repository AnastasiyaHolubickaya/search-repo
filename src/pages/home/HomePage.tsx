import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import classes from './homePage.module.css';
import {Input} from "../../components/commons/FormControls/FormControls";
import {getRepo, listType, setClickRepo} from "../../redux/reducer";
import {ListItems} from "../../components/listItems/ListItems";
import {byField} from "../../utils/sortByField";


type ownPropsType = {}
type PropsType = {
    dataRepoz: Array<listType>
}
type formDataType = {
    name: string
}
type validatorType = (value: string) => string | undefined

const requiredField: validatorType = (value) => {
    if (value) return undefined;
    return "введите данные для поиска";
};
const validateSumbol: validatorType = (value) => {
    if (value !== undefined) {
        let regex = new RegExp(/^[a-z]+$/i);
        if (!regex.test(value)) return (`разрешен ввод только букв латинского алфавита`);
    }
    return undefined;
};


const SearchForm: React.FC<InjectedFormProps<formDataType> & ownPropsType> = ({handleSubmit, error}) => {
    return (
        <form className={classes.loginForm} onSubmit={handleSubmit}>
            <div className={classes.loginFormInput}><Field name={'name'}
                                                           component={Input}
                                                           validate={[requiredField, validateSumbol]}/></div>
            {
                error && <div className={classes.formSummaryError}> {error}</div>
            }
            <div className={classes.loginFormButton}>
                <button className={classes.btnSubmit}> Поиск</button>
            </div>
        </form>
    )
};
const ReduxForm = reduxForm<formDataType, ownPropsType>({
    form: 'search'
})(SearchForm);


export const HomePage: React.FC<PropsType> = ({dataRepoz}) => {

        const [data, setData] = useState(dataRepoz);
        const [isByName, setIsByName] = useState(false);
        const [isByRating, setIsByRating] = useState(false);
        const [isByDate, setIsByDate] = useState(false);
        const isRequestSub = useSelector((state: AppStateType) => state.app.isRequestSubmit);
        const mess = useSelector((state: AppStateType) => state.app.message);
        const dispatch = useDispatch();

        const onSubmit = (formData: formDataType) => {
            dispatch(getRepo(formData.name));
        };
        const handleOnClick = (id: number) => {
            dispatch(setClickRepo(id));
        };

        useEffect(() => {
            setData(dataRepoz);
        }, [dataRepoz]);

        useEffect(() => {
            if (isByName) {
                setData(dataRepoz.sort(byField("name")));
                setIsByName(false)
            }
            if (isByRating) {
                setData(dataRepoz.sort(byField("stargazers_count")));
                setIsByRating(false)
            }
            if (isByDate) {
                setData(dataRepoz.sort(byField("created_at")));
                setIsByDate(false)
            }
        }, [isByName, isByDate, isByRating]);

        return (
            <div className={classes.container}>
                <p>Поиск репозиториев на GitHub</p>
                <ReduxForm
                    onSubmit={onSubmit}
                />
                <div>
                    <p style={{fontSize: "14px"}}>Сортировать по</p>
                    <button onClick={() => (setIsByName(true))}>имени</button>
                    <button onClick={() => (setIsByDate(true))}>дате</button>
                    <button onClick={() => (setIsByRating(true))}>рейтингу</button>
                </div>
                {isRequestSub && <ListItems data={data}
                                            handleOnClick={handleOnClick}
                />}
                {mess && <div>по вашему запросу ничего не найдено: {mess}</div>}

            </div>
        )
    }
;