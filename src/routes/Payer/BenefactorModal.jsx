import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader
} from "reactstrap";
import AllowanceForm from "./Allowance";
import { utils } from "web3";
import { MILLION, unitToPeriod } from "../../utils";

export default class BenefactorModal extends Component {
  state = {
    address: "0x0000000000000000000000000000000000000000",
    allowance: 0.0,
    overdraft: 0.0,
    interest: 0.0,
    startDate: new Date().toISOString().split("T")[0],
    period: 1,
    periodUnit: "day",
    periodAmount: 2
  };

  constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

  handleInputChange = ({ target }) => {
    this.setState(state => ({ ...state, [target.name]: target.value }));
  };

  addBenefactor = e => {
    e.preventDefault();
    const {
      address,
      allowance,
      overdraft,
      interest,
      startDate,
      period,
      periodUnit,
      periodAmount
    } = this.state;
    const withdraw = this.contracts.Ledger.methods
      .allowAndDeposit(
        address,
        utils.toWei(allowance),
        overdraft * MILLION,
        interest * MILLION,
        periodAmount,
        period * unitToPeriod[periodUnit],
        new Date(startDate).getTime() / 1000
      )
      .send();
    withdraw.then(this.props.toggle).catch(this.props.toggle);
  };

  render() {
    const { open, toggle } = this.props;

    return (
      <Modal isOpen={open} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add a new benefactor</ModalHeader>
        <Form onSubmit={this.addBenefactor}>
          <ModalBody>
            <AllowanceForm
              {...this.state}
              onInputChange={this.handleInputChange}
            />
          </ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Allow
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

BenefactorModal.contextTypes = {
  drizzle: PropTypes.object
};

BenefactorModal.propTypes = {
  toggle: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired
};
