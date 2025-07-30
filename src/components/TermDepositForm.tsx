import React, { useCallback, useMemo, useState } from 'react';
import { Text, View } from 'react-native';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

import { calculateAllResults, formatCurrency, PaymentFrequency } from '@/src/utils/calculator';

import InputField from './InputField';
import Label from './Label';
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
  const animatedKey = useMemo(() => {
    return `result + ${amount + rate + term + frequency}`;
  }, [amount, rate, term, frequency]);

  const cleanAmount = useMemo(() => {
    return amount.replace(/[$,]/g, '');
  }, [amount]);

  const result = useMemo(() => {
    const numAmount = Number(cleanAmount);
    const numRate = Number(rate);
    const numTerm = Number(term);

    if (!numAmount || !numRate || !numTerm || !frequency) {
      return null;
    }

    if (numAmount <= 0 || numRate < 0 || numTerm <= 0) {
      return null;
    }

    try {
      const result = calculateAllResults(numAmount, numRate, numTerm, frequency);
      return result;
    } catch (error) {
      console.log('Calculation error:', error);
      return null;
    }
  }, [cleanAmount, rate, term, frequency]);

  const handleFrequencySelect = useCallback((value: PaymentFrequency) => {
    setFrequency(value);
  }, []);
  const handleAmountBlur = useCallback(() => {
    const numAmount = Number(cleanAmount.replace(/[$,]/g, '')); // Remove existing formatting
    if (numAmount && numAmount > 0) {
      const formatted = formatCurrency(numAmount);
      setAmount(formatted);
    }
  }, [cleanAmount]);

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
        onChangeText={setAmount}
        onBlur={handleAmountBlur}
        placeholder="e.g. 10,000"
        keyboardType="numeric"
      />

      {/* Interest Rate Input */}
      <InputField
        label="Interest Rate (%)"
        value={rate}
        onChangeText={setRate}
        placeholder="e.g. 1.10"
        keyboardType="numeric"
      />

      {/* Term Input */}
      <InputField
        label="Investment Term (years)"
        value={term}
        onChangeText={setTerm}
        placeholder="e.g. 3"
        keyboardType="numeric"
      />

      {/* Frequency Selection */}
      <View className="gap-2">
        <Label>Interest Paid</Label>
        <View className="flex-row flex-wrap gap-2">{frequencyButtons}</View>
      </View>

      {/* Result */}
      {result && (
        <Animated.View className="flex gap-2" key={animatedKey}>
          <Animated.Text
            entering={FadeInDown}
            className="text-2xl font-bold text-center text-gray-800"
          >
            Result
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.delay(100)}
            className="text-xl font-bold text-gray-800"
          >
            Principal: <Text className="text-orange-700">{result.formattedPrincipal}</Text>
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.delay(200)}
            className="text-xl font-bold text-gray-800"
          >
            Rate: <Text className="text-orange-700">{result.rate + '%'}</Text>
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.delay(300)}
            className="text-xl font-bold text-gray-800"
          >
            Term: <Text className="text-orange-700">{result.term + ' years'}</Text>
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.delay(400)}
            className="text-xl font-bold text-gray-800"
          >
            Final Balance: <Text className="text-orange-700">{result.formattedFinalBalance}</Text>
          </Animated.Text>
          <Animated.Text
            entering={SlideInRight.delay(500)}
            className="text-xl font-bold text-gray-800"
          >
            Frequency: <Text className="text-orange-700">{result.frequency}</Text>
          </Animated.Text>
        </Animated.View>
      )}
    </View>
  );
};

export default TermDepositForm;
