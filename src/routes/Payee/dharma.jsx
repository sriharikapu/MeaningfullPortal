import { Dharma } from "@dharmaprotocol/dharma.js";
import * as BigNumber from "bignumber.js";

export default async function createCollaterlizedDebtOrder(
  ledger,
  collateralizer,
  erc721ID,
  allowance,
  index
) {
  const provider = window.web3.currentProvider;

  const dharma = new Dharma(provider);

  const collateralizerAddress = collateralizer.address;
  console.log("initialized dharma", collateralizerAddress);
  // Approve dharma
  let txHash = await ledger.methods["approve"](
    collateralizerAddress,
    erc721ID
  ).send();

  const debtOrderData = {
    principalAmount: new BigNumber(allowance.amountWei / 10 ** 18),
    principalTokenSymbol: "WETH",
    interestRate: new BigNumber(1),
    amortizationUnit: "days",
    termLength: new BigNumber(5),
    debtor: allowance.sideB,
    isEnumerable: true,
    erc721Symbol: "PUL",
    tokenReference: new BigNumber(index)
  };
  const adapter = dharma.adapters.erc721CollateralizedSimpleInterestLoan;
  const order = await adapter.toDebtOrder(debtOrderData);
  // Sign the debt order.
  console.log("Please approve the request to sign the debt order.");
  order.debtorSignature = await dharma.sign.asDebtor(order, false);

  // Let's inspect the signed debt order:
  console.log("The order has been signed, as follows:");
  console.log(order);
}
