import React, { Component } from "react";
import styled from "styled-components";
import {
  Button,
  Col,
  Container,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Progress,
  Row
} from "reactstrap";

import { Text } from "../../components/Styled/index";
import { periodToUnit } from "../../utils";
import BenefactorModal from "./BenefactorModal";
import { Section } from "../../components/Styled";
import { get } from "dot-prop";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";

const BenefactorGroupItem = styled(ListGroupItem)`
  background-color: ${props => (props.isOverdrafted ? "#d9534f" : "inherit")};
  &:hover {
  }
  margin-bottom: 1rem;
`;

const BenefactorGroupItemText = styled(ListGroupItemText)`
  margin-top: 0;
  margin-bottom: 0;
`;

const OverdraftRow = styled(Row)`
  margin-top: 1rem;
`;

const ApproveText = styled(Button)`
  padding: 0;
  color: white;
  &:hover {
    color: gray;
    text-decoration: none;
  }
`;

const benefactors = [
  {
    address: "0xd515cFBE2C848bC9Daa5460DaE52425BFf54e4C0",
    amount: 1.5 * 10 ** 18,
    overdraftPpm: 10000,
    interestRatePpm: 12000,
    periodSeconds: 60 * 60 * 24 * 2,
    startingDate: 1536375947,
    isOverdrafted: true,
    totalPeriods: 5,
    currentPeriod: 4,
    withdrawnAmounts: [53, 12, 52, 88]
  },
  {
    address: "0x9CaFd2790b1EDB1c90600d76Ab6479540032e0C9",
    amount: 13 * 10 ** 18,
    overdraftPpm: 10000,
    interestRatePpm: 12000,
    periodSeconds: 60 * 60 * 24,
    startingDate: 1536375947,
    isOverdrafted: false,
    totalPeriods: 6,
    currentPeriod: 2,
    withdrawnAmounts: [53, 12]
  }
];

const benefectorClickHander = address => {
  console.log("edit clicked ", address);
};

const benefactorApproveOverdraft = () => {
  console.log("overdraftApproveClicked");
};

const BenefactorList = ({ benefactors }) => {
  return (
    <ListGroup>
      {benefactors.map((benefactor, idx) => {
        return (
          <BenefactorItem
            key={benefactor.address}
            {...benefactor}
            number={idx}
            addFunc={benefectorClickHander}
            benefactorApproveOverdraft={benefactorApproveOverdraft}
          />
        );
      })}
    </ListGroup>
  );
};

const BenefactorItem = ({
  address,
  number,
  amount,
  periodSeconds,
  isOverdrafted,
  addFunc,
  startingDate,
  totalPeriods,
  currentPeriod,
  benefactorApproveOverdraft
}) => {
  return (
    <BenefactorGroupItem
      //   onClick={() => addFunc(address)}
      isOverdrafted={isOverdrafted}
    >
      <ListGroupItemHeading>
        <Row>
          <Col md={9}>
            #{number} Allowance to {address}
          </Col>
          <Col md={2}>
            <Text>
              {`For ${amount / 10 ** 18}
              ETH`}
            </Text>
          </Col>
        </Row>
      </ListGroupItemHeading>
      <BenefactorGroupItemText>
        <Row>
          <Col md={4}>
            Every {periodToUnit(periodSeconds)} Since{" "}
            {new Date(startingDate * 1000).toDateString()}
          </Col>
        </Row>
        <Row>
          <Col>
            <Progress animated max={totalPeriods} value={currentPeriod}>
              {currentPeriod + "/" + totalPeriods}
            </Progress>
          </Col>
        </Row>
        <OverdraftRow>
          {isOverdrafted ? (
            <React.Fragment>
              <Col md={3}>
                <Text>
                  <b>Overdraft Detected</b>
                </Text>
              </Col>
              <Col md={1}>
                <ApproveText
                  color="link"
                  onClick={() => benefactorApproveOverdraft(address)}
                >
                  {" "}
                  Approve
                </ApproveText>
              </Col>
            </React.Fragment>
          ) : (
            <Col size={4} />
          )}
        </OverdraftRow>
      </BenefactorGroupItemText>
    </BenefactorGroupItem>
  );
};

class Payer extends Component {
  state = {
    benefactorModalOpen: false
  };

  constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

  toggleBenefactorModal = () => {
    this.setState(state => ({
      ...state,
      benefactorModalOpen: !state.benefactorModalOpen
    }));
  };

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

  render() {
    const myAllowancesCount = this.getData("Ledger", "getMyAllowancesCount", 0);
    return (
      <div>
        <Section>
          <Container>
            <Row>
              <Col md={9} sm={6}>
                <h2 className="display-4">Start Do things!</h2>
              </Col>
              <Col md="3" sm={6}>
                <Button
                  onClick={this.toggleBenefactorModal}
                  color="primary"
                  block
                >
                  Add Benefactor
                </Button>
              </Col>
            </Row>
          </Container>
        </Section>
        myAllowancesCount: {myAllowancesCount}
        <Container>
          <Row>
            <Col>
              <BenefactorList benefactors={benefactors} />
            </Col>
          </Row>
          <BenefactorModal
            open={this.state.benefactorModalOpen}
            toggle={this.toggleBenefactorModal}
          />
        </Container>
      </div>
    );
  }
}

Payer.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = ({ contracts }) => {
  return {
    contracts
  };
};

export default drizzleConnect(Payer, mapStateToProps);
