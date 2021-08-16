import {createSelector} from "reselect";
import {AppStateType} from "./store";

export  const getRepos = (state:AppStateType) => {
    return state.app.massRepos;
};
export  const getId = (state:AppStateType) => {
    return state.app.idSelectedRepo;
};
export  const getIsFistTimeLoad = (state:AppStateType) => {
    return state.app.isFirstTimeLoadApp;
};


export const getRepositoris = createSelector(getRepos,(massRepos) =>{
    return massRepos;
});
export const getIdSelectRepo = createSelector(getId,(idSelectedRepo) =>{
    return idSelectedRepo;
});
export const getIsFistTimeLoadApp = createSelector(getIsFistTimeLoad,(isFirstTimeLoadApp) =>{
    return isFirstTimeLoadApp;
});
