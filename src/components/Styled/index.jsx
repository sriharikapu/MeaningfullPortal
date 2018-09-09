import styled from "styled-components";

export const StickyPeriodHeader = styled.h3`
  position: sticky;
  top: 0;
  background: #fff;
  line-height: 50px;
  border-bottom: 1px solid black;
  z-index: 99;
`;
export const PaymentLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 20px 0;
`;
export const LatePaymentLine = styled(PaymentLine)``;

export const Section = styled.div`
  padding: 30px 10px;
  background: #ccc;
`;

export const Text = styled.p`
  color: black;
`;

export const Heading = styled.h1`
  margin-bottom: 25px;
`;
