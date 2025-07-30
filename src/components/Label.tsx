import { Text } from 'react-native';

const Label = ({ children }: { children: React.ReactNode }) => {
  return <Text className="text-base font-semibold text-gray-800">{children}</Text>;
};

export default Label;
