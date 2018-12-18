import React, {Component} from 'react';
import ReactDOM from "react-dom";
import {createStore, combineReducers, applyMiddleware} from "redux";
import "regenerator-runtime/runtime";
import { createBrowserHistory } from 'history';
import {Link, Router, Switch, Route, Redirect, withRouter} from "react-router-dom";
import { routerReducer } from 'react-router-redux';
import {connect, Provider} from "react-redux";
import createSagaMiddleware from 'redux-saga'
import { takeEvery, takeLatest, all, put, fork } from 'redux-saga/effects';
import reducerClick from "./reducers";

function* sagasMekXumb () {
    yield [
        takeLatest("FETCHING", SagaOne),
        takeLatest("FETCHING_TWO", SagaTwo)
        ]
}

function* SagaOne () {
    try {
        console.log('From Saga One!');
        yield put({type: "FETCHING_END"})
    } catch (ex) {
        console.log('error');
    }
}

function* SagaTwo () {
    try {
        console.log('From Saga Two!');
        yield put({type: "ACTION_TWO", payload: "Coming from saga two"})
    } catch(ex) {
        console.log('error');
    }
}

function* rootSaga () {
    yield[
        fork(sagasMekXumb),
    ]
}
const sagaMiddleware = createSagaMiddleware();

const reducers = combineReducers({
    reducerClick,
    routing: routerReducer
});

const store = createStore(
    reducers, applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

store.subscribe(
        () => console.log(store.getState())
);

const history = createBrowserHistory();

class NavBarLinks extends Component {
    constructor (props) {
        super(props);
        this.state = {nameOne: "Page 1", nameTwo: "Page 2"}
    }
    render () {
        let {nameOne, nameTwo} = this.state;
        return (<div>
            <Link to="/page1">{nameOne}</Link>
            <Link to="/page2">{nameTwo}</Link>
            <button onClick={() => this.props.dispatch({type: "FETCHING"})}>Click for run sagaOne</button>
            <button onClick={() => this.props.dispatch({type: "FETCHING_TWO"})}>Click for run sagaTwo</button>
        </div>)
    }
}

class Page2 extends Component {
    constructor (props) {
        super(props);
        this.state = {pageName: "Page Two"};
        // to see that store was created successfully!
        store.dispatch({type: ""})
    }
    render () {
        return (<div>
            <p>{this.state.pageName}</p>
        </div>)
    }
}

class Page1 extends Component {
    constructor (props) {
        super(props);
        this.state = {pageName: "Page One"}
    }
    render () {
        return (<p>{this.state.pageName}</p>)
    }
}
const Nav = withRouter(connect()(NavBarLinks));

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Route path="/" component={Nav} />
                <Switch>
                    <Redirect exact to="/page1" from="/" />
                    <Route exact path="/page1" component={Page1} />
                    <Route path="/page2/:params?" component={Page2} />
                </Switch>
            </div>
        </Router>

    </Provider>, document.getElementById("App"));
