import { ScrollView, StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';
import { Score } from '@/types';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useScores } from './_layout';

export default function HistoryScreen() {
  const { scores, deleteScore } = useScores()

  const { wins, losses } = scores.reduce(
    (totals, score) => {
      if (score.myScore > score.opponentScore) {
        totals.wins += 1;
      } else if (score.myScore < score.opponentScore) {
        totals.losses += 1;
      }
      return totals;
    },
    { wins: 0, losses: 0 }
  );

  return (
    <View style={styles.container}>
      <View style={styles.historyContainer}>
        {scores.length ? <View>
          <TotalRow wins={wins} losses={losses} total={scores.length} />
          <ScrollView style={styles.scores}>
            {scores.map(score =>
              <ScoreRow {...score} key={score.id} onDelete={deleteScore} />
            )}
          </ScrollView>
        </View> : <NoScores />}
      </View>
    </View>
  );
}

const TotalRow = ({ wins, losses, total }: { wins: number, losses: number, total: number }) => {
  {
    const winPercentage = total > 0 ? (wins / total) * 100 : 0;
    const formattedWinPercentage = winPercentage.toFixed(2) + '%'
    return (<View style={styles.totalRow}>
      <Text style={styles.totalText}>Totals</Text>
      <View style={styles.totals}>
        <View style={styles.total}>
          <Text>Wins</Text>
          <Text>{wins}</Text>
        </View>
        <View style={styles.total}>
          <Text>Losses</Text>
          <Text>{losses}</Text>
        </View>
        <View style={styles.total}>
          <Text>Percent Won</Text>
          <Text>{formattedWinPercentage}</Text>
        </View>
      </View>
    </View>)
  }
}

const ScoreRow = ({ id, date, myScore, opponentScore, onDelete }: Score & { onDelete: (id: number) => void }) => (
  <View style={styles.scoreRow}>
    <Text>
      {date}
    </Text>
    <Text>
      {myScore} - {opponentScore}
    </Text>
    <Ionicons onPress={() => onDelete(id)} name="md-trash-outline" size={16} color="black" />
  </View>
)

const NoScores = () => <View style={styles.noScores}>
  <Text>No scores saved yet.</Text>
  <Text><Link style={styles.link} href={'/(tabs)'}>Add Scores</Link> to see your history here </Text>
</View >

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  historyContainer: {
    marginVertical: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalText: {
    marginEnd: 60
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderStyle: 'dashed',
  },
  totals: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  total: {
    alignItems: 'center',
    marginHorizontal: 12
  },
  scores: {
    minWidth: 200,
  },
  scoreRow: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1
  },
  link: {
    textDecorationLine: 'underline'
  },
  noScores: {
    alignItems: 'center'
  }
});
