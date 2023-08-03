import { StyleSheet } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function HistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>History</Text>
      <View style={styles.totalRow}>
        <Text style={styles.totalText}>Total</Text>
        <View style={styles.totals}>
          <View style={{ marginHorizontal: 12 }}>
            <Text>W</Text>
            <Text>18</Text>
          </View>
          <View style={{ marginHorizontal: 12 }}>
            <Text>L</Text>
            <Text>2</Text>
          </View>
          <Text>90%</Text>
        </View>
      </View>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />

      <View style={styles.scoreRow}>
        <Text style={styles.scoreRowDate}>
          8/7/22
        </Text>
        <Text>
          7 - 11
        </Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreRowDate}>
          5/16/22
        </Text>
        <Text>
          1 - 11
        </Text>
      </View>
      <View style={styles.scoreRow}>
        <Text style={styles.scoreRowDate}>
          3/6/22
        </Text>
        <Text>
          11 - 3
        </Text>
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
    marginBottom: 30
  },
  separator: {
    marginTop: 30,
    height: 1,
    width: '80%',
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
  scoreRow: {
    flexDirection: 'row',
    padding: 16,
    borderWidth: 1
  },
  scoreRowDate: {
    marginEnd: 60,

  }
});
