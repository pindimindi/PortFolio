import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';
import styled from 'styled-components';
import {
    Register, Home, Login, Sidebar,
    Alert, Navbar, CategoryForm,
    PortfolioForm, Portfolio,
    PortfoliosList, PostUploader
} from 'components';
import Column from 'components/styled/Column';


//EXPORT GRID TO ITS OWN COMPONENT IF NEEDED!
const Grid = styled.div`
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Routes = (props) => {

    let displaySidebar = props.location.pathname !== '/register' && props.location.pathname !== '/login';
    return (
        <Grid>
            <Column sticky>
                <Navbar />
            </Column>
            <Column>
                <Alert />
                <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                    <Route exact path='/createCategory' component={CategoryForm} />
                    <Route exact path='/createPortfolio' component={PortfolioForm} />
                    <Route exact path='/portfolio/me' component={p => (<Portfolio {...props}/>)} />
                    <Route exact path='/portfolios/category/:categoryId' component={PortfoliosList} />
                    <Route exact path='/uploadMedia/:portfolioId' component={PostUploader} />
                    <Route exact path='/portfolio/:portfolioId' component={Portfolio} />
                </Switch>
            </Column>
        </Grid>
        // <Grid>
        //     {displaySidebar && <Column small>
        //         <Sidebar />
        //     </Column>}
        //     <Column medium={displaySidebar}>
        //         <Navbar />
        //         <Alert />
        //         <Switch>
        //             <Route exact path='/' component={Home} />
        //             <Route exact path='/register' component={Register} />
        //             <Route exact path='/login' component={Login} />
        //             <Route exact path='/createCategory' component={CategoryForm} />
        //             <Route exact path='/createPortfolio' component={PortfolioForm} />
        //             <Route exact path='/portfolio' component={Portfolio} />
        //             <Route exact path='/portfolios/:categoryId' component={PortfoliosList}/>
        //             <Route exact path='/UploadMedia' component={Uploader} />
        //         </Switch>
        //     </Column>
        // </Grid>
    )
}

export default withRouter(Routes);