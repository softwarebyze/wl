import { useState } from "react";
import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import DateTimePicker from '@/components/DateTimePicker';

export default function AddScoreScreen() {
  const [date, setDate] = useState(new Date())
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Score</Text>
      <View>
        <Text>Date</Text>
        <DateTimePicker value={date} onChange={setDate} />
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
