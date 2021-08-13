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
        default:
            return state;
    }
};
const actions = {
    setRepo: (data: any) => ({type: "SET_REPO", data} as const),
    setFirstTimeFlaf: (flag: boolean) => ({type: "SET_FIRST_TIME_FLAG", flag} as const),
    setId: (id: number) => ({type: "SET_CLICK_ID", id} as const),
    setMessage: (mess: string) => ({type: "SET_MESSAGE", mess} as const),

};

export const getRepo = (name: string): ThuncType => async (dispatch: any) => {
    let data = await getRepositopies.getData(name);

    if (data.message) {
        dispatch(actions.setMessage(data.message))
    } else {
        dispatch(actions.setRepo(data))
    }
};
export const setFlagApp = (flag: boolean) => (dispatch: any) => {
    dispatch(actions.setFirstTimeFlaf(flag))
};
export const setClickRepo = (id: number) => (dispatch: any) => {
    dispatch(actions.setId(id))
};


export default reducer;