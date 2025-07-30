import { calculateAllResults, calculateTermDeposit, getFrequency } from '@/src/utils/calculator';

describe('Term Deposit Calculator', () => {
  test('calculates the requirements example correctly', () => {
    // $10,000 at 1.10% for 3 years, interest paid at maturity
    // Expected: $10,330
    const result = calculateTermDeposit(10000, 1.1, 3, 'maturity');
    expect(result).toBe(10330);
  });

  test('calculates compound interest for quarterly payments', () => {
    // $10,000 at 4% for 2 years, quarterly compounding
    // A = 10000(1 + 0.04/4)^(4*2) = 10000(1.01)^8 ≈ 10828.57
    const result = calculateTermDeposit(10000, 4, 2, 'quarterly');
    expect(result).toBeCloseTo(10828.57, 2);
  });

  test('returns correct compounding frequencies', () => {
    expect(getFrequency('monthly')).toBe(12);
    expect(getFrequency('quarterly')).toBe(4);
    expect(getFrequency('annually')).toBe(1);
    expect(getFrequency('maturity')).toBe(1);
  });

  test('calculateAllResults returns complete result object', () => {
    const result = calculateAllResults(10000, 1.1, 3, 'maturity');

    expect(result.principal).toBe(10000);
    expect(result.rate).toBe(1.1);
    expect(result.term).toBe(3);
    expect(result.frequency).toBe('maturity');
    expect(result.finalBalance).toBe(10330);
    expect(result.formattedFinalBalance).toBe('$10,330.00');
  });
});
