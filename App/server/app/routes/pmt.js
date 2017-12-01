const express = require('express');
const router = new express.Router();

let pmtData = require( '../../../pmt.json');
let id = 0;

const pmtLen = pmtData.length;

pmtData = pmtData.map( obj => Object.assign( {}, obj, { "id":id++ }));
//console.log('.............pmtdata[', pmtData)
module.exports = router;

router.get('/pmt', (req, res, next) => {

//	const rowParam = req.query;
//	console.log('..........route/pmt pmtData',pmtData);
	res.send( createNewObject( pmtData ));
})


router.get('/pmt/filter', (req, res, next) => {

	const { sector } = req.query;
	let filteredArray = [];
	sector.forEach( sect => {
		let tempArray = pmtData.filter( stock => stock.Sector === sect );
		filteredArray = filteredArray.concat( tempArray );
	})

	res.send( createNewObject( filteredArray ));
})

router.get('/pmt/search', (req, res, next) => {

	let searchedArray = [];
	const { searchedStock } =  req.query;

	pmtData.forEach( stock => {
		if( stock.Name.toUpperCase().indexOf( searchedStock.toUpperCase() ) > -1 ){
			searchedArray.push( stock );
		}
	})
//	searchedArray = pmtData.filter( stock => stock.Name === searchedStock );
	res.send( createNewObject( searchedArray ));
})


createNewObject = ( arr ) => {
	let obj = {};
	let pmt = [];
	const dataLength = pmtLen - 1;

	arr.forEach( item => {
		obj.id = item.id;
		obj.root = item.Root;
		obj.portfolio = item.Portfolio;
		obj.secid = item['Sec Id'];
		obj.description = item.Description;
		obj.sod_holding = item['SOD Holding'];
		obj.executed = item.Executed;
		obj.curr_holding= item['Cur Holding'];
		obj.confirmed = item.Confirmed;
		obj.exc_mkt_wgt = item['Exc MktWgt'];
		obj.curr_mkt_val= item['Cur MktVal'];
		obj.curr_mkt_wgt = item['Cur MktWgt'];
		obj.currency = item.Currency;
		obj.ml_sector = item['ML Sector'];
		obj.ml_industry = item['ML Industry'];
		obj.proposed_amount = item['Proposed Amt'];
		obj.len = dataLength;
		pmt.push(obj);

		obj= {};
	})
	
	return pmt;
}
