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
    reducerClick: reducerClick,
    routing: routerReducer
});
const store = createStore(reducers);

store.subscribe(()=>{console.log(store.getState())});

const history = createBrowserHistory();

class NavBarLinks extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (<div>
            <Link to="/page1">{"Page 1"}</Link>
            <Link to="/page2">{"Page 2"}</Link>
        </div>)
    }
}

class Page2 extends Component {
    constructor (props) {
        super(props);
    }
    componentDidMount () {
        if (this.props.match.path==="page2") {
            debugger;
        }
    }
    render () {
        return (<div>
            <p>Page 2</p>
        </div>)
    }
}

class Page1 extends Component {
    constructor (props) {
        super(props);
    }
    render () {
        return (<p>Page 1</p>)
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
