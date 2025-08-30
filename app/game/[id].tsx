import { View, Text, Pressable } from "react-native";
import { colors } from "../../theme";
import { GAMES } from "../../data/games";
import { useLocalSearchParams, useRouter } from "expo-router";

export default function GamePlayScreen() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const game = GAMES.find((g) => g.id === id);
    const router = useRouter();

    const handlePlay = () => {
        switch (game?.id) {
            case "hiddentreasure":
                router.push(`/game/${game.id}/playHiddenTreasure`);
                break;
            default:
                console.warn("Pas de page définie pour ce jeu");
        }
    };

    if (!game) {
        return (
            <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: colors.bg }}>
                <Text style={{ color: colors.text }}>Jeu introuvable.</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16, gap: 16 }}>
            <Text style={{ color: colors.subtext, flex: 1 }}>{game.description ?? ""}</Text>
            {/* <GameProbabilityDescription /> */}
            <Pressable
                onPress={handlePlay}
                style={{ backgroundColor: colors.accent, padding: 24, borderRadius: 12, alignItems: "center", marginBottom: 30 }}
            >
                <Text style={{ color: "#03110a", fontWeight: "700" }}>Jouer</Text>
            </Pressable>
        </View>
    );
}
