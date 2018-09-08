import React, { Component, Fragment } from "react";
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
import styled from "styled-components";

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
    max: 3.15
  },
  {
    address: "Max Dinker",
    max: 0.5
  }
];

const StickyPeriodHeader = styled.h3`
  position: sticky;
  top: 0;
  background: #fff;
  line-height: 50px;
  border-bottom: 1px solid black;
`;
const PaymentLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;
const LatePaymentLine = styled(PaymentLine)``;

const Section = styled.div`
  padding: 30px 10px;
  background: #ccc;
`;

export default class Payee extends Component {
  render() {
    return (
      <div>
        <Section>
          <h1 className="display-3">Welcome Payee!</h1>
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
          <StickyPeriodHeader>Late Payments</StickyPeriodHeader>
          <LatePaymentLine>
            <div>
              <h4 className="text-danger">Moshik Kaki</h4>
              <div className="text-muted">Over 3 weeks</div>
            </div>
            <h4 className="text-danger">15ETH</h4>
            <div>
              <ButtonGroup>
                <Button color="primary">Charge</Button>
                <Button color="secondary">Transfer</Button>
                <Button color="warning">Auction</Button>
              </ButtonGroup>
            </div>
          </LatePaymentLine>
          {months.map(month => (
            <Fragment key={month}>
              <StickyPeriodHeader>{month}</StickyPeriodHeader>
              {payments.map(({ address, max }) => (
                <PaymentLine>
                  <div>
                    <h4>{address}</h4>
                    <div className="text-muted">
                      Max. {max}
                      ETH
                    </div>
                  </div>
                  <div>
                    <Button color="primary">Charge</Button>
                  </div>
                </PaymentLine>
              ))}
            </Fragment>
          ))}
        </Container>
      </div>
    );
  }
}
