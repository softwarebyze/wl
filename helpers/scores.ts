import AsyncStorage from '@react-native-async-storage/async-storage';
import { Score } from "@/types";

export const getScores = async () => {
    try {
        const jsonScores = await AsyncStorage.getItem('scores');
        const scores: Score[] = JSON.parse(jsonScores ?? "[]")
        return scores
    } catch (e) {
        alert('Error getting scores :(')
    }
};

export const saveScores = async (scores: Score[]) => {
    try {
        const jsonScores = JSON.stringify(scores);
        await AsyncStorage.setItem('scores', jsonScores);
    } catch (e) {
        alert('Error saving scores :(')

    }
}