import React, {Component} from 'react';
import {Route, Switch,withRouter} from "react-router-dom";
import './App.css';
import {SplashScreen} from "./components/splashScreen/splashScreen";
import {AppStateType} from "./redux/store";
import {HomePage} from "./pages/home/HomePage";
import {connect} from "react-redux";
import {setFlagFirstTimeLoadApp} from "./redux/reducer"
import {DetailPage} from "./pages/detail/DetailPage";
import {compose} from "redux";
import {getIdSelectRepo, getIsFistTimeLoadApp, getRepositoris} from "./redux/selectors";



type mapStatePropsType= ReturnType<typeof mapStateToProps>
type mapDispatchPropsType={
    setFlagFirstTimeLoadApp:(flag:boolean)=>void
}



class App extends Component<mapDispatchPropsType& mapStatePropsType> {

    componentDidMount(){
        setTimeout(() => this.props.setFlagFirstTimeLoadApp(true), 3000);
    }

    render() {

        return (
            <div className="App">
                <Switch>
                    {!this.props.isFirstTimeLoadApp
                        ? <SplashScreen/>
                        : <Route exact path='/' render={() => <HomePage dataRepoz={this.props.massRepos}/>}/>
                    }
                    {// @ts-ignore
                        this.props.idSelectedRepo !== null && <Route path='/details' render={() => <DetailPage data={this.props.massRepos[this.props.idSelectedRepo]}/>}/>}
                    <Route path='*' render={() => <div> 404 not found </div>}/>
                </Switch>
            </div>
        );

    }
}

const mapStateToProps=(state:AppStateType) => ({
    massRepos: getRepositoris(state),
    idSelectedRepo:  getIdSelectRepo(state),
    isFirstTimeLoadApp: getIsFistTimeLoadApp(state)
});


export default compose (
    withRouter,
    connect (mapStateToProps, {setFlagFirstTimeLoadApp})
)(App)as React.ComponentType;
