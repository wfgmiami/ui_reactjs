import React, { Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

import App from './containers/App';

const root = document.getElementById('app');

const route = (
	<Provider store={ store }>	
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={ App } />
				<Route exact path="/api/quote/:symbol" render={ (router) => (
					<App router={ router }/>
				)} />
			</Switch>  
	    </BrowserRouter>
     </Provider>
   						
)

render(route, root);