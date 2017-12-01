import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from '../components/Nav';
import MsgBox from './MsgBox';
import ContentContainer from './ContentContainer';
import store from '../store';
import { loadHoldings } from '../action-creators/holdingsAction';
import reactDataGrid from '../packages/react-data-grid';
import reactDataGridAddons from '../packages/react-data-grid-addons';

const Promise = require('es6-promise-promise');

const socket = io(window.location.origin);
let clientIP = '';

socket.on( 'connect', ()=> {
	socket.emit('joinRoom', window.location.origin);
})

class App extends Component{
	constructor( props ){
		super( props );

		this.state = {
			msgs:[],
		}
		this.onMessageSubmit = this.onMessageSubmit.bind(this);
	}

	componentDidMount(){
		store.dispatch( loadHoldings() );
	}

	componentWillMount(){
		var self = this;
		socket.on('message', ( msgs ) => {
			this.setState( { msgs } );
		})

		socket.on('ip', ( clientAddress ) => {
			clientIP = clientAddress;
		})

		socket.on('messageHistory', ( messages ) => {
			messages.forEach ( ( msgs ) => {
				this.setState( { msgs } )
			})
		})
		socket.on('sendData', ( ) => {

			if( Object.keys( this.props ).length < 2 ){
				this.setState( { quote:[] } )
			}

		})
	}


	onMessageSubmit(msgs){
		let tempArr = [];
		msgs = clientIP + ': ' + msgs;
		if( this.state.msgs.length === 0 ){
			tempArr.push( msgs );
		}else{
			tempArr = this.state.msgs;
			tempArr.push( msgs );
		}
		msgs =  tempArr;
		this.setState( {  msgs });

		socket.emit('message', msgs);
	}


	render(){
        console.log('.....in App.js, state',this.state);
		return(
			<div className="container-fluid">
				<Nav />
				<div style={ { marginTop: '70px' }}>
					<div className="row">
						<div className="col-sm-10">
							<ContentContainer/>
						</div>
						<div className="col-sm-2">
							<MsgBox msgs = { this.state.msgs } onMessageSubmit = { this.onMessageSubmit }  />
						</div>
					</div>
				</div>
			</div>
		)
	}
}


export default App;