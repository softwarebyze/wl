import { useState } from "react";
import { StyleSheet, Keyboard, TouchableWithoutFeedback } from 'react-native';

import { Text, View, TextInput, Button } from '@/components/Themed';
import CustomDateTimePicker from '@/components/CustomDateTimePicker';
import { Score } from "@/types";
import { useScores } from "./_layout";
import Separator from "@/components/Separator";

export default function AddScoreScreen() {
  const [date, setDate] = useState(new Date())
  const [myScore, setMyScore] = useState('')
  const [opponentScore, setOpponentScore] = useState('')
  const [loading, setLoading] = useState(false)
  const disabled = myScore === '' || opponentScore === '' || loading

  const { scores, saveScores } = useScores()

  const formatDate = (date: Date) => date.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  const save = async () => {
    setLoading(true)
    const previousScoreId = scores.at(-1)?.id ?? 0
    const id = previousScoreId + 1
    const newScore: Score = { id, date: formatDate(date), myScore: +myScore, opponentScore: +opponentScore }
    saveScores([...scores, newScore])
    setMyScore('')
    setOpponentScore('')
    setLoading(false)
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <Text style={styles.title}>Add Score</Text>
        <Separator />
        <View>
          <View style={styles.dateContainer}>
            <Text style={styles.dateLabel}>Date</Text>
            <CustomDateTimePicker value={date} onChange={setDate} />
          </View>
          <View style={styles.scoresContainer}>
            <View style={styles.score}>
              <Text>Me</Text>
              <TextInput onChangeText={setMyScore} value={myScore} inputMode="numeric" style={styles.scoreInput} />
            </View>
            <Text style={styles.dash}>-</Text>
            <View style={styles.score}>
              <Text>Opponent</Text>
              <TextInput onChangeText={setOpponentScore} value={opponentScore} inputMode="numeric" style={styles.scoreInput} />
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={save} title="Save" disabled={disabled} />
          </View>
        </View >
      </View>
    </TouchableWithoutFeedback>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  separator: {
    marginTop: 30,
    height: 1,
    width: '80%',
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
    borderWidth: 2,
    padding: 12,
    marginHorizontal: 8,
    marginVertical: 8,
    textAlign: 'center',
    borderRadius: 5,
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
  },
  buttonContainer: {
    margin: 20
  }
});
