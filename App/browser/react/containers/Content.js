import React from 'react';
import PropTypes from 'prop-types';
import ReactDataGrid from '../packages/react-data-grid';
//const ReactDataGrid = require('../packages/react-data-grid');
import update from 'immutability-helper';
import numeral from 'numeral';
const {dataFields} = require('../dataFields.js');

const {
  Toolbar,
  ToolsPanel: {  GroupedColumnsPanel },
  Data: { Selectors },
  Draggable: { Container: DraggableContainer },
  Formatters: { ImageFormatter }
} = require('../packages/react-data-grid-addons');

//for grouping
class CustomToolbar extends React.Component{
	static propTypes = {
		groupBy: PropTypes.array.isRequired,
		onColumnGroupAdded: PropTypes.func.isRequired,
		onColumnGroupDeleted: PropTypes.func.isRequired,
		onToggleFilter: PropTypes.func
	}

	render(){
		return (				
			<Toolbar>
				<div style={{ position: 'absolute', display: 'inline', left: 0 }}>
					<GroupedColumnsPanel groupBy = {this.props.groupBy} onColumnGroupAdded={this.props.onColumnGroupAdded} onColumnGroupDeleted={this.props.onColumnGroupDeleted} />
				</div>
				<div style={{ position: 'absolute', display: 'inline', right:0 }}>
					<Toolbar enableFilter={true} onToggleFilter={ this.props.onToggleFilter }/>
				</div>
			</Toolbar>
		)
	}
}


export default class Content extends React.Component{

	constructor( props ){
		super();
		this.state = {
			rows: [],
			columns:dataFields,
			filters: {},
			sortColumn: null,
			sortDirection: null,
			groupBy:[],
			expandedRows: {},
			selectedCell: {}
		};

		this.handleGridSort = this.handleGridSort.bind(this);
		this.rowGetter = this.rowGetter.bind(this);
		this.getSize = this.getSize.bind(this);
		this.handleFilterChange = this.handleFilterChange.bind(this);
		this.onColumnGroupAdded = this.onColumnGroupAdded.bind(this);
	}

	componentWillReceiveProps(nextProps){
		if(nextProps.rows != this.state.rows){
			
			const rows = nextProps.rows;
			this.setState({ rows })
		
//			this.state.rows = nextProps.rows;
		}
	}
	
	getSize(){
		return this.getRows().length;
	}

	getRows(){
		return Selectors.getRows(this.state);
	}

	getRowsAt(index){
		let rows = this.getRows();
		return rows[index];
	}

	rowGetter(index){
		const rows = this.getRows();
		return rows[index];
	}
	
//filtering and sorting	
	handleFilterChange(filter){
		let newFilters = Object.assign({}, this.state.filters );
		if( filter.filterTerm ){
			newFilters[filter.column.key] = filter;
		}else{
			delete newFilters[filter.column.key];
		}
		this.setState({ filters: newFilters });
	}

	handleGridSort( sortColumn, sortDirection ){
		this.setState({ sortColumn: sortColumn, sortDirection: sortDirection });
	}
  
 //grouping
  onColumnGroupAdded(colName) {
    let columnGroups = this.state.groupBy.slice(0);
    let activeColumn = this.state.columns.find((c) => c.key === colName)
    let isNotInGroups = columnGroups.find((c) => activeColumn.key === c.name) == null;
//    console.log('in column group added activecolumn', activeColumn, isNotInGroups)
    if (isNotInGroups) {
      columnGroups.push({key: activeColumn.key, name: activeColumn.name});
    }
    this.setState({groupBy: columnGroups});
//    console.log('in column group added activecolumn', activeColumn, isNotInGroups,columnGroups)
  };

  onColumnGroupDeleted = (name) => {
	let columnGroups = this.state.groupBy.filter(function(g){
      return typeof g === 'string' ? g !== name : g.key !== name;
    });

    this.setState({groupBy: columnGroups});
  };

  onRowExpandToggle = ({ columnGroupName, name, shouldExpand }) => {
    let expandedRows = Object.assign({}, this.state.expandedRows);
    expandedRows[columnGroupName] = Object.assign({}, expandedRows[columnGroupName]);
    expandedRows[columnGroupName][name] = {isExpanded: shouldExpand};
    this.setState({expandedRows: expandedRows});
  };

//cell editing  selectedCell.rowIdx selectedCell.idx (from 0)
  getSelectedCell = (args) => {
	  const selectedCell = args;
	  console.log('getSelectedCell args', args)
	  this.setState({ selectedCell });
  }
  
  handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
	const trueId = this.state.selectedCell.id;  
    let rows = this.props.rows.slice();
    let updatedRowsArr = [];
    console.log('................updated', updated)
    switch( Object.keys(updated)[0] ){
    	case 'curr_holding':
    		console.log('updated, updated-0', updated, updated[0])
    		updated.curr_holding = numeral(updated.curr_holding).format('0,0');
    		updated.sod_holdings = this.props.rows[trueId]['sod_holding'];
    		console.log('updated.........', updated)
    		const proposedAmount =  numeral(updated.curr_holding).value() - numeral(updated.sod_holdings).value();
    		updated.proposed_amount = numeral(proposedAmount).format('0,0');
    		
    		break;
    }
// updating only one row - selecting not actual row number but the id of the record
    for (let i = fromRow; i <= toRow; i++) {
//      let rowToUpdate = rows[i];
      let rowToUpdate = rows[trueId];
      let updatedRow = update(rowToUpdate, {$merge: updated});
      console.log('..........updatedRow', updatedRow)
      rows[trueId] = updatedRow;
      updatedRowsArr.push(trueId);
    }
    this.props.updateHoldings(updatedRowsArr, rows)
  };
  
  
	render(){
		console.log('......in Content state, props', this.state, this.props);
		return(
		<DraggableContainer>
	  		<ReactDataGrid
	  		enableCellSelect
	  		enableDragAndDrop={true}
	  		columns={this.state.columns}
	  		rowGetter={this.rowGetter}
			rowsCount={this.getSize()}
	  		onRowExpandToggle={this.onRowExpandToggle}
	  		toolbar ={ <CustomToolbar groupBy={this.state.groupBy} onColumnGroupAdded={this.onColumnGroupAdded} onColumnGroupDeleted={this.onColumnGroupDeleted}/> }
	  		onGridSort = { this.handleGridSort }
			onAddFilter = { this.handleFilterChange }
			onClearFilters = { () => this.setState({ filters: {} })}
			canFilter={true}
			onCellSelected={ this.getSelectedCell }
	  		onGridRowsUpdated={this.handleGridRowsUpdated}
	//	  		rowHeight={50}
			minHeight={650} />
		</DraggableContainer>
		)
	}

}