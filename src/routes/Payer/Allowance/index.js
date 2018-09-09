import React, { Component, Fragment } from "react";

import {
  Col,
  CustomInput,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  Label,
  Row
} from "reactstrap";
import { UNIT_TO_PERIOD } from "../../../utils";
import styled from "styled-components";

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
  render() {
    return (
      <Fragment>
        <FormGroup>
          <Label for="address">Address</Label>
          <Input
            type="text"
            name="address"
            id="address"
            onChange={this.props.onInputChange}
            value={this.props.address}
          />
        </FormGroup>
        <FormGroup>
          <Label for="allowance">Allowance</Label>
          <InputGroup>
            <input
              className="form-control"
              type="number"
              step="0.000001"
              name="allowance"
              id="allowance"
              onChange={this.props.onInputChange}
              value={this.props.allowance}
              min={0}
            />
            <InputGroupAddon addonType="append">
              <CapitalizedInputText>ETH</CapitalizedInputText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="overdraft">Overdraft</Label>
          <InputGroup>
            <input
              className="form-control"
              type="number"
              name="overdraft"
              id="overdraft"
              step="0.001"
              onChange={this.props.onInputChange}
              value={this.props.overdraft}
              min={0}
            />
            <InputGroupAddon addonType="append">
              <CapitalizedInputText>%</CapitalizedInputText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Label for="interest">Interest Rate</Label>
          <InputGroup>
            <input
              className="form-control"
              type="number"
              name="interest"
              id="interest"
              step="0.001"
              onChange={this.props.onInputChange}
              value={this.props.interest}
              min={0}
            />
            <InputGroupAddon addonType="append">
              <CapitalizedInputText>%</CapitalizedInputText>
            </InputGroupAddon>
          </InputGroup>
        </FormGroup>
        <FormGroup>
          <Row>
            <Col>
              <Label for="startDate">From</Label>
              <input
                className="form-control"
                type="date"
                name="startDate"
                id="startDate"
                onChange={this.props.onInputChange}
                value={this.props.startingDate}
              />
            </Col>
          </Row>
          <MarginRow>
            <Col>
              <Label for="period">Every</Label>
              <InputGroup>
                <input
                  className="form-control"
                  type="text"
                  name="period"
                  id="period"
                  onChange={this.props.onInputChange}
                  value={this.props.period}
                />
                <UnitSelection
                  type="select"
                  id="periodUnit"
                  name="periodUnit"
                  onChange={this.props.onInputChange}
                  value={this.props.periodUnit}
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
              <Label for="periodAmount">Repeat</Label>
              <InputGroup>
                <input
                  className="form-control"
                  type="number"
                  name="periodAmount"
                  id="periodAmount"
                  onChange={this.props.onInputChange}
                  value={this.props.periodAmount}
                  min={1}
                />
                <InputGroupAddon addonType="append">
                  <CapitalizedInputText>
                    {"* "}{this.props.period} {this.props.periodUnit}
                    {this.props.period > 1 ? "s" : ""}
                  </CapitalizedInputText>
                </InputGroupAddon>
              </InputGroup>
            </Col>
          </MarginRow>
        </FormGroup>
      </Fragment>
    );
  }
}
