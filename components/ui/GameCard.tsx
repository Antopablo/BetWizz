import { Text, Pressable, ImageBackground, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from "../../theme";
import { Game } from "../../types";

export default function GameCard({ game, onPress }: { game: Game; onPress: () => void }) {
    return (
        <Pressable onPress={onPress} style={{ height: 150, borderRadius: 12, overflow: 'hidden' }}>
            <ImageBackground
                source={game.thumbnail}
                resizeMode="cover"
                style={{
                    flex: 1,
                    justifyContent: 'flex-end',
                }}
            >
                <LinearGradient
                    colors={['transparent', 'rgba(0,0,0,0.8)']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        bottom: 0,
                        height: '50%',
                    }}
                />
                <Text
                    style={{
                        color: colors.white,
                        fontSize: 24,
                        fontWeight: "700",
                        padding: 16,
                        textShadowColor: 'rgba(0, 0, 0, 0.75)',
                        textShadowOffset: { width: 0, height: 1 },
                        textShadowRadius: 5,
                    }}
                >
                    {game.name}
                </Text>
            </ImageBackground>
        </Pressable>
    );
}
