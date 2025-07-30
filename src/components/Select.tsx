import { Text, TouchableOpacity } from 'react-native';

import { PaymentFrequency } from '@/src/utils/calculator';

interface SelectProps {
  value: string;
  label: string;
  onPress: () => void;
  frequency: PaymentFrequency;
}

const Select = ({ value, label, onPress, frequency }: SelectProps) => {
  return (
    <TouchableOpacity
      key={value}
      className={`py-2 px-2 rounded-xl border ${
        frequency === value ? 'bg-orange-700 border-orange-700' : 'bg-orange-100 border-orange-100'
      }`}
      onPress={onPress}
    >
      <Text
        className={`text-sm ${
          frequency === value ? 'text-white font-semibold' : 'text-orange-700'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

export default Select;
