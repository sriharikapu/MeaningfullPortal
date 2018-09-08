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

export default class WithdrawModal extends Component {
  withdrawAmount = React.createRef();

  constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

  withdraw = () => {
    const withdraw = this.contracts.Ledger.methods
      .withdraw(utils.toWei(this.withdrawAmount.current.value))
      .send();
    withdraw.then(this.props.toggle).catch(this.props.toggle);
    console.log("DEPOSIT", withdraw);
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
                placeholder="Keep empty to withdraw everything."
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.withdraw}>
              Withdraw
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

WithdrawModal.contextTypes = {
  drizzle: PropTypes.object
};

WithdrawModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
