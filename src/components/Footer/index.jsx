import React, { Component } from "react";
import { Col, Container, Row } from "reactstrap";

export default class Footer extends Component {
  render() {
    return (
      <div className="bg-secondary" style={{ padding: "30px 0" }}>
        <Container>
          <Row className="h-100 justify-content-center align-items-start">
            <Col md={3}>
              <dl>
                <dt>About</dt>
                <dd>About us</dd>
                <dd>Our charts</dd>
                <dd>Stats</dd>
                <dd>Press</dd>
              </dl>
            </Col>
            <Col md={3}>
              <dl>
                <dt>Support</dt>
                <dd>Help Center</dd>
                <dd>Our Rules</dd>
                <dd>Patrons</dd>
              </dl>
            </Col>
            <Col md={3}>
              <dl>
                <dt>Hello</dt>
                <dd>Engineering Blog</dd>
                <dd>Newsletter</dd>
                <dd>Research</dd>
                <dd>Whitepaper</dd>
              </dl>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
