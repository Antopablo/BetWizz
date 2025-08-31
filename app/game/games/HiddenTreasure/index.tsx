import { useState, useRef } from "react";
import { View, Text, Pressable, ScrollView, Animated, Easing } from "react-native";
import { colors } from "../../../../theme";
import RewardLegend from "./legendHiddenTreasure";

type TreasureType = "empty" | "half" | "one" | "two" | "ten" | "jackpot";

const rewards: Record<TreasureType, number> = {
    empty: 0,
    half: 0.5,
    one: 1,
    two: 2,
    ten: 10,
    jackpot: 20,
};

const emojiMap: Record<TreasureType, string> = {
    empty: "❌",
    half: "🪙",
    one: "💲",
    two: "💰",
    ten: "🤑",
    jackpot: "💎",
};

// Fonction qui génère une grille pondérée
export function generateWeightedGrid(rows = 10, cols = 6) {
    const totalCells = rows * cols; // 60 cases
    const treasures: TreasureType[] = [
        // distribution approx pour RTP ~80–85%
        "ten", // 1 case à 10
        "two", "two", "two", "two", // 4 cases à 2
        "one", "one", "one", "one", "one", // 5 cases à 1
        "half", "half", "half", "half", "half", "half", "half", // 7 cases à 0.5
        // Jackpot aléatoire (50% de chance d'exister)
        ...(Math.random() < 0.5 ? (["jackpot"] as TreasureType[]) : []),
    ];

    // Compléter avec des cases vides
    while (treasures.length < totalCells) {
        treasures.push("empty");
    }

    // Mélanger (Fisher–Yates shuffle)
    for (let i = treasures.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [treasures[i], treasures[j]] = [treasures[j], treasures[i]];
    }

    // Transformer en grille 2D
    let k = 0;
    const grid = [];
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            row.push({ type: treasures[k], revealed: false });
            k++;
        }
        grid.push(row);
    }
    return grid;
}

export default function HiddenTreasure() {
    const [grid, setGrid] = useState(generateWeightedGrid());
    const [balance, setBalance] = useState(100); // joueur commence avec 100 jetons
    const [loading, setLoading] = useState(false); // 
    const progress = useRef(new Animated.Value(0)).current;

    const revealCell = (rowIndex: number, colIndex: number) => {
        if (balance >= 1) {
            setGrid((prev) => {
                const newGrid = prev.map((row, r) =>
                    row.map((cell, c) => {
                        if (r === rowIndex && c === colIndex && !cell.revealed) {
                            // Chaque clic coûte 1 jeton
                            setBalance((b) => b - 1);

                            // Gain éventuel
                            setBalance((b) => b + rewards[cell.type]);

                            return { ...cell, revealed: true };
                        }
                        return cell;
                    })
                );

                const allRevealed = newGrid.flat().every(cell => cell.revealed);
                if (allRevealed) {

                    startNewGridAnimation();
                }

                return newGrid;
            });
        } else {
            // afficher popup pour recharger
        }
    };

    const startNewGridAnimation = () => {
        setLoading(true);
        progress.setValue(0);

        Animated.timing(progress, {
            toValue: 1,
            duration: 2000, // 2s avant nouvelle grille
            useNativeDriver: false,
            easing: Easing.linear,
        }).start(() => {
            setGrid(generateWeightedGrid());
            setLoading(false);
        });
    };

    const progressWidth = progress.interpolate({
        inputRange: [0, 1],
        outputRange: ["0%", "100%"],
    });

    return (
        <ScrollView
            contentContainerStyle={{
                flexGrow: 1,
                alignItems: "center",
                padding: 16,
                backgroundColor: colors.bg,
            }}
        >
            <Text
                style={{
                    color: colors.text,
                    fontSize: 22,
                    fontWeight: "bold",
                    marginBottom: 16,
                }}
            >
                💰 Balance: {balance.toFixed(1)} jetons
            </Text>

            {grid.map((row, rowIndex) => (
                <View key={rowIndex} style={{ flexDirection: "row" }}>
                    {row.map((cell, colIndex) => (
                        <Pressable
                            key={colIndex}
                            onPress={() => revealCell(rowIndex, colIndex)}
                            style={{
                                width: 50,
                                height: 50,
                                margin: 4,
                                backgroundColor: cell.revealed ? "#FFD70022" : "#333",
                                justifyContent: "center",
                                alignItems: "center",
                                borderRadius: 8,
                            }}
                        >
                            {cell.revealed && (
                                <Text style={{ fontSize: 18 }}>{emojiMap[cell.type]}</Text>
                            )}
                        </Pressable>
                    ))}
                </View>
            ))}


            <Pressable
                onPress={startNewGridAnimation}
                style={{
                    marginTop: 20,
                    backgroundColor: colors.action,
                    padding: 24,
                    borderRadius: 12,
                    alignItems: "center",
                    overflow: "hidden",
                }}
                disabled={loading}
            >
                <Text style={{ color: "#313108ff", fontWeight: "700" }}>New grid</Text>
                {loading && (
                    <Animated.View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            height: 4,
                            backgroundColor: "#313108ff",
                            width: progressWidth,
                        }}
                    />
                )}
            </Pressable>

            <RewardLegend />

        </ScrollView>
    );
}