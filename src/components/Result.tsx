import { Text } from 'react-native';
import Animated, { FadeInDown, SlideInRight } from 'react-native-reanimated';

import { CalculationResult } from '../utils/calculator';

interface ResultProps {
  result: CalculationResult | null;
}

const Result = ({ result }: ResultProps) => {
  if (!result) {
    return (
      <Text className="text-gray-500 text-sm mt-2 text-center">
        Please fill in all fields correctly to see the calculation
      </Text>
    );
  }

  const animatedKey = result.principal + result.rate + result.term + result.frequency;

  return (
    <Animated.View className="flex gap-2" key={animatedKey}>
      <Animated.Text entering={FadeInDown} className="text-2xl font-bold text-center text-gray-800">
        Result
      </Animated.Text>
      <Animated.Text entering={SlideInRight.delay(100)} className="text-xl font-bold text-gray-800">
        Principal: <Text className="text-orange-700">{result.formattedPrincipal}</Text>
      </Animated.Text>
      <Animated.Text entering={SlideInRight.delay(200)} className="text-xl font-bold text-gray-800">
        Rate: <Text className="text-orange-700">{result.rate + '%'}</Text>
      </Animated.Text>
      <Animated.Text entering={SlideInRight.delay(300)} className="text-xl font-bold text-gray-800">
        Term: <Text className="text-orange-700">{result.term + ' years'}</Text>
        <Animated.Text
          entering={SlideInRight.delay(500)}
          className="text-xl font-bold text-gray-800"
        >
          Frequency: <Text className="text-orange-700">{result.frequency}</Text>
        </Animated.Text>
      </Animated.Text>
      <Animated.Text entering={SlideInRight.delay(400)} className="text-xl font-bold text-gray-800">
        Final Balance: <Text className="text-orange-700">{result.formattedFinalBalance}</Text>
      </Animated.Text>
    </Animated.View>
  );
};

export default Result;
