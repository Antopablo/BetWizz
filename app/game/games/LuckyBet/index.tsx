import { useState } from "react";
import { View, Text, Pressable, ScrollView, Vibration } from "react-native";
import { colors } from "../../../../theme";
import BetInput from "./components/betInput"

type TreasureType = "empty" | "jackpot";

const rewards: Record<TreasureType, number> = {
    empty: 0,
    jackpot: 2
};

const emojiMap: Record<TreasureType, string> = {
    empty: "❌",
    jackpot: "🍀",
};

export function generateWeightedGrid(rows = 2, cols = 2) {
    const totalCells = rows * cols; // 4 cases
    const treasures: TreasureType[] = [
        "jackpot", // 1 jackpot
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

export default function Luckybet() {
    const [grid, setGrid] = useState(generateWeightedGrid());
    const [balance, setBalance] = useState(100); // joueur commence avec 100 jetons
    const [loading, setLoading] = useState(false);
    const [bet, setBet] = useState(1);
    const [autoDouble, setAutoDouble] = useState(false);

    const revealCell = (rowIndex: number, colIndex: number) => {
        if (balance >= 1) {
            if (loading) return;

            setLoading(true);
            setGrid((prev) => {
                const newGrid = prev.map((row, r) =>
                    row.map((cell, c) => {
                        if (r === rowIndex && c === colIndex && !cell.revealed) {
                            const reward = rewards[cell.type];

                            // Chaque clic coûte 1 jeton
                            setBalance((b) => b - bet);

                            // Gain éventuel
                            setBalance((b) => b + bet * rewards[cell.type]);

                            if (reward > 0) {
                                Vibration.vibrate(100);
                            }

                            if (reward === 0 && autoDouble) {
                                const newBalance = balance - bet;
                                const newBet = Math.min(bet * 2, newBalance);
                                setBet(newBet);
                            }

                            return { ...cell, revealed: true };
                        }
                        return cell;
                    })
                );

                setTimeout(() => {
                    setGrid((prev) =>
                        prev.map((row) =>
                            row.map((cell) => ({ ...cell, revealed: true }))
                        )
                    );

                    setTimeout(() => {
                        setGrid(generateWeightedGrid());
                        setLoading(false);
                    }, 400);
                }, 400);

                return newGrid
            });
        } else {
            // afficher popup pour recharger
        }
    };


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
                                padding: 20,
                                width: 150,
                                height: 150,
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


            <BetInput value={bet} onChange={setBet} maxBet={balance} autoDouble={autoDouble} setAutoDouble={setAutoDouble} />

        </ScrollView>
    );
}