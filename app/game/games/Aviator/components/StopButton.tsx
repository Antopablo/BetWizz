// app/game/games/Aviator/components/StopButton.tsx
import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

export default function StopButton({ onPress, disabled }: { onPress: () => void; disabled?: boolean }) {
    return (
        <Pressable onPress={onPress} disabled={disabled} style={[styles.btn, disabled && { opacity: 0.5 }]}>
            <Text style={styles.text}>STOP</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    btn: {
        backgroundColor: "#FF1744",
        paddingVertical: 14,
        paddingHorizontal: 28,
        borderRadius: 14,
        marginRight: 12,
        elevation: 5,
    },
    text: {
        fontWeight: "900",
        fontSize: 18,
        color: "#fff",
    },
});
