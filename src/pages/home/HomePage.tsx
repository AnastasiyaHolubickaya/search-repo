import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import classes from './homePage.module.css';
import {Input} from "../../components/commons/FormControls/FormControls";
import {getRepo, listType, setClickRepo} from "../../redux/reducer";
import {ListItems} from "../../components/listItems/ListItems";


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

    const isRequestSub = useSelector((state: AppStateType) => state.app.isRequestSubmit);
    const mess = useSelector((state: AppStateType) => state.app.message);
    const dispatch = useDispatch();

    const onSubmit = (formData: formDataType) => {
        dispatch(getRepo(formData.name));
    };
    const handleOnClick = (id: number) => {
        dispatch(setClickRepo(id));
    };

    return (
        <div className={classes.container}>
            <p>Поиск репозиториев на GitHub</p>
            <ReduxForm
                onSubmit={onSubmit}
            />
            {isRequestSub && <ListItems data={dataRepoz}
                                        handleOnClick={handleOnClick}
            />}
            {mess && <div>по вашему запросу ничего не найдено: {mess}</div>}

        </div>
    )
};