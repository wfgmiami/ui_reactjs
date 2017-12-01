import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { createLogger } from 'redux-logger';
import rootReducer from './reducers/rootReducer';

export default createStore(
		rootReducer,
		applyMiddleware( 
				thunkMiddleware, 
				createLogger( { collapsed: true } )
		),
		
)