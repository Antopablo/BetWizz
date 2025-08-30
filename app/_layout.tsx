import { Stack, useGlobalSearchParams } from "expo-router";
import { View } from "react-native";
import { colors } from "../theme";
import { GAMES } from "../data/games";

export default function RootLayout() {
  const params = useGlobalSearchParams();

  return (
    <View style={{ flex: 1, paddingTop: 30, backgroundColor: colors.bg }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="game/[id]"
          options={{
            headerShown: true,
            title: GAMES.find((g) => g.id === params.id)?.name || "",
            headerStyle: {
              backgroundColor: colors.bg,
            },
            headerTitleStyle: {
              color: colors.text,
              fontSize: 18,
              fontWeight: "600",
            },
            headerTintColor: colors.text,
            headerShadowVisible: false,
            headerTitleAlign: "center",
          }}
        />
      </Stack>
    </View>
  );
}