/**
 * Parses the `start` parameter from a URL search query and ensures it's a valid multiple of 20.
 * If the value is invalid, it defaults to 0. Calculates and returns the `start` and `end` ranges.
 *
 * @param {string | string[] | undefined} searchParam - The `start` parameter from the URL search query.
 *   - If it's a string, it's expected to be a numeric value representing the start index.
 *   - If it's an array, the function will use the first element as the start value.
 *   - If undefined or invalid, the start value will default to 0.
 * @returns {[number, number]} An array containing:
 *   - `start`: The validated and adjusted start index, always a multiple of 20.
 *   - `end`: The end index, which is always 20 more than the start index.
 *
 * @example
 * // Returns [0, 20] if "0" start value is passed.
 * CalcStartAndEnd('0');
 */
export function CalcStartAndEnd(searchParam: string | string[] | undefined) {
  let start = Number(searchParam) ?? 0;
  let end;

  // ensure start and end ranges are valid
  if (Number.isNaN(start)) start = 0;
  if (start < 0 || start > Number.MAX_SAFE_INTEGER) start = 0;
  let remainder = start % 20;
  if (remainder !== 0) start -= remainder; // start will always be multiple of 20
  end = start + 20;
  
  return [start, end]
}