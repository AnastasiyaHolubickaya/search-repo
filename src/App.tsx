import React, {useEffect} from 'react';
import {Route, Switch} from "react-router-dom";
import './App.css';
import {SplashScreen} from "./components/splashScreen/splashScreen";
import {AppStateType} from "./redux/store";
import {HomePage} from "./pages/home/HomePage";
import {useDispatch, useSelector} from "react-redux";
import {setFlagApp} from "./redux/reducer"
import {DetailPage} from "./pages/detail/DetailPage";


const App: React.FC = () => {
    const dataRepoz = useSelector((state: AppStateType) => state.app.massRepos);
    const repoId = useSelector((state: AppStateType) => state.app.repoId);
    let firstTimeFlaf = useSelector((state: AppStateType) => state.app.firstTimeFlaf);
    const dispatch = useDispatch();

    useEffect(() => {
        setTimeout(() => dispatch(setFlagApp(true)), 3000);
    }, []);

    return (
        <div className="App">
            <Switch>
                {!firstTimeFlaf
                    ? <SplashScreen/>
                    : <Route exact path='/' render={() => <HomePage dataRepoz={dataRepoz}/>}/>
                }
                {repoId !== null && <Route path='/details' render={() => <DetailPage data={dataRepoz[repoId]}/>}/>}
                <Route path='*' render={() => <div> 404 not found </div>}/>
            </Switch>
        </div>
    );

};

export default App;
