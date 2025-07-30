export type PaymentFrequency = 'monthly' | 'quarterly' | 'annually' | 'maturity';

export interface CalculationResult {
  principal: number;
  rate: number;
  term: number;
  frequency: PaymentFrequency;
  finalBalance: number;
  formattedFinalBalance: string;
  formattedPrincipal: string;
}
/**
 * Calculate term deposit final balance
 *
 * Formula: A = P(1 + r/n)^(nt)
 *
 * P = principal amount (starting deposit)
 * r = annual interest rate (as decimal)
 * n = number of times interest compounds per year
 * t = time in years
 * A = final amount
 *
 * For "maturity" we use simple interest: A = P(1 + rt)
 */
export const calculateTermDeposit = (
  principal: number,
  annualRate: number,
  years: number,
  frequency: PaymentFrequency,
): number => {
  const rate = annualRate / 100; // Convert percentage to decimal

  if (frequency.toLowerCase() === 'maturity') {
    return principal * (1 + rate * years);
  }

  const n = getFrequency(frequency);
  const amount = principal * Math.pow(1 + rate / n, n * years);

  return Math.round(amount);
};

export const calculateAllResults = (
  principal: number,
  annualRate: number,
  years: number,
  frequency: PaymentFrequency,
): CalculationResult => {
  const finalBalance = calculateTermDeposit(principal, annualRate, years, frequency);

  return {
    principal: parseFloat(principal.toString()),
    rate: parseFloat(annualRate.toString()),
    term: parseFloat(years.toString()),
    frequency,
    finalBalance,
    formattedFinalBalance: formatCurrency(finalBalance),
    formattedPrincipal: formatCurrency(principal),
  };
};

export const getFrequency = (frequency: PaymentFrequency): number => {
  const frequencies: Record<PaymentFrequency, number> = {
    monthly: 12,
    quarterly: 4,
    annually: 1,
    maturity: 1,
  };

  return frequencies[frequency.toLowerCase() as PaymentFrequency] || 1;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
  }).format(amount);
};
