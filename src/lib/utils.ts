/** Don't execute default input event */
export const preventDefault = (event: Event) => event.preventDefault();

/** No operation */
export const noop = () => null;

const YEAR_IN_MS = 31_556_952_000;
const MONTH_IN_MS = 2_629_746_000;
const DAY_IN_MS = 86_400_000;
const HOUR_IN_MS = 3_600_000;
const MIN_IN_MS = 60_000;
const SEC_IN_MS = 1_000;

/** Return time since date occured, as human-readable string */
export const timeSince = (date: Date) => {
  const diff = Date.now() - date.getTime();
  if (diff > YEAR_IN_MS) {
    return `${Math.floor(diff / YEAR_IN_MS)}Y ago`;
  }
  if (diff > MONTH_IN_MS) {
    return `${Math.floor(diff / MONTH_IN_MS)}M ago`;
  }
  if (diff > DAY_IN_MS) {
    return `${Math.floor(diff / DAY_IN_MS)}d ago`;
  }
  if (diff > HOUR_IN_MS) {
    return `${Math.floor(diff / HOUR_IN_MS)}h ago`;
  }
  if (diff > MIN_IN_MS) {
    return `${Math.floor(diff / MIN_IN_MS)}m ago`;
  }
  if (diff > SEC_IN_MS) {
    return `${Math.floor(diff / SEC_IN_MS)}s ago`;
  }
  return `${Math.floor(diff)}ms ago`;
};
