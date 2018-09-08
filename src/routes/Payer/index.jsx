import React, { Component } from "react";
import { Link } from 'react-router-dom'

import {
    Button,
    InputGroup,
    InputGroupAddon,
    InputGroupText,
    Input,
    ListGroup,
    ListGroupItem
} from "reactstrap";


const benefactors = [
    {name: 'b1', id: 'b1id'},
    {name: 'b2', id: 'b2id'},
    {name: 'b3', id: 'b3id'},
    {name: 'b4', id: 'b4id'},
    {name: 'b5', id: 'b5id'},
    {name: 'b6', id: 'b6id'},
    {name: 'b7', id: 'b7id'},
    {name: 'b8', id: 'b8id'},
    {name: 'b9', id: 'b9id'},
];



const addBtnClickHandler = (evt) => {
    console.log('clicked');

};


const benefectorClickHander = (evt) => {
    console.log('edit clicked');

}

const AddBenefactor = (props) => {
    return (
	<Button	children='Add new Benefactor'>
	    <Link to={`/payer/allowance`}>{"Add new Benefactor"}</Link>
	</Button>
    );
};

const BenefactorList = (props) => {
    return (
	<ListGroup>
	    {props.benefactors.map((benefactor) => {
		 return (
		     <ListGroupItem onClick={benefectorClickHander}>
			 <Link to={`/payer/benefactors/edit/${benefactor.id}`}>
			     {benefactor.name}
			 </Link>
			 {/* {benefactor.name} */}
		     </ListGroupItem>
		 );
	    })}
	</ListGroup>
    );
}


export default class Payer extends Component {
    render() {
	return (
		<main className="container">
		    <AddBenefactor></AddBenefactor>
		    <BenefactorList benefactors={benefactors}></BenefactorList>
		</main>
	);
    }
}
