/** Concatenate a list of strings with commas and an ampersand (or your own choices). */
export function commaAnd(strs, comma = ", ", and = " & ") {
  const init = strs.slice(0, -1).join(comma);
  return [init, strs.slice(-1)].filter((s) => s).join(and);
}

export function fullName({ firstname, lastname }) {
  return `${firstname} ${lastname}`;
}

export function lastnameFirst({ firstname, lastname }) {
  return `${lastname}, ${firstname}`;
}

/** Deterministically converts a string to a friendly CSS color. */
export function strToColor(str) {
  const hue =
    Array.from(str).reduce((sum, char) => sum + char.charCodeAt(0), 0) % 360;
  return `hsl(${hue}deg, 50%, 90%)`;
}

/**
 * Equip a function with simple args-output caching.
 *
 * Seems to work fine with promises.
 * The return value is re-used; beware of mutating it!
 */
export function memoize(fn) {
  // This object will remain the same for all invocations of the returned function.
  const cache = {};
  // Create a function with same args and output as fn.
  return function(...args) {
    const key = JSON.stringify(args);
    return cache[key] || (cache[key] = fn(...args));
  };
}
