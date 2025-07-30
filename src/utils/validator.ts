export interface ValidationError {
  field: string;
  message: string;
}

const validateNumber = (value: string) => {
  const decimalCount = (value.match(/\./g) || []).length;
  if (decimalCount > 1) {
    return 'Please enter a valid number';
  }

  if (!/^[0-9]*\.?[0-9]*$/.test(value)) {
    return 'Please enter a valid number';
  }

  if (value.startsWith('.') || value.endsWith('.')) {
    return 'Please enter a valid number';
  }

  return null;
};

/**
 * Validate deposit amount
 */
export const validateAmount = (amount: string): string | null => {
  if (!amount || amount.trim() === '') {
    return 'Please enter a deposit amount';
  }
  const cleanAmount = amount.replace(/[$,\s]/g, '');
  const error = validateNumber(cleanAmount);

  if (error) {
    return error;
  }

  const num = parseFloat(cleanAmount);

  if (isNaN(num)) {
    return 'Please enter a valid number';
  }

  if (num < 0) {
    return 'Amount must be positive';
  }

  if (num < 1000) {
    return 'Minimum deposit amount is $1,000';
  }

  if (num > 1500000) {
    return 'Amount cannot exceed $1,500,000';
  }

  return null;
};

/**
 * Validate interest rate
 */
export const validateInterestRate = (rate: string): string | null => {
  if (!rate || rate.trim() === '') {
    return 'Please enter an interest rate';
  }

  const cleanRate = rate.trim();
  const error = validateNumber(cleanRate);

  if (error) {
    return error;
  }

  const num = parseFloat(cleanRate);

  if (isNaN(num)) {
    return 'Please enter a valid interest rate';
  }

  if (num < 0) {
    return 'Interest rate cannot be negative';
  }

  if (num > 15) {
    return 'Interest rate cannot exceed 15%';
  }

  if (num === 0) {
    return 'Interest rate must be greater than 0%';
  }

  return null;
};

/**
 * Validate investment term
 */
export const validateTerm = (term: string): string | null => {
  if (!term || term.trim() === '') {
    return 'Please enter an investment term';
  }
  const cleanTerm = term.trim();

  const error = validateNumber(cleanTerm);

  if (error) {
    return error;
  }

  const num = parseFloat(cleanTerm);

  if (isNaN(num)) {
    return 'Please enter a valid term length';
  }

  if (num < 0) {
    return 'Term must be a positive number';
  }

  if (num < 0.25) {
    return 'Minimum term is 3 months which is 0.25 years';
  }

  if (num > 5) {
    return 'Term cannot exceed 5 years';
  }

  return null;
};

/**
 * Clean amount string for calculation (remove currency formatting)
 */
export const cleanAmountForCalculation = (amount: string): number => {
  const cleaned = amount.replace(/[$,\s]/g, '');
  return parseFloat(cleaned) || 0;
};
