import { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Pressable, Switch } from "react-native";
import { colors } from "../../../../theme";

type BetInputProps = {
    value: number;
    onChange: (val: number) => void;
    autoDouble: boolean;
    setAutoDouble: (val: boolean) => void;
    maxBet?: number;
};

export default function BetInput({ value, onChange, autoDouble, setAutoDouble, maxBet = 100 }: BetInputProps) {
    const [inputValue, setInputValue] = useState(value.toString());

    useEffect(() => {
        setInputValue(value.toString());
    }, [value]);

    const handleChange = (text: string) => {
        const numeric = text.replace(/[^0-9]/g, "");
        const numberValue = Math.min(Number(numeric) || 0, maxBet);
        setInputValue(numberValue.toString());
        onChange(numberValue);
    };

    const handleDouble = () => {
        const doubled = Math.min(value * 2, maxBet);
        setInputValue(doubled.toString());
        onChange(doubled);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>🎲 Votre mise</Text>
            <TextInput
                style={styles.input}
                value={inputValue}
                keyboardType="numeric"
                onChangeText={handleChange}
                placeholder="0"
                placeholderTextColor="#888"
            />

            <View style={styles.actions}>
                <Pressable style={styles.doubleButton} onPress={handleDouble}>
                    <Text style={styles.doubleText}>x2</Text>
                </Pressable>

                <View style={styles.autoContainer}>
                    <Text style={styles.autoText}>Auto</Text>
                    <Switch
                        value={autoDouble}
                        onValueChange={setAutoDouble}
                        thumbColor={autoDouble ? colors.accent : "#fff"}
                        trackColor={{ false: "#888", true: "#FFD70044" }}
                    />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        marginVertical: 16,
        alignItems: "center",
    },
    label: {
        fontSize: 18,
        fontWeight: "700",
        color: colors.accent,
        marginBottom: 8,
        textShadowColor: "#00000044",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,
    },
    input: {
        width: "60%",
        paddingVertical: 14,
        paddingHorizontal: 20,
        borderRadius: 30,
        fontSize: 22,
        fontWeight: "700",
        textAlign: "center",
        color: "#fff",
        backgroundColor: colors.accent,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        marginBottom: 12,
    },
    actions: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "60%",
    },
    doubleButton: {
        backgroundColor: "#FFD700",
        paddingVertical: 10,
        paddingHorizontal: 28,
        borderRadius: 25,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
        marginRight: 16,
    },
    doubleText: {
        fontSize: 20,
        fontWeight: "700",
        color: "#03110a",
    },
    autoContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    autoText: {
        fontSize: 16,
        fontWeight: "600",
        color: colors.text,
        marginRight: 6,
    },
});
