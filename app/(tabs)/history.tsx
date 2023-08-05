import { StyleSheet } from 'react-native';
import { useState, useEffect } from 'react'

import { Text, View } from '@/components/Themed';
import { Score } from '@/types';
import { deleteScore, getScores } from '@/helpers/scores';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';


export default function HistoryScreen() {
  const [scores, setScores] = useState<Score[]>([])
  const [loading, setLoading] = useState(false)

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

  useEffect(() => {
    const getSavedScores = async () => {
      const scores = await getScores()
      setScores(scores ?? [])
    }
    setLoading(true)
    getSavedScores().then(() => setLoading(false))
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      {scores.length && !loading ? <View>
        <TotalRow wins={wins} losses={losses} total={scores.length} />

        <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

        <View style={styles.scores}>
          {scores.map(score =>
            <ScoreRow {...score} key={score.id} />
          )}
        </View>
      </View> : <NoScores />}
      {loading && <Text>Loading scores...</Text>}
    </View>
  );
}

const TotalRow = ({ wins, losses, total }: { wins: number, losses: number, total: number }) => {
  {
    const winPercentage = total > 0 ? (wins / total) * 100 : 0;
    const formattedWinPercentage = winPercentage.toFixed(2) + '%'
    return (<View style={styles.totalRow}>
      <Text style={styles.totalText}>Total</Text>
      <View style={styles.totals}>
        <View style={styles.total}>
          <Text>W</Text>
          <Text>{wins}</Text>
        </View>
        <View style={styles.total}>
          <Text>L</Text>
          <Text>{losses}</Text>
        </View>
        <Text>{formattedWinPercentage}</Text>
      </View>
    </View>)
  }
}

const ScoreRow = ({ id, date, myScore, opponentScore }: Score) => (
  <View style={styles.scoreRow}>
    <Text>
      {date}
    </Text>
    <Text>
      {myScore} - {opponentScore}
    </Text>
    <Ionicons onPress={() => deleteScore(id)} name="md-trash-outline" size={16} color="black" />
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30
  },
  separator: {
    marginTop: 30,
    height: 1,
    width: '100%',
  },
  totalText: {
    marginEnd: 60
  },
  totalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  totals: {
    flexDirection: 'row',
    alignItems: 'center'
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
