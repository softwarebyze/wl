import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '@/constants/Colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

import { createContext, useContext, useState } from 'react';
import { Score } from '@/types';

interface ScoreContextData {
  scores: Score[]
  saveScores: (scores: Score[]) => Promise<void>
  deleteScore: (id: number) => Promise<Score[] | undefined>
}

const ScoresContext = createContext<ScoreContextData>({ scores: [], saveScores: (scores: Score[]) => new Promise(resolve => []), deleteScore: () => new Promise(resolve => []) });
export const useScores = () => useContext(ScoresContext)

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [scores, setScores] = useState<Score[]>([])

  const getScores = async () => {
    try {
      const jsonScores = await AsyncStorage.getItem('scores');
      const scores: Score[] = JSON.parse(jsonScores ?? "[]")
      return scores
    } catch (e) {
      alert('Error getting scores :(')
    }
  };

  const saveScores = async (scores: Score[]) => {
    try {
      const jsonScores = JSON.stringify(scores);
      await AsyncStorage.setItem('scores', jsonScores);
      setScores(scores)
    } catch (e) {
      alert('Error saving scores :(')

    }
  }

  const deleteScore = async (id: number) => {
    try {
      const scores = await getScores() ?? [];
      const index = scores.findIndex((score) => score.id === id);

      if (index !== -1) {
        scores.splice(index, 1);
        await saveScores(scores);
        setScores(scores)
        return scores
      } else {
        alert('For some reason, I couldn\'t find the score to delete it :( I would suggest to refresh the page and try again')
      }
    } catch (e) {
      alert('Error deleting score :(');
    }
  }


  return (
    <ScoresContext.Provider value={{ scores, saveScores, deleteScore }}>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Add Score',
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
            headerRight: () => (
              <Link href="/modal" asChild>
                <Pressable>
                  {({ pressed }) => (
                    <FontAwesome
                      name="info-circle"
                      size={25}
                      color={Colors[colorScheme ?? 'light'].text}
                      style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                    />
                  )}
                </Pressable>
              </Link>
            ),
          }}
        />
        <Tabs.Screen
          name="history"
          options={{
            title: 'History',
            tabBarIcon: ({ color }) => <TabBarIcon name="clock-o" color={color} />,
          }}
        />
      </Tabs>
    </ScoresContext.Provider>
  );
}
