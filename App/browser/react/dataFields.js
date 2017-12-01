const dataFields =

[
	{ key: 'root', name: 'Class', draggable: true, sortable: true, filterable: true, resizable: true }, 
	{ key: 'portfolio', name: 'Portfolio' , draggable: true, sortable: true, filterable: true, resizable: true},
	{ key: 'secid', name: 'Sec Id', draggable: true, sortable: true, filterable: true, resizable: true}, 
	{ key: 'description', name: 'Description', draggable: true, sortable: true, filterable: true, resizable: true}, 
	{ key: 'sod_holding', name:'SOD Holding', draggable: true, sortable: true, filterable: true, resizable: true}, 
	{ key: 'executed', name:'Executed', draggable: true, sortable: true, filterable: true, resizable: true }, 
	{ key:'curr_holding', name:'Cur Holding', draggable: true, sortable: true, filterable: true, resizable: true, editable: true},
	{ key: 'confirmed', name: 'Confirmed' , draggable: true, sortable: true, filterable: true, resizable: true},
	{ key: 'exc_mkt_wgt', name: 'Exc_MktWgt', draggable: true, sortable: true, filterable: true, resizable: true}, 
	{ key: 'curr_mkt_val', name: 'Curr MktVal', draggable: true, sortable: true, filterable: true, resizable: true}, 
	{ key: 'curr_mkt_wgt', name:'Cur MktWgt', draggable: true, sortable: true, filterable: true, resizable: true}, 
	{ key: 'currency', name:'Currency', draggable: true, sortable: true, filterable: true, resizable: true, resizable: true }, 
	{ key:'ml_sector', name:'ML Sector', draggable: true, sortable: true, filterable: true, resizable: true},
	{ key:'ml_industry', name:'ML Industry', draggable: true, sortable: true, filterable: true, resizable: true},
	{ key:'proposed_amount', name:'Proposed Amount', draggable: true, sortable: true, filterable: true, resizable: true}
	
];

module.exports = {
	dataFields
}
