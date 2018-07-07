import React, {Component} from 'react';
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { createBrowserHistory } from 'history';
import {Link, Router, Switch, Route, Redirect, withRouter} from "react-router-dom";
import { routerReducer } from 'react-router-redux';
import {connect, Provider} from "react-redux";

function reducerClick (state=null, action) {
            return state;
}
const reducers = combineReducers({
    reducerClick,
    routing: routerReducer
});
const store = createStore(reducers);

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
