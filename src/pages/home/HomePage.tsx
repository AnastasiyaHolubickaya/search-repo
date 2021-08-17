import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppStateType} from "../../redux/store";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import classes from './homePage.module.css';
import {Input} from "../../components/commons/FormControls/FormControls";
import {actions, getRepos, listType, setClickRepo} from "../../redux/reducer";
import {ListItems} from "../../components/listItems/ListItems";
import {byField} from "../../utils/sortByField";
import Pagination from "../../components/pagination/Pagination";


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
/*const validateSumbol: validatorType = (value) => {
    if (value !== undefined) {
        let regex = new RegExp(/^[a-zA-Z0-9]+$/i);
        if (!regex.test(value)) return (`разрешен ввод только букв латинского алфавита`);
    }
    return undefined;
};*/
const SearchForm: React.FC<InjectedFormProps<formDataType> & ownPropsType> = ({handleSubmit, error}) => {
    return (
        <form className={classes.loginForm} onSubmit={handleSubmit}>
            <div className="input-field name-input"><Field name={'name'}
                                                           component={Input}
                                                           validate={[requiredField]}/></div>
            {
                error && <div className={classes.formSummaryError}> {error}</div>
            }
            <div className={classes.loginFormButton}>
                <button className="btn waves-effect waves-light">Submit<i className="material-icons right"> </i></button>
            </div>
        </form>
    )
};
const ReduxForm = reduxForm<formDataType, ownPropsType>({
    form: 'search'
})(SearchForm);


export const HomePage: React.FC<PropsType> = ({dataRepoz}) => {

        const searchValue = useSelector((state: AppStateType) => state.app.searchValue);
        const currentPage = useSelector((state: AppStateType) => state.app.currentPage);
        const totalCount = useSelector((state: AppStateType) => state.app.totalCount);
        const perPage = useSelector((state: AppStateType) => state.app.perPage);
        const isRequestSub = useSelector((state: AppStateType) => state.app.isRequestSubmit);
        const mess = useSelector((state: AppStateType) => state.app.message);

        const [data, setData] = useState(dataRepoz);
        const [isByName, setIsByName] = useState(false);
        const [isByRating, setIsByRating] = useState(false);
        const [isByDate, setIsByDate] = useState(false);

        const dispatch = useDispatch();

        const onSubmit = (formData: formDataType) => {
            dispatch(actions.setSearchValue(formData.name));
            dispatch(actions.setCurrentPage(1));
            dispatch(getRepos(formData.name, currentPage, perPage));
        };
        const handleOnClick = (id: number) => {
            dispatch(setClickRepo(id));
        };
        const onPageChange = (page: number) => {
            dispatch(actions.setCurrentPage(page))
        };
        useEffect(() => {
            if (searchValue !== '' || currentPage >= 1)
                dispatch(getRepos(searchValue, currentPage, perPage));
        }, [currentPage, searchValue]);

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
                <div >
                    <p className="card-panel teal lighten-2 white-text ">Search repos in  GitHub</p>
                </div>

                <ReduxForm
                    onSubmit={onSubmit}
                />
                <div className={classes.btn_group}>
                    <p className="black-text " style={{fontSize: "14px"}}>SORT to:</p>
                    <button className="waves-effect waves-light white teal-text btn-small" onClick={() => (setIsByName(true))}>name</button>
                    <button className="waves-effect waves-light white teal-text btn-small" onClick={() => (setIsByDate(true))}>date</button>
                    <button className="waves-effect waves-light white teal-text btn-small" onClick={() => (setIsByRating(true))}>rating</button>
                </div>
                {isRequestSub && <ListItems data={data}
                                            handleOnClick={handleOnClick}
                />}
                {mess && <div>по вашему запросу ничего не найдено: {mess}</div>}
                <Pagination
                    totalCount={totalCount}
                    currentPage={currentPage}
                    perPage={perPage}
                    onPageChange={onPageChange}
                />
            </div>
        )
    }
;
