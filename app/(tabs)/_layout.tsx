import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { colors } from "../../theme";

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={({ route }) => ({
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: colors.tabbg,
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: colors.primary,
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: any;
                    if (route.name === "index") iconName = focused ? "cards-playing-spade-multiple" : "cards-playing-spade-multiple-outline";
                    if (route.name === "all-games") iconName = "apps";
                    if (route.name === "account") iconName = focused ? "account-cash" : "account-cash-outline";
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tabs.Screen name="index" options={{ title: "Jeux du moment" }} />
            <Tabs.Screen name="all-games" options={{ title: "Tous les jeux" }} />
            <Tabs.Screen name="account" options={{ title: "Account" }} />
        </Tabs>
    );
}
