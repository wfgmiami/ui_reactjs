import React, {Component} from 'react';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import DraggableHeaderCell from './DraggableHeaderCell';
import RowDragLayer from './RowDragLayer';
import { utils } from '../../../react-data-grid';
const { isColumnsImmutable } = utils;
import PropTypes from 'prop-types';

class DraggableContainer extends Component {
	constructor(){
		super();
		this.state = {
			rows:[]
		}
	}
	
//  componentDidMount(){
//	 console.log('willMount dragdrop this.props.rows', this.props.rows)
//	 const rows = this.props.rows;
//	 this.setState({ rows });
//  }	
//  
  componentWillReceiveProps(nextProps){
	   let grid = this.renderGrid();
	   let rowGetter = this.props.getDragPreviewRow || grid.props.rowGetter;
	   let rowsCount = grid.props.rowsCount;
	   let rows = this.getRows(rowsCount, rowGetter);
	   
	   this.setState({ rows: nextProps.rows }, function(){
		   console.log('......FIRST diff Rows, nextProps.rows', rows, this.state.rows);
		  if(this.state.rows !== rows && rows.length > 0){
			  console.log('......nextProps diff Rows, nextProps.rows', rows, this.state.rows);
			  this.setState({ rows })
			  this.props.updateRowsOnGroup(rows);
		  }
	   })
  }
  
  getRows(rowsCount, rowGetter) {
    let rows = [];
    for (let j = 0; j < rowsCount; j++) {
      rows.push(rowGetter(j));
    }
    return rows;
  }

  renderGrid() {
    return React.Children.map(this.props.children, (child) => {
      return React.cloneElement(child, { draggableHeaderCell: DraggableHeaderCell });
    })[0];
  }

  render() {
    let grid = this.renderGrid();
    let rowGetter = this.props.getDragPreviewRow || grid.props.rowGetter;
    let rowsCount = grid.props.rowsCount;
    let columns = grid.props.columns;
    let rows = this.getRows(rowsCount, rowGetter);
   
    
    return (<div>
      {grid}
      <RowDragLayer rowSelection={grid.props.rowSelection} rows={rows} columns={isColumnsImmutable(columns) ? columns.toArray() : columns} />
    </div>);
  }
}

DraggableContainer.propTypes = {
  children: PropTypes.element.isRequired,
  getDragPreviewRow: PropTypes.func
};

export default DragDropContext(HTML5Backend)(DraggableContainer);
