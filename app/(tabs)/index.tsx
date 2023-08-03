import { useState } from "react";
import { StyleSheet, Keyboard } from 'react-native';

import { Text, View, TextInput } from '@/components/Themed';
import CustomDateTimePicker from '@/components/CustomDateTimePicker';


export default function AddScoreScreen() {
  const [date, setDate] = useState(new Date())
  return (
    <View onPointerDown={Keyboard.dismiss} onTouchStart={Keyboard.dismiss} style={styles.container}>
      <Text style={styles.title}>Add Score</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Date</Text>
        <CustomDateTimePicker value={date} onChange={setDate} />
      </View>
      <View style={styles.scoresContainer}>
        <View style={styles.score}>
          <Text>Me</Text>
          <TextInput inputMode="numeric" style={styles.scoreInput} />
        </View>
        <Text style={styles.dash}>-</Text>
        <View style={styles.score}>
          <Text>Opponent</Text>
          <TextInput inputMode="numeric" style={styles.scoreInput} />
        </View>
      </View>
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
  dateLabel: {
    marginVertical: 8,
  },
  dateContainer: {
    marginVertical: 30
  },
  scoreInput: {
    width: 50,
    height: 40,
    borderWidth: 1,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    textAlign: 'center'
  },
  score: {
    alignItems: 'center'
  },
  scoresContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  dash: {
    fontSize: 28,
    paddingTop: 10
  }
});
