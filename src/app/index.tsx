import React from 'react';
import { ScrollView } from 'react-native';

import TermDepositForm from '@/src/components/TermDepositForm';

export default function Index() {
  return (
    <ScrollView
      className="flex-1 pt-safe"
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
    >
      <TermDepositForm />
    </ScrollView>
  );
}
