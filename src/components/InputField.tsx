import { TextInput, TextInputProps, View } from 'react-native';

import Label from './Label';

interface InputFieldProps extends TextInputProps {
  label: string;
}

const InputField = ({
  value,
  onChangeText,
  placeholder,
  keyboardType,
  label,
  ...props
}: InputFieldProps) => {
  return (
    <View className="gap-2">
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
  );
};

export default InputField;
