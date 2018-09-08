import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Form, FormGroup, Label, Modal, ModalBody, ModalFooter, ModalHeader} from "reactstrap";
import {utils} from "web3";

export default class DepositModal extends Component {
  depositAmount = React.createRef();

  constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

  deposit = () => {
    const deposit = this.contracts.Ledger.methods.deposit().send({
      value: utils.toWei(this.depositAmount.current.value)
    });
    deposit.then(this.props.toggle).catch(this.props.toggle);
    console.log("DEPOSIT", deposit);
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
              <Label for="etherDepositAmount">Amount of Ether to deposit</Label>
              <input
                className="form-control"
                ref={this.depositAmount}
                type="number"
                name="amount"
                id="etherDepositAmount"
                placeholder="You can use dot notation for depositing fraction of an ether."
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.deposit}>
              Deposit
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

DepositModal.contextTypes = {
  drizzle: PropTypes.object
};

DepositModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
