import React from 'react';
import { connect } from 'react-redux';
import Content from './Content';
import { updateHoldings, getRows } from '../action-creators/holdingsAction';




const mapStateToProps = ( state ) => {
	
	return {
		rows: state.rows.rows
	}
}

const mapDispatchToProps = ( dispatch ) => (
		{
			updateHoldings: ( updatedRowsArr, updatedData ) => dispatch(updateHoldings( updatedRowsArr, updatedData )),
			getRows: () => dispatch(getRows())
		}		
)


export default connect(mapStateToProps, mapDispatchToProps)(Content);