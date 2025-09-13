// Aviator/BetInput.tsx
import React from "react";
import { View, TextInput, Text, TouchableOpacity, StyleSheet } from "react-native";

interface BetInputProps {
    bet: number;
    setBet: (value: number) => void;
    auto: boolean;
    setAuto: (value: boolean) => void;
}

export default function BetInput({ bet, setBet, auto, setAuto }: BetInputProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.label}>Votre mise</Text>
            <TextInput
                style={styles.input}
                keyboardType="numeric"
                value={bet.toString()}
                onChangeText={(text) => setBet(Number(text) || 0)}
            />
            <TouchableOpacity style={styles.button} onPress={() => setBet(bet * 2)}>
                <Text style={styles.buttonText}>x2</Text>
            </TouchableOpacity>
            <View style={styles.autoContainer}>
                <TouchableOpacity
                    style={[styles.checkbox, auto && styles.checked]}
                    onPress={() => setAuto(!auto)}
                >
                    {auto && <Text style={styles.checkmark}>✓</Text>}
                </TouchableOpacity>
                <Text style={styles.autoLabel}>Auto</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { alignItems: "center", marginVertical: 20 },
    label: { color: "#fff", marginBottom: 5 },
    input: {
        width: 120,
        padding: 10,
        borderRadius: 8,
        backgroundColor: "#222",
        color: "#fff",
        fontSize: 18,
        textAlign: "center",
    },
    button: {
        marginTop: 10,
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 8,
        backgroundColor: "#4caf50",
    },
    buttonText: { color: "#fff", fontWeight: "bold" },
    autoContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: "#fff",
        borderRadius: 6,
        marginRight: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    checked: { backgroundColor: "#4caf50", borderColor: "#4caf50" },
    checkmark: { color: "#fff", fontWeight: "bold" },
    autoLabel: { color: "#fff", fontSize: 16 },
});
