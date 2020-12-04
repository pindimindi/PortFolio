import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import { Register, Home, Login, Sidebar, Alert, Navbar, CategoryForm } from './components';


const Routes = (props) => {
    let displaySidebar = props.location.pathname !== '/register' && props.location.pathname !== '/login';
    return (
        <div className='main-grid'>
            {displaySidebar && <div className='column column-small sticky'>
                <Sidebar />
            </div>}
            <div className={`column ${displaySidebar ? 'column-med ' : 'column-lg'}`}>
                <Navbar />
                <Alert />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/createCategory' component={CategoryForm} />
                </Switch>
            </div>
        </div>
    )
}

export default withRouter(Routes);