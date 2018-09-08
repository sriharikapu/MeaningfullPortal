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
          <input
            className="form-control"
            type="number"
            name="allowance"
            id="allowance"
            onChange={this.props.onInputChange}
            value={this.props.allowance}
            min={0}
          />
        </FormGroup>
        <FormGroup>
          <Label for="overdraft">Overdraft</Label>
          <input
            className="form-control"
            type="number"
            name="overdraft"
            id="overdraft"
            step="0.01"
            onChange={this.props.onInputChange}
            value={this.props.overdraft}
            min={0}
          />
        </FormGroup>
        <FormGroup>
          <Label for="interest">Interest Rate</Label>
          <input
            className="form-control"
            type="number"
            name="interest"
            id="interest"
            step="0.01"
            onChange={this.props.onInputChange}
            value={this.props.interest}
            min={0}
          />
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
                  id="selectPeriodUnit"
                  name="selectPeriodUnit"
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
              <Label for="periodAmount">For</Label>
              <InputGroup>
                <input
                  className="form-control"
                  type="number"
                  name="periodAmount"
                  id="periodAmount"
                  onChange={this.props.onInputChange}
                  value={this.props.repeat}
                  min={1}
                />
                <InputGroupAddon addonType="append">
                  <CapitalizedInputText>
                    {this.props.periodUnit}
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
