const breakpointToRomain = new Map([
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]);
const allBreakPoints = [...breakpointToRomain];

export const convert = (decimalNumber: number) => {
  let remaining = decimalNumber;
  return allBreakPoints.reduce((romanCharacters, [breakpoint, roman]) => {
    const numberOfBreakpoint = Math.floor(remaining / breakpoint);

    romanCharacters += roman.repeat(numberOfBreakpoint);
    remaining -= numberOfBreakpoint * breakpoint;
    return romanCharacters;
  }, '');
};
