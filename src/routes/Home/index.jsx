import React, { Component } from "react";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";
import { get } from "../../utils/dot-prop";
import { Button, Col, Container, Row } from "reactstrap";
import { utils } from "web3";
import DepositModal from "./DepositModal";
import WithdrawModal from "./WithdrawModal";
import { Heading, Section } from "../../components/Styled";
import directions from "./directions.svg";

class Home extends Component {
  state = {
    depositModalOpen: false,
    withdrawModalOpen: false
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

  getData = (contract, method, defaultValue, mapping = a => a) => {
    let value = get(
      this.props.contracts[contract][method][
        this.contracts[contract].methods[method].cacheCall()
      ],
      "value"
    );

    if (value === undefined) {
      return defaultValue;
    }

    return mapping(value);
  };

  toggleWithdraw = () => {
    this.setState(state => ({
      ...state,
      withdrawModalOpen: !state.withdrawModalOpen
    }));
  };

  toggleDeposit = () => {
    this.setState(state => ({
      ...state,
      depositModalOpen: !state.depositModalOpen
    }));
  };

  withdraw = () => {};

  render() {
    const balance = this.getData(
      "Ledger",
      "getDepositBalance",
      "Unknown",
      value => utils.fromWei(value)
    );
    return (
      <div>
        <Section>
          <Heading className="display-3">Balance:</Heading>
          <Container>
            <Row className="h-100 justify-content-center align-items-center">
              <Col md="9" sm="6">
                <h1 className="display-3">
                  {balance}
                  ETH
                </h1>
              </Col>
              <Col md="3" sm="6">
                <Button
                  onClick={this.toggleDeposit}
                  block
                  size="lg"
                  color="primary"
                >
                  Deposit
                </Button>
                <Button
                  onClick={this.toggleWithdraw}
                  block
                  size="lg"
                  color="secondary"
                >
                  Withdraw
                </Button>
              </Col>
            </Row>
          </Container>
        </Section>
        {/* Block */}
        <Container fluid>
          <Row style={{ marginTop: "30px" }}>
            <Col>
              <h1 className="display-1">Direct Debit</h1>
            </Col>
          </Row>
        </Container>
        <Container>
          <Row
            style={{ marginBottom: "30px" }}
            className="h-100 justify-content-center align-items-center"
          >
            <Col>
              <blockquote className="blockquote">
                <p className="mb-0">
                  a financial transaction in which one person withdraws funds
                  from <strong>another person's bank account</strong>
                </p>
                <footer className="blockquote-footer">
                  <cite title="Wikipedia">Wikipedia</cite>
                </footer>
              </blockquote>
            </Col>
          </Row>
        </Container>
        {/* Block */}
        <div
          style={{
            backgroundColor: "#66484a",
            color: "#fff",
            padding: "30px 0"
          }}
        >
          <Container fluid>
            <Row style={{ marginTop: "30px" }}>
              <Col>
                <h1 className="display-4">Benefits of direct debit</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row
              style={{ marginBottom: "30px" }}
              className="h-100 justify-content-center align-items-center"
            >
              <Col md={3}>
                <img
                  src={directions}
                  alt={"directions"}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col md={{ size: 8, offset: 1 }}>
                <dl>
                  <dt>It spreads the costs</dt>
                  <dd>
                    Paying your regular bills or business costs by Direct Debit
                    allows you to spread costs over a period that you agree with
                    the organisation you are paying.
                  </dd>
                  <dt>It's guaranteed</dt>
                  <dd>
                    Direct Debit payments come with a guarantee so you're
                    automatically protected by three important safeguards:
                    <ul>
                      <li>
                        An immediate money back guarantee from your bank in the
                        event of an error in the payment of your Direct Debit
                      </li>
                      <li>Advance notice if the date or amount changes</li>
                      <li>The right to cancel at any time.</li>
                    </ul>
                  </dd>
                  <dt>It can save you money</dt>
                  <dd>
                    Businesses find Direct Debit just as convenient and
                    efficient as consumers. For this reason, many offer
                    discounts in return for you paying by Direct Debit .
                    Discounts vary, but overall Direct Debit savings can add up
                    to a substantial amount each year. It pays to check when you
                    get a bill to see how much you can save.
                  </dd>
                  <dt>It gives you peace of mind</dt>
                  <dd>
                    Direct Debit is one of the safest and most reassuring ways
                    of paying your bills:
                    <ul>
                      <li>
                        Payments are made automatically, so bills are never
                        forgotten, lost in the post or delayed by postal
                        problems and there's no risk of late payment charges
                      </li>
                      <li>
                        Organisations using the Direct Debit scheme have to pass
                        a careful vetting process, and are closely monitored by
                        the banking industry
                      </li>
                      <li>
                        The Direct Debit Guarantee protects you and your money.
                        It's offered by all banks and building societies that
                        take part in the scheme.
                      </li>
                    </ul>
                  </dd>
                </dl>
                <dt>It saves you time</dt>
                <dd>
                  Modern life is hectic – but Direct Debit helps. It takes away
                  much of the hassle associated with paying bills, and puts an
                  end to queuing at the bank and filling out cheques. You’ll
                  find it easier to stay on top of your bills, and you’ll know
                  exactly how much money is going out each month. For businesses
                  paying by Direct Debit also means reduced workload and
                  paperwork for your finance department.
                </dd>
              </Col>
            </Row>
          </Container>
        </div>
        {/* Block */}
          <Container fluid>
            <Row style={{ marginTop: "30px" }}>
              <Col>
                <h1 className="display-1">Start now</h1>
              </Col>
            </Row>
          </Container>
          <Container>
            <Row
              style={{ marginBottom: "30px" }}
              className="h-100 justify-content-center align-items-center"
            >
              <Col md={3}>
                <Button color="primary" size="lg">Get paid</Button>
              </Col>
              <Col md={3}>
                <Button color="primary" size="lg">Issue allowances</Button>
              </Col>
            </Row>
          </Container>
        <DepositModal
          toggle={this.toggleDeposit}
          open={this.state.depositModalOpen}
        />
        <WithdrawModal
          toggle={this.toggleWithdraw}
          open={this.state.withdrawModalOpen}
        />
      </div>
    );
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = ({ contracts }) => {
  const { synced, ...ledger } = contracts.Ledger;
  return {
    contracts: { Ledger: ledger }
  };
};

export default drizzleConnect(Home, mapStateToProps);
