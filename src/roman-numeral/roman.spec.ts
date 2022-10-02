import { convert } from './roman';

describe('Roman numerals', () => {
  it('should convert a thousand to romain character', () => {
    expect(convert(1000)).toBe('M');
  });

  it('should compose breakpoints from decimal', () => {
    expect(convert(2000)).toBe('MM');
    expect(convert(1500)).toBe('MD');
    expect(convert(1600)).toBe('MDC');
    expect(convert(1800)).toBe('MDCCC');
    expect(convert(800)).toBe('DCCC');
    expect(convert(16)).toBe('XVI');
    expect(convert(60)).toBe('LX');
    expect(convert(999)).toBe('CMXCIX');
  });

  it('should prevent repetion of 4 characters', () => {
    expect(convert(900)).toBe('CM');
    expect(convert(400)).toBe('CD');
    expect(convert(90)).toBe('XC');
    expect(convert(40)).toBe('XL');
    expect(convert(9)).toBe('IX');
    expect(convert(4)).toBe('IV');
  });
});
