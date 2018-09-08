export const UNIT_TO_PERIOD = [
  ["hour", 60 * 60],
  ["day", 60 * 60 * 24],
  ["week", 60 * 60 * 24 * 7],
  ["month", 60 * 60 * 24 * 30]
];

export const unitToPeriod = UNIT_TO_PERIOD.map(([key, time]) => ({
  [key]: time
})).reduce((a, b) => ({ ...a, ...b }));

export const periodToUnit = seconds => {
  let unit = UNIT_TO_PERIOD.find(([name, amount], idx) => {
    let next = UNIT_TO_PERIOD[idx + 1];
    return next ? seconds % next[1] !== 0 : true;
  });
  let amount = seconds / unit[1];
  return amount > 1 ? `${amount} ${unit[0]}s` : `${unit[0]}`;
};
