import {BaseThuncType, InferActionType} from "./store";
import {getRepositopies} from "../api/api";


type ActionsType = InferActionType<typeof actions>;
type ThuncType = BaseThuncType<ActionsType>

export type listType = {
    id: number
    name: string
    stargazers_count: number
    html_url: string
    created_at: string
    description: string
    owner: {
        avatar_url: string
        login: string
    }
}


let initialState = {
    isRequestSubmit: false,
    massRepos: [] as Array<listType>,
    firstTimeFlaf: false,
    repoId: null as null | number,
    message: null as null | string,
    currentPage: 0,
    perPage: 10,
    totalCount: 0,
    searchValue: "",
};
export type initialStateType = typeof initialState;


const reducer = (state = initialState, action: ActionsType): initialStateType => {
    switch (action.type) {
        case "SET_REPO":
            return {
                ...state,
                massRepos: action.data,
                isRequestSubmit: true,
            };
        case "SET_FIRST_TIME_FLAG":
            return {
                ...state,
                firstTimeFlaf: action.flag,
            };
        case "SET_CLICK_ID":
            return {
                ...state,
                repoId: action.id,
            };
        case "SET_MESSAGE":
            return {
                ...state,
                message: action.mess,
            };
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            };
        case "SET_SEARCH_VALUE":
            return {
                ...state,
                searchValue: action.value
            };
        case "SET_TOTAL_COUNT":
            return {
                ...state,
                totalCount: action.totalCount
            };
        default:
            return state;
    }
};
export const actions = {
    setRepo: (data: any) => ({type: "SET_REPO", data} as const),
    setFirstTimeFlaf: (flag: boolean) => ({type: "SET_FIRST_TIME_FLAG", flag} as const),
    setId: (id: number) => ({type: "SET_CLICK_ID", id} as const),
    setMessage: (mess: string) => ({type: "SET_MESSAGE", mess} as const),
    setCurrentPage: (currentPage: number) => ({type: "SET_CURRENT_PAGE", currentPage} as const),
    setSearchValue: (value: string) => ({type: "SET_SEARCH_VALUE", value} as const),
    setTotalCount: (totalCount: number) => ({type: "SET_TOTAL_COUNT", totalCount} as const),
};

export const getRepos = (searchValue: string, currentPage: number, perPage: number): ThuncType => async (dispatch: any) => {
    let data = await getRepositopies.getData(searchValue, currentPage, perPage);
    if (data.message) {
        dispatch(actions.setMessage(data.message))
    } else {
        dispatch(actions.setTotalCount(data.total_count));
        dispatch(actions.setRepo(data.items))
    }
};
export const setFlagApp = (flag: boolean) => (dispatch: any) => {
    dispatch(actions.setFirstTimeFlaf(flag))
};
export const setClickRepo = (id: number) => (dispatch: any) => {
    dispatch(actions.setId(id))
};


export default reducer;