const updateProposedAmount = ( updatedRowsArr, updatedData ) => {
	console.log('updatePropsedAmount, row,data......', updatedRowsArr, updatedData)
	
}

const generateRows = ( pmt ) => {	

	let rows = [];
	
	for( let i = 0; i < pmt.length; i++){
	
		rows.push({ 
			root: pmt[i].root, 
			group: pmt[i].root,
			portfolio: pmt[i].portfolio, 
			secid: pmt[i].secid, 
			description: pmt[i].description, 
			sod_holding: pmt[i].sod_holding, 
			executed: pmt[i].executed, 
			curr_holding: pmt[i].curr_holding,
			confirmed: pmt[i].confirmed, 
			exc_mkt_wgt: pmt[i].exc_mkt_wgt, 
			curr_mkt_val: pmt[i].curr_mkt_val, 
			curr_mkt_wgt: pmt[i].curr_mkt_wgt, 
			currency: pmt[i].currency, 
			ml_sector: pmt[i].ml_sector,
			ml_industry: pmt[i].ml_industry, 
			proposed_amount: pmt[i].proposed_amount
			
		});
	}
	
	return rows;
}	


export { 
	updateProposedAmount,
	generateRows
}