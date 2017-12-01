import { GET_HOLDINGS, LOAD_HOLDINGS } from '../constants';

const initState = { }

const holdingsReducer = (state = initState, action) => {

	switch( action.type ){
		case GET_HOLDINGS:
			return Object.assign({}, state)
			
		case LOAD_HOLDINGS:
//			console.log('..............holdings Reducer, action.holdings', action.holdings)
			return Object.assign({}, state, { rows: action.holdings })
	}
	return state;
}

export default holdingsReducer;