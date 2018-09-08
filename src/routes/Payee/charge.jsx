import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  FormGroup,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import { utils } from "web3";

export default class ChargeModal extends Component {
  withdrawAmount = React.createRef();

  constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

    withdraw = () => {
	console.log('Charging::: ', this.props.index, utils.toWei(this.withdrawAmount.current.value));
	
	const withdraw = this.contracts
			     .Ledger.methods
			     .charge(this.props.index, utils.toWei(this.withdrawAmount.current.value))
			     .send();
    withdraw.then(this.props.toggle).catch(this.props.toggle);
    console.log("Charge", withdraw);
  };

  render() {
    const { open, toggle } = this.props;

    return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>
          Depositing to your expense account
        </ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
              <Label for="etherWithdrawAmount">
                Amount of Ether to withdraw
              </Label>
              <input
                className="form-control"
                ref={this.withdrawAmount}
                type="number"
                name="amount"
                id="etherWithdrawAmount"
                placeholder="Keep empty to charge everything."
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
              <Button color="primary" onClick={this.withdraw}>
		Charge
            </Button>{" "}
            <Button color="warning" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>{" "}
        </Form>
      </Modal>
    );
  }
}

ChargeModal.contextTypes = {
  drizzle: PropTypes.object
};

ChargeModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
