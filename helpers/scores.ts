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


export const deleteScore = async (id: number) => {
    try {
        const scores = await getScores() ?? [];
        const index = scores.findIndex((score) => score.id === id);

        if (index !== -1) {
            scores.splice(index, 1);
            await saveScores(scores);
        } else {
            alert('For some reason, I couldn\'t find the score to delete it :( I would suggest to refresh the page and try again')
        }
    } catch (e) {
        alert('Error deleting score :(');
    }
}