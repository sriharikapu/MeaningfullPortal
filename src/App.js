import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Payer from "./routes/Payer";
import Payee from "./routes/Payee";
import EditBenefactorForm from "./routes/Payer/Edit";
import AllowanceForm from "./routes/Payer/Allowance";
import Home from "./routes/Home";
import Header from "./components/Header";
import Loading from "./components/Loading";

class App extends Component {
  render() {
    return (
      <Loading>
        <Router>
          <div className="App">
            <Header />
            <div>
              <Route exact path="/" component={Home} />
              <Route exact path="/payer" component={Payer} />
              <Route exact path="/payee" component={Payee} />
		    <Route exact path="/payer/benefactors/edit/:bid" component={EditBenefactorForm} />
		    <Route exact path="/payer/allowance" component={AllowanceForm} />
            </div>
          </div>
        </Router>
      </Loading>
    );
  }
}

export default App;
