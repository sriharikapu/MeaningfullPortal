import React, { Component } from "react";
import { Link } from "react-router-dom";

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
  Form,
  FormGroup,
  Label,
  InputGroupButtonDropdown,
  DropdownItem,
  DropdownMenu,
  CustomInput,
  DropdownToggle
} from "reactstrap";
import { Text } from "../../../components/Styled/index";
import { UNIT_TO_PERIOD } from "../../../utils";
import styled from "styled-components";

const TitleRow = styled(Row)`
  margin-top: 1rem;
  text-align: center;
`;

const UnitSelection = styled(CustomInput)`
  text-transform: capitalize;
`;

const MarginRow = styled(Row)`
  margin-top: 1rem;
`;

const CapitalizedInputText = styled(InputGroupText)`
  text-transform: capitalize;
`;
export default class AllowanceForm extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    address: "0x0000000000000000000000000000000000000000",
    allowance: 0.0,
    overdraft: 0.0,
    interest: 0.0,
    from: new Date().toISOString().split("T")[0],
    period: 1,
    periodUnit: "hours",
    periodAmount: 2
  };

  onInputChange(input, val) {
    this.setState({ [input]: val });
  }
  createAllowance() {
    console.log("allowing");
  }
  render() {
    const {
      address,
      allowance,
      overdraft,
      interest,
      from,
      periodUnit,
      period,
      periodAmount
    } = this.state;
    return (
      <Container>
        <TitleRow className="justify-content-center">
          <Col md={5}>
            <h1>Add a new benefactor</h1>
          </Col>
        </TitleRow>
        <Row className="justify-content-center">
          <Col md={6}>
            <Form>
              <FormGroup>
                <Label for="address">Address</Label>
                <Input
                  onChange={e => this.onInputChange("address", e.target.value)}
                  type="text"
                  name="address"
                  id="address"
                  value={address}
                  placeholder="0x0000000000000000000000000000000000000000"
                />
              </FormGroup>
              <FormGroup>
                <Label for="allowance">Allowance</Label>
                <Input
                  onChange={e =>
                    this.onInputChange("allowance", e.target.value)
                  }
                  type="decmial"
                  name="allowance"
                  id="allowance"
                  value={allowance}
                  placeholder="0.0"
                />
              </FormGroup>
              <FormGroup>
                <Label for="overdraft">Overdraft</Label>
                <Input
                  onChange={e =>
                    this.onInputChange("overdraft", e.target.value)
                  }
                  type="text"
                  name="overdraft"
                  id="overdraft"
                  value={overdraft}
                  placeholder="0.0"
                />
              </FormGroup>
              <FormGroup>
                <Label for="interest">Interest Rate</Label>
                <Input
                  onChange={e => this.onInputChange("interest", e.target.value)}
                  type="text"
                  name="interest"
                  id="interest"
                  value={interest}
                  placeholder="0.0"
                />
              </FormGroup>
              <FormGroup>
                <Row>
                  <Col>
                    <Label for="startDate">From</Label>
                    <Input
                      type="date"
                      name="startDate"
                      id="startDate"
                      onChange={e => this.onInputChange("from", e.target.value)}
                      placeholder=""
                      value={from}
                    />
                  </Col>
                </Row>
                <MarginRow>
                  <Col>
                    <Label for="period">Every</Label>
                    <InputGroup>
                      <Input
                        typeUnitSelection="text"
                        name="period"
                        id="period"
                        onChange={e =>
                          this.onInputChange("period", e.target.value)
                        }
                        placeholder="1"
                        value={period}
                      />
                      <UnitSelection
                        type="select"
                        id="selectPeriodUnit"
                        name="selectPeriodUnit"
                        onChange={e =>
                          this.onInputChange("periodUnit", e.target.value)
                        }
                        value={periodUnit}
                      >
                        {UNIT_TO_PERIOD.map(([unit, period]) => {
                          return (
                            <option key={period} value={unit}>
                              {unit}
                            </option>
                          );
                        })}
                      </UnitSelection>
                    </InputGroup>
                  </Col>
                  <Col>
                    <Label for="periodAmount">For</Label>
                    <InputGroup>
                      <Input
                        typeUnitSelection="text"
                        name="periodAmount"
                        id="periodAmount"
                        placeholder="1"
                      />
                      <InputGroupAddon addonType="append">
                        <CapitalizedInputText>
                          {periodUnit}
                        </CapitalizedInputText>
                      </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </MarginRow>
              </FormGroup>
              <Row>
                <Col className="text-center">
                  <Button type="button" onClick={() => this.createAllowance()}>
                    Allow
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}
