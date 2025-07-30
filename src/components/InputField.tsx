import { Text, TextInput, TextInputProps, View } from 'react-native';

import Label from './Label';

interface InputFieldProps extends TextInputProps {
  label: string;
  error: string | null;
}

const InputField = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  label,
  error,
  ...props
}: InputFieldProps) => {
  return (
    <View className="gap-1">
      <View className="flex flex-col gap-2">
        <Label>{label}</Label>
        <View className="border border-gray-200 rounded-lg text-base bg-orange-50 ">
          <TextInput
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            keyboardType={keyboardType}
            className="placeholder:text-orange-400 p-3"
            {...props}
          />
        </View>
      </View>
      {error && <Text className="text-red-500 text-sm">{error}</Text>}
    </View>
  );
};

export default InputField;
