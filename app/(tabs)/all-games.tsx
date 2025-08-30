import { useState, useMemo } from "react";
import { View, TextInput, FlatList } from "react-native";
import { GAMES, CATEGORIES } from "../../data/games"
import { colors } from "../../theme";
import GameCard from "../../components/ui/GameCard";
import CategoryChips from "../../components/ui/CategoryChips";
import { useRouter } from "expo-router";

export default function AllGamesScreen() {
    const [query, setQuery] = useState("");
    const [category, setCategory] = useState("Tous");
    const router = useRouter();

    const filtered = useMemo(() => {
        return GAMES.filter((g) => {
            const matchName = g.name.toLowerCase().includes(query.toLowerCase());
            const matchCat = category === "Tous" ? true : g.category === category;
            return matchName && matchCat;
        });
    }, [query, category]);

    return (
        <View style={{ flex: 1, backgroundColor: colors.bg }}>
            <View style={{ padding: 16, gap: 12 }}>
                <TextInput
                    placeholder="Rechercher un jeu..."
                    placeholderTextColor={colors.subtext}
                    value={query}
                    onChangeText={setQuery}
                    style={{
                        backgroundColor: colors.card,
                        color: colors.text,
                        paddingHorizontal: 14,
                        paddingVertical: 12,
                        borderRadius: 12,
                    }}
                />

                <CategoryChips
                    categories={CATEGORIES as unknown as string[]}
                    selected={category}
                    onSelect={setCategory}
                />
            </View>

            <FlatList
                data={filtered}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{
                    padding: 16,
                    paddingTop: 0,
                    gap: 10
                }}
                renderItem={({ item }) => (
                    <GameCard game={item} onPress={() => router.push(`/game/${item.id}`)} />
                )}
            />
        </View>
    );
}
