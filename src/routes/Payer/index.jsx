import React, { Component } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  Button,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  Container,
  Row,
  Col,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Progress
} from "reactstrap";

import { Text } from "../../components/Styled/index";
import { periodToUnit } from "../../utils";
const BenefactorGroupItem = styled(ListGroupItem)`
  background-color: ${props => (props.isOverdrafted ? "#d9534f" : "inherit")};
  &:hover {
  }
  margin-bottom: 1rem;
`;

const BenefactorGroupItemText = styled(ListGroupItemText)`
  margin-top: 0rem;
  margin-bottom: 0rem;
`;

const NewBenefactorButton = styled(Button)`
  margin-top: 1rem;
  margin-bottom: 1rem;
`;

const NiceLink = styled(Link)`
  color: inherit;
  &:hover {
    text-decoration: none;
    color: inherit;
  }
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
  // {address: 'b3', amount: 'b3amount'},
  // {address: 'b4', amount: 'b4amount'},
  // {address: 'b5', amount: 'b5amount'},
  // {address: 'b6', amount: 'b6amount'},
  // {address: 'b7', amount: 'b7amount'},
  // {address: 'b8', amount: 'b8amount'},
  // {address: 'b9', amount: 'b9amount'},
];

const addBtnClickHandler = evt => {
  console.log("clicked");
};

const benefectorClickHander = address => {
  console.log("edit clicked ", address);
};

const benefactorApproveOverdraft = address => {
  console.log("overdraftApproveClicked");
};

const AddBenefactor = props => {
  return (
    <Row>
      <Col className="text-center">
        <NewBenefactorButton color="primary">
          <NiceLink to={`/payer/allowance`}>{"Add new Benefactor"}</NiceLink>
        </NewBenefactorButton>
      </Col>
    </Row>
  );
};

const BenefactorList = props => {
  return (
    <ListGroup>
      {props.benefactors.map((benefactor, idx) => {
        return (
          <BenefactorItem
            key={benefactor.address}
            {...benefactor}
            number={idx}
            addFunc={benefectorClickHander}
            benefactorApproveOverdraft={benefactorApproveOverdraft}
          />
          //   <ListGroupItem onClick={benefectorClickHander}>
          //     <Link to={`/payer/benefactors/edit/${benefactor.address}`}>
          //       {benefactor.address}
          //     </Link>
          //     {/* {benefactor.name} */}
          //   </ListGroupItem>
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

export default class Payer extends Component {
  render() {
    return (
      <Container>
        <AddBenefactor />
        <BenefactorList benefactors={benefactors} />
      </Container>
    );
  }
}
