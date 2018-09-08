import React, { Component } from "react";
import PropTypes from "prop-types";
import { drizzleConnect } from "drizzle-react";
import { get } from "dot-prop";

class Home extends Component {
  constructor(props, context) {
    super();

    this.contracts = context.drizzle.contracts;
  }

  getData = (contract, method, defaultValue) => {
    return get(
      this.props.contracts[contract][method][
        this.contracts[contract].methods[method].cacheCall()
      ],
      "value",
      defaultValue
    );
  };

  render() {
    const balance = this.getData("Ledger", "getDepositBalance", "Unknown");
    return <div>Your Balance Is: {balance}</div>;
  }
}

Home.contextTypes = {
  drizzle: PropTypes.object
};

const mapStateToProps = ({ contracts }) => {
  return {
    contracts
  };
};

export default drizzleConnect(Home, mapStateToProps);
