import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import InputField from './InputField';
import Label from './Label';
import Select from './Select';

const TermDepositForm = () => {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [term, setTerm] = useState('');
  const [frequency, setFrequency] = useState('');

  const frequencies = [
    { label: 'Monthly', value: 'monthly' },
    { label: 'Quarterly', value: 'quarterly' },
    { label: 'Annually', value: 'annually' },
    { label: 'At Maturity', value: 'maturity' },
  ] as const;

  const handleSubmit = () => {
    console.log('Lets build form logic');
  };

  return (
    <View className="p-4 bg-white flex-1 gap-6">
      <Text className="text-2xl font-bold text-center text-gray-800">Term Deposit Calculator</Text>

      {/* Amount Input */}
      <InputField
        label="Start Deposit Amount ($)"
        value={amount}
        onChangeText={setAmount}
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
        <View className="flex-row flex-wrap gap-2">
          {frequencies.map((freq) => (
            <Select
              key={freq.value}
              value={freq.value}
              label={freq.label}
              onPress={() => setFrequency(freq.value)}
              frequency={frequency}
            />
          ))}
        </View>
      </View>

      {/* Submit Button */}
      <View className="mt-auto">
        <TouchableOpacity
          className="bg-orange-700 py-4 rounded-xl shadow-md"
          onPress={handleSubmit}
        >
          <Text className="text-white text-lg font-semibold text-center">
            Calculate Term Deposit
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TermDepositForm;
