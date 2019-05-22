import React from 'react';
import Main from './Main';
import { BrowserRouter, Switch,  Route, Redirect } from 'react-router-dom';

const App = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/'>
                    <Redirect to="/1" />
                </Route>
                <Route path="/:page" component={Main} />
            </Switch>
        </BrowserRouter>
    )
}

export default App;