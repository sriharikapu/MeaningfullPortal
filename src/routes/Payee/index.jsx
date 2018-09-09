import React, { Component, Fragment } from "react";
import { get } from "dot-prop";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";
import moment from "moment";

import ChargeModal from "./charge";
import { utils } from "web3";

import {
  Button,
  ButtonGroup,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  Row
} from "reactstrap";

import {
  Section,
  StickyPeriodHeader,
  LatePaymentLine,
  PaymentLine
} from "../../components/Styled/index";

import styled from "styled-components";

import { groupBy, MILLION, periodToUnit } from "../../utils";

import collateralizeAllowance from "./dharma";
import * as BigNumber from "bignumber.js";
const AddressHeader = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const months = [
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March"
];

const payments = [
  {
    address: "Rachel Finger",
    id: 1,
    max: 3.15
  },
  {
    address: "Max Dinker",
    id: 2,
    max: 0.5
  }
];

class Payee extends Component {
  state = {
    chargeModalOpen: false
  };

  toggleCharge = () => {
    this.setState(state => ({
      ...state,
      chargeModalOpen: !state.chargeModalOpen
    }));
  };

  constructor(props, context) {
    super();
    this.contracts = context.drizzle.contracts;
    this.startCollateralization = this.startCollateralization.bind(this);
  }

  startCollateralization = async () => {
    let ledger = this.contracts["Ledger"];
    let collateralizer = this.contracts["ERC721Collateralizer"];

    let id = await this.contracts["Ledger"].methods["tokenOfOwnerByIndex"](
      this.props.accounts[0],
      this.state.currentIndex
    ).call();
    let allowance = this.getData(
      "Ledger",
      "getAllowanceInfo",
      0,
      x => x,
      this.state.currentIndex
    );
    collateralizeAllowance(ledger, collateralizer, id, allowance, this.state.currentIndex);
  };

  getData = (contract, method, defaultValue, mapper = i => i, ...args) => {
    let value = get(
      this.props.contracts[contract][method][
        this.contracts[contract].methods[method].cacheCall(...args)
      ],
      "value"
    );
    if (value === undefined) {
      return defaultValue;
    }

    return mapper(value);
  };

  /* charge(index, amount) {
     *     console.log(index, amount);
     *     const charge = this.getData('Ledger', 'charge', index, amount);
     *     console.log(charge);
     * }

     *   getData = (contract, method, index, amount) => {
       console.log(this.contracts[contract]);
       let value = get(
       this.props.contracts[contract][method][
       this.contracts[contract].methods[method].cacheCall(index, amount)
       ],
       "value"
     *     );
     *     return value;
     * };*/

  render() {
    const myAllowancesCount = this.getData("Ledger", "getAllowancesCount", 0);
    let allowances = [];
    for (let i = 0; i < myAllowancesCount; i++) {
      this.getData(
        "Ledger",
        "getAllowanceInfo",
        0,
        allowance => allowances.push({ ...allowance, idx: i }),
        i
      );
    }
    allowances = allowances.map(({ startingDate, amountWei, ...item }) => ({
      ...item,
      date: new Date(startingDate * 1000),
      amountEther: utils.fromWei("" + amountWei)
    }));
    const allowancesByMonth = groupBy(
      allowances.map(i => ({
        ...i,
        month: i.isDebt ? "Debt" : moment(i.date).format("MMMM")
      })),
      "month"
    );

    return (
      <div>
        <Section>
          {/* <h1 className="display-3">Welcome Payee!</h1> */}
          <Container>
            <Row>
              <Col md="6">
                <Card body inverse color="info">
                  <CardTitle>Allowances</CardTitle>
                  <CardText>Total Of: 500 ETH.</CardText>
                  <Button>Button</Button>
                </Card>
              </Col>
              <Col md="6">
                <Card body inverse color="danger">
                  <CardTitle>Debt to me</CardTitle>
                  <CardText>Total Of: 2.15 ETH.</CardText>
                  <Button>Button</Button>
                </Card>
              </Col>
            </Row>
          </Container>
        </Section>

        <Container>
          {Object.keys(allowancesByMonth).map(month => (
            <Fragment>
              <StickyPeriodHeader>
                <span>{month}</span>
                <span>
                  {allowancesByMonth[month]
                    .map(({ amountEther }) => amountEther)
                    .reduce((a, b) => +a + +b, 0)}
                  ETH
                </span>
              </StickyPeriodHeader>
              {allowancesByMonth[month].map(
                ({
                  sideB,
                  amountEther,
                  overdraftPpm,
                  interestRatePpm,
                  periodSeconds,
                  date,
                  idx,
                  isDebt
                }) => (
                  <Row key={sideB + amountEther + date}>
                    <Col md={2}>
                      <span className="display-4">
                        {moment(date).format("Do")}
                      </span>
                    </Col>
                    <Col md={8}>
                      <AddressHeader>{sideB}</AddressHeader>
                      <div className="text-muted">
                        Max. {amountEther}
                        ETH
                      </div>
                      <div className="text-muted">
                        Overdraft {overdraftPpm / MILLION}%
                      </div>
                      <div className="text-muted">
                        {interestRatePpm / MILLION}
                        %/day Late interest fee
                      </div>
                      <div className="text-muted">
                        {moment(date)
                          .add(periodSeconds, "seconds")
                          .fromNow()}
                      </div>
                    </Col>
                    <Col md={2}>
                      <Button
                        color="primary"
                        onClick={e => {
                          this.state.currentIndex = idx;
                          this.toggleCharge();
                        }}
                      >
                        Charge
                      </Button>

                      {isDebt ? (
                        <Button
                          color="warning"
                          onClick={e => {
                            this.state.currentIndex = idx;
                            this.startCollateralization();
                          }}
                        >
                          Collateralize
                        </Button>
                      ) : (
                        ""
                      )}
                    </Col>
                  </Row>
                )
              )}
            </Fragment>
          ))}
        </Container>
        <ChargeModal
          toggle={this.toggleCharge}
          index={this.state.currentIndex}
          open={this.state.chargeModalOpen}
        />
      </div>
    );
  }
}

Payee.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = ({ contracts, accounts }) => {
  return {
    contracts,
    accounts
  };
};

export default drizzleConnect(Payee, mapStateToProps);
