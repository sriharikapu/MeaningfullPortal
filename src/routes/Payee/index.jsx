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

import { Section, StickyPeriodHeader } from "../../components/Styled/index";

import styled from "styled-components";

import { groupBy, MILLION } from "../../utils";
import { Heading } from "../../components/Styled";
import collateralizeAllowance from "./dharma";
import * as BigNumber from "bignumber.js";

const AddressHeader = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

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
    collateralizeAllowance(
      ledger,
      collateralizer,
      id,
      allowance,
      this.state.currentIndex
    );
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
  };
  shouldComponentUpdate(nextProps, nextState) {
    let different =
      JSON.stringify({ props: nextProps, state: nextState }) !==
      JSON.stringify({ props: this.props, state: this.state });
    if (different) {
      debugger;
    }
    return different;
  }

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
    let { debt, ...allowancesByMonth } = groupBy(
      allowances
        .map(i => ({
          ...i,
          month: moment(i.date).format("MMMM"),
          year: moment(i.date).format("YYYY")
        }))
        .map(i => ({
          ...i,
          category: i.isDebt ? "debt" : `${i.year} ${i.month}`
        })),
      "category"
    );
    debt = debt || [];

    return (
      <div>
        <Section>
          <Heading className="display-3">
            Charge your clients, right now
          </Heading>
          <Container>
            <Row className="h-100 justify-content-center align-items-center">
              <Col md="6">
                <Card body inverse color="info">
                  <CardTitle>{myAllowancesCount} Allowances</CardTitle>
                  <CardText className="text-center">
                    <span className="display-4">
                      {allowances
                        .map(({ amountEther }) => amountEther)
                        .reduce((a, b) => +a + +b, 0)}
                      ETH
                    </span>
                  </CardText>
                </Card>
              </Col>
              <Col md="6">
                <Card body inverse color={debt.length ? "danger" : "info"}>
                  <CardTitle>{debt.length} Debt</CardTitle>
                  <CardText className="text-center">
                    <span className="display-4">
                      {debt
                        .map(({ amountEther }) => amountEther)
                        .reduce((a, b) => +a + +b, 0)}
                      ETH
                    </span>
                  </CardText>
                </Card>
              </Col>
            </Row>
          </Container>
        </Section>

        <Container>
          {!!debt.length && (
            <Fragment>
              <StickyPeriodHeader>
                <span>Debt</span>
              </StickyPeriodHeader>
              {debt.map(
                ({
                  sideA,
                  amountEther,
                  overdraftPpm,
                  interestRatePpm,
                  periodSeconds,
                  date,
                  idx
                }) => (
                  <Row
                    key={sideA + amountEther + date}
                    className="h-100 justify-content-center align-items-center"
                  >
                    <Col md={2}>
                      <span className="display-4">
                        {moment(date).format("Do")}
                      </span>
                    </Col>
                    <Col md={8}>
                      <AddressHeader>{sideA}</AddressHeader>
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
                      <Button color="secondary">Transfer</Button>
                      <Button color="secondary">Collateralize</Button>
                      <Button color="secondary">Auction</Button>
                    </Col>
                  </Row>
                )
              )}
            </Fragment>
          )}
          {Object.keys(allowancesByMonth).map(month => (
            <Fragment>
              <StickyPeriodHeader>
                <span>{month}</span>
                <span className="float-right">
                  {allowancesByMonth[month]
                    .map(({ amountEther }) => amountEther)
                    .reduce((a, b) => +a + +b, 0)}
                  ETH
                </span>
              </StickyPeriodHeader>
              {allowancesByMonth[month].map(
                ({
                  sideA,
                  amountEther,
                  overdraftPpm,
                  interestRatePpm,
                  periodSeconds,
                  date,
                  idx,
                  isDebt
                }) => (
                  <Row
                    key={sideA + amountEther + date}
                    className="h-100 justify-content-center align-items-center"
                  >
                    <Col md={2}>
                      <span className="display-4">
                        {moment(date).format("Do")}
                      </span>
                    </Col>
                    <Col md={8}>
                      <AddressHeader>{sideA}</AddressHeader>
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
  const { synced, ...ledger } = contracts.Ledger;
  return {
    contracts: { Ledger: ledger },
    accounts
  };
};

export default drizzleConnect(Payee, mapStateToProps);
