// app/game/games/Aviator/components/MultiplierDisplay.tsx
import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors } from "../../../../../theme";

export default function MultiplierDisplay({ multiplier, crashed = false }: { multiplier: number; crashed?: boolean; }) {
    const color = crashed ? "#FF4D4F" : multiplier >= 2 ? "#FFD700" : "#fff";
    return (
        <View style={styles.container}>
            <Text style={[styles.multText, { color }]}>{`x${multiplier.toFixed(2)}`}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { padding: 8 },
    multText: { fontSize: 44, fontWeight: "900", textAlign: "center", textShadowColor: "#00000033", textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 6 },
});
