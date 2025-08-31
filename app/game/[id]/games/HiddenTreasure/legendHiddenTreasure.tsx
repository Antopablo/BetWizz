import { View, Text, ScrollView, StyleSheet } from "react-native";
import { colors } from "../../../../../theme";

const rewardTable = [
    { emoji: "❌", reward: 0 },
    { emoji: "🪙", reward: 0.5 },
    { emoji: "💲", reward: 1 },
    { emoji: "💰", reward: 2 },
    { emoji: "🤑", reward: 10 },
    { emoji: "💎", reward: 20 },
];

export default function RewardLegend() {
    const columns = [rewardTable.slice(0, 3), rewardTable.slice(3, 6)];

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.grid}>
                {columns.map((col, colIndex) => (
                    <View key={colIndex} style={styles.column}>
                        {col.map((item, index) => (
                            <View key={index} style={styles.row}>
                                <Text style={styles.emoji}>{item.emoji}</Text>
                                <Text style={styles.reward}>{item.reward} jeton{item.reward > 1 ? "s" : ""}</Text>
                            </View>
                        ))}
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        alignItems: "center",
        width: "100%",
    },
    grid: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "80%",
    },
    column: {
        flex: 1,
        marginHorizontal: 8,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: colors.card,
        paddingLeft: 12,
        paddingRight: 12,
        borderRadius: 10,
    },
    emoji: {
        fontSize: 16,
    },
    reward: {
        fontSize: 16,
        fontWeight: "700",
        color: colors.accent,
    },
});
