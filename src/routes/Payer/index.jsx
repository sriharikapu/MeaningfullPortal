import React, { Component, Fragment } from "react";
import styled from "styled-components";
import {
  Button,
  Card,
  CardText,
  CardTitle,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Progress,
  Row
} from "reactstrap";
import { utils } from "web3";
import { Text } from "../../components/Styled/index";
import { groupBy, MILLION, periodToUnit } from "../../utils";
import BenefactorModal from "./BenefactorModal";
import {
  PaymentLine,
  Section,
  StickyPeriodHeader
} from "../../components/Styled";
import { get } from "dot-prop";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";
import moment from "moment";

const AddressHeader = styled.h4`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

class Payer extends Component {
  state = {
    benefactorModalOpen: false
  };

  constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

  shouldComponentUpdate(nextProps, nextState) {
    let different =
      JSON.stringify({ props: nextProps, state: nextState }) !==
      JSON.stringify({ props: this.props, state: this.state });
    if (different) {
      debugger;
    }
    return different;
  }

  toggleBenefactorModal = () => {
    this.setState(state => ({
      ...state,
      benefactorModalOpen: !state.benefactorModalOpen
    }));
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

  render() {
    const myAllowancesCount = this.getData("Ledger", "getMyAllowancesCount", 0);
    let allowances = [];
    for (let i = 0; i < myAllowancesCount; i++) {
      this.getData(
        "Ledger",
        "getMyAllowanceInfo",
        0,
        i => allowances.push(i),
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
          <Container>
            <Row>
              <Col sm={9}>
                <h1 className="display-3">Welcome Payer!</h1>
              </Col>
              <Col sm={3}>
                <Button
                  onClick={this.toggleBenefactorModal}
                  color="primary"
                  block
                >
                  Add Benefactor
                </Button>
              </Col>
            </Row>
            <Row>
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
                  sideB,
                  amountEther,
                  overdraftPpm,
                  interestRatePpm,
                  periodSeconds,
                  date
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
                      <Button color="secondary">Cancel</Button>
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
                  sideB,
                  amountEther,
                  overdraftPpm,
                  interestRatePpm,
                  periodSeconds,
                  date
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
                      <Button color="secondary">Cancel</Button>
                    </Col>
                  </Row>
                )
              )}
            </Fragment>
          ))}
        </Container>
        <BenefactorModal
          open={this.state.benefactorModalOpen}
          toggle={this.toggleBenefactorModal}
        />
      </div>
    );
  }
}

Payer.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = ({ contracts }) => {
  const { synced, ...ledger } = contracts.Ledger;
  return {
    contracts: { Ledger: ledger }
  };
};

export default drizzleConnect(Payer, mapStateToProps);
