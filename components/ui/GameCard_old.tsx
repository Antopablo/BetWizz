import { View, Text, Pressable, Image } from "react-native";
import { colors } from "../../theme";
import { Game } from "../../types";

export default function GameCard({ game, onPress }: { game: Game; onPress: () => void }) {
    return (
        <Pressable onPress={onPress} style={{ backgroundColor: colors.card, padding: 12, borderRadius: 12 }}>
            <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
                <View style={{ width: 56, height: 56, borderRadius: 8, overflow: "hidden", backgroundColor: "#222" }}>
                    {game.thumbnail ? (
                        <Image source={game.thumbnail} style={{ width: "100%", height: "100%" }} resizeMode="cover" />
                    ) : (
                        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                            <Text style={{ color: colors.subtext }}>🎮</Text>
                        </View>
                    )}
                </View>
                <View style={{ flex: 1 }}>
                    <Text style={{ color: colors.text, fontSize: 16, fontWeight: "600" }}>{game.name}</Text>
                    <Text style={{ color: colors.subtext, marginTop: 2 }}>{game.category}</Text>
                </View>
            </View>
        </Pressable>
    );
}
