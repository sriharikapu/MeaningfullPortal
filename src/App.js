import React, { Component } from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";
import Payer from "./routes/Payer";
import Payee from "./routes/Payee";
import Home from "./routes/Home";
import Header from "./components/Header";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <Header/>
          <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/payer" component={Payer} />
            <Route exact path="/payee" component={Payee} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
