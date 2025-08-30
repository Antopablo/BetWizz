import { SectionList, Text, View } from "react-native";
import { GAMES } from "../../data/games";
import GameCard from "../../components/ui/GameCard";
import { colors } from "../../theme";
import { useRouter } from "expo-router";

export default function HighlightsScreen() {
  const router = useRouter();

  const sections = [
    { title: "Jeux du moment", data: GAMES.filter((g) => g.isTrending) },
    { title: "Nouveautés", data: GAMES.filter((g) => g.isNew) },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, padding: 16 }}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <GameCard game={item} onPress={() => router.push(`/game/${item.id}`)} />
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ color: colors.text, fontSize: 20, fontWeight: "700", marginVertical: 8 }}>
            {title}
          </Text>
        )}
      />
    </View>
  );
}
