import { GET_HOLDINGS, LOAD_HOLDINGS } from '../constants';
import { updateProposedAmount, generateRows } from '../utils';
import axios from 'axios';

const createHoldings = ( holdings ) => {
//	console.log('createdHoldings....', holdings)
	return {
		type: LOAD_HOLDINGS,
		holdings
	}
}

const getHoldings = () => {
//	console.log('createdHoldings....', holdings)
	return {
		type: GET_HOLDINGS,
	}
}

const loadHoldings = ( ) => ( dispatch ) => {
//	console.log('loadHoldings....')
		axios.get('/api/data/pmt')
		.then( response => response.data )
		.then( pmt => generateRows( pmt ) )
		.then( rows => {
			dispatch( createHoldings( rows ) )
		})
		.catch( err => console.log( err ))
}

const updateHoldings = ( updatedRowsArr, updatedData ) => ( dispatch ) => {
	dispatch( createHoldings( updatedData ) )
}

const getRows = () => ( dispatch ) => {
	dispatch( getHoldings() )
}

export { loadHoldings, updateHoldings, getRows };