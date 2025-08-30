import { useState } from "react";
import { View, Text, Pressable, ScrollView } from "react-native";
import { colors } from "../../../theme";

type TreasureType = "empty" | "bronze" | "silver" | "gold" | "bar" | "diamond";

const rewards = {
    empty: 0,
    bronze: 1,
    silver: 5,
    gold: 10,
    bar: 25,
    diamond: 50,
};

const emojiMap: Record<TreasureType, string> = {
    empty: "❌",
    bronze: "🥉",
    silver: "🥈",
    gold: "🥇",
    bar: "🪙",
    diamond: "💎",
};

function generateWeightedGrid(rows = 10, cols = 6) {
    const totalCells = rows * cols; // 60
    const treasures: TreasureType[] = [
        "diamond", // 1
        "bar", "bar", // 2
        "gold", "gold", "gold", // 3
        "silver", "silver", "silver", "silver", "silver", // 5
        "bronze", "bronze", "bronze", "bronze", "bronze", "bronze", "bronze", // 7
    ];

    // compléter avec "empty"
    while (treasures.length < totalCells) {
        treasures.push("empty");
    }

    // mélanger le tableau
    for (let i = treasures.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [treasures[i], treasures[j]] = [treasures[j], treasures[i]];
    }

    // transformer en grille 2D
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
    const [score, setScore] = useState(0);

    const revealCell = (rowIndex: number, colIndex: number) => {
        setGrid((prev) => {
            const newGrid = prev.map((row, r) =>
                row.map((cell, c) => {
                    if (r === rowIndex && c === colIndex && !cell.revealed) {
                        setScore((s) => s + rewards[cell.type]);
                        return { ...cell, revealed: true };
                    }
                    return cell;
                })
            );
            return newGrid;
        });
    };

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1, alignItems: "center", padding: 16, backgroundColor: colors.bg }}>
            <Text style={{ color: colors.text, fontSize: 22, fontWeight: "bold", marginBottom: 16 }}>
                💰 Score: {score}
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
                            {cell.revealed && <Text style={{ fontSize: 18 }}>{emojiMap[cell.type]}</Text>}
                        </Pressable>
                    ))}
                </View>
            ))}
        </ScrollView>
    );
}
