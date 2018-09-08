import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Payer from "./routes/Payer";
import Payee from "./routes/Payee";
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
            </div>
          </div>
        </Router>
      </Loading>
    );
  }
}

export default App;
