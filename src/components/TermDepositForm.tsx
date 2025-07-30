import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';

import { calculateAllResults, formatCurrency, PaymentFrequency } from '@/src/utils/calculator';

import {
  cleanAmountForCalculation,
  validateAmount,
  validateInterestRate,
  validateTerm,
} from '../utils/validator';

import InputField from './InputField';
import Label from './Label';
import Result from './Result';
import Select from './Select';

const FREQUENCIES = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Quarterly', value: 'quarterly' },
  { label: 'Annually', value: 'annually' },
  { label: 'At Maturity', value: 'maturity' },
] as const;

const TermDepositForm = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [frequency, setFrequency] = useState<PaymentFrequency>('monthly');

  // Keep track of which fields have been touched
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Validation functions with memoization
  const amountError = useMemo(() => {
    return touched.amount ? validateAmount(amount) : null;
  }, [amount, touched.amount]);

  const rateError = useMemo(() => {
    return touched.rate ? validateInterestRate(rate) : null;
  }, [rate, touched.rate]);

  const termError = useMemo(() => {
    return touched.term ? validateTerm(term) : null;
  }, [term, touched.term]);

  const cleanAmount = useMemo(() => {
    return amount.replace(/[$,]/g, '');
  }, [amount]);

  const result = useMemo(() => {
    const numAmount = Number(cleanAmount);
    const numRate = Number(rate);
    const numTerm = Number(term);

    // Don't calculate if there are validation errors or missing inputs
    if (amountError || rateError || termError) {
      return null;
    }

    if (!numAmount || !numRate || !numTerm || !frequency) {
      return null;
    }

    // Additional validation to prevent invalid calculations
    if (numAmount <= 0 || numRate <= 0 || numTerm <= 0) {
      return null;
    }

    try {
      const result = calculateAllResults(numAmount, numRate, numTerm, frequency);
      return result;
    } catch (error) {
      console.log('Calculation error:', error);
      return null;
    }
  }, [cleanAmount, rate, term, frequency, amountError, rateError, termError]);

  // Input change handlers with validation
  const handleAmountChange = useCallback((text: string) => {
    setAmount(text);
    setTouched((prev) => ({ ...prev, amount: true }));
  }, []);

  const handleRateChange = useCallback((text: string) => {
    setRate(text);
    setTouched((prev) => ({ ...prev, rate: true }));
  }, []);

  const handleTermChange = useCallback((text: string) => {
    setTerm(text);
    setTouched((prev) => ({ ...prev, term: true }));
  }, []);

  // Format amount as currency on blur
  const handleAmountBlur = useCallback(() => {
    if (amount && !amountError) {
      const numAmount = cleanAmountForCalculation(amount);
      if (numAmount > 0) {
        const formatted = formatCurrency(numAmount);
        setAmount(formatted);
      }
    }
  }, [amount, amountError]);

  const handleFrequencySelect = useCallback((value: PaymentFrequency) => {
    setFrequency(value);
  }, []);

  const frequencyButtons = useMemo(() => {
    return FREQUENCIES.map((freq) => (
      <Select
        key={freq.value}
        value={freq.value}
        label={freq.label}
        onPress={() => handleFrequencySelect(freq.value)}
        frequency={frequency}
      />
    ));
  }, [frequency, handleFrequencySelect]);

  return (
    <View className="p-4 bg-white flex-1 gap-6">
      <Text className="text-2xl font-bold text-center text-gray-800">Term Deposit Calculator</Text>

      {/* Amount Input */}
      <InputField
        label="Start Deposit Amount ($)"
        value={amount}
        onChangeText={handleAmountChange}
        onBlur={handleAmountBlur}
        placeholder="e.g. 10,000"
        keyboardType="numeric"
        error={amountError}
      />

      {/* Interest Rate Input */}
      <InputField
        label="Interest Rate (%)"
        value={rate}
        onChangeText={handleRateChange}
        placeholder="e.g. 1.10"
        keyboardType="numeric"
        error={rateError}
      />

      {/* Term Input */}
      <InputField
        label="Investment Term (years)"
        value={term}
        onChangeText={handleTermChange}
        placeholder="e.g. 3"
        keyboardType="numeric"
        error={termError}
      />

      {/* Frequency Selection */}
      <View className="gap-2">
        <Label>Interest Paid</Label>
        <View className="flex-row flex-wrap gap-2">{frequencyButtons}</View>
      </View>

      {/* Result */}
      <Result result={result} />
    </View>
  );
};

export default TermDepositForm;
