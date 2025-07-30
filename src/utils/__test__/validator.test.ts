import {
  cleanAmountForCalculation,
  validateAmount,
  validateInterestRate,
  validateTerm,
} from '@/src/utils/validator';

describe('Validators', () => {
  describe('validateAmount', () => {
    test('accepts valid amounts', () => {
      expect(validateAmount('10000')).toBeNull();
      expect(validateAmount('$1,500,000')).toBeNull();
    });

    test('rejects invalid amounts', () => {
      expect(validateAmount('abc')).toBe('Please enter a valid number');
      expect(validateAmount('1.1.2')).toBe('Please enter a valid number');
      expect(validateAmount('2000000')).toBe('Amount cannot exceed $1,500,000');
    });
  });

  describe('validateInterestRate', () => {
    test('accepts valid rates', () => {
      expect(validateInterestRate('1.5')).toBeNull();
      expect(validateInterestRate('15')).toBeNull();
    });

    test('rejects invalid rates', () => {
      expect(validateInterestRate('1.1.2')).toBe('Please enter a valid number');
      expect(validateInterestRate('20')).toBe('Interest rate cannot exceed 15%');
    });
  });

  describe('validateTerm', () => {
    test('accepts valid terms', () => {
      expect(validateTerm('1')).toBeNull();
      expect(validateTerm('5')).toBeNull();
    });

    test('rejects invalid terms', () => {
      expect(validateTerm('abc')).toBe('Please enter a valid number');
      expect(validateTerm('10')).toBe('Term cannot exceed 5 years');
    });
  });

  describe('cleanAmountForCalculation', () => {
    test('cleans currency formatting', () => {
      expect(cleanAmountForCalculation('$10,000.00')).toBe(10000);
      expect(cleanAmountForCalculation('abc')).toBe(0);
    });
  });
});
