/** Don't execute default input event */
export const preventDefault = (event: Event) => event.preventDefault();

/** No operation */
export const noop = () => null;

const YEAR_IN_MS = 31556952000;
const MONTH_IN_MS = 2629746000;
const DAY_IN_MS = 86400000;
const HOUR_IN_MS = 3600000;
const MIN_IN_MS = 60000;
const SEC_IN_MS = 1000;

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
