const YEAR_IN_MS = 31_556_952_000;
const MONTH_IN_MS = 2_629_746_000;
const DAY_IN_MS = 86_400_000;
const HOUR_IN_MS = 3_600_000;
const MIN_IN_MS = 60_000;
const SEC_IN_MS = 1_000;

const b62Chars =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

/** Return a random base62 string */
export const generateId = (length: number = 7) => {
  let result = "";

  for (let i = 0; i < length; i++) {
    const randIndex = Math.floor(Math.random() * b62Chars.length);
    result += b62Chars[randIndex];
  }

  return result;
};

// Build a dot-path union like "a", "a.b", "c.d.e"
export type Path<T> = T extends object
  ? {
      [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${Path<T[K]>}`
        : `${K}`;
    }[keyof T & string]
  : never;

export type PathValue<
  T,
  P extends string
> = P extends `${infer K}.${infer Rest}`
  ? K extends keyof T
    ? PathValue<T[K], Rest>
    : unknown
  : P extends keyof T
  ? T[P]
  : unknown;

export function get<T extends object, P extends Path<T>>(
  obj: T,
  path: P
): PathValue<T, P> | undefined {
  let acc: unknown = obj;

  for (const key of path.split(".")) {
    if (acc == null) return undefined;
    acc = (acc as any)[key];
  }

  return acc as PathValue<T, P> | undefined;
}

/** Given a list of string names and a base name, returns a unique name */
export function getUniqueName(names: string[], name: string) {
  let count = 1;
  let suffix = "0";

  while (names.includes(`${name}-${suffix}`)) {
    suffix = count.toString();
    count += 1;
  }

  return `${name}-${suffix}`;
}

/** No operation */
export function noop() {
  return null;
}

/** Don't execute default input event */
export function preventDefault(event: Event) {
  return event.preventDefault();
}

/** Always returns false */
export function stubFalse(arg?: any) {
  return false;
}

/** Return time since date occured, as human-readable string */
export function timeSince(date: Date) {
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
  return "Just now";
}
