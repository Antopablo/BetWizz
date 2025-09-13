// app/game/games/Aviator/components/Plane.tsx
import React from "react";
import { Animated, View, StyleSheet, Dimensions, Image } from "react-native";
import { colors } from "../../../../../theme";

const { width: SCREEN_W } = Dimensions.get("window");

export default function Plane({ progress }: { progress: Animated.Value }) {
    const translateX = progress.interpolate({
        inputRange: [0, 1],
        outputRange: [12, SCREEN_W - 60], // 12 padding left, stop before right edge
    });

    return (
        <View style={styles.container}>
            <Animated.Image
                // source={require("../../../../../assets/plane.png")} // place a plane.png in assets or swap for an emoji below
                source={require("../../../../../assets/images/games/plane.png")} // place a plane.png in assets or swap for an emoji below
                style={[styles.plane, { transform: [{ translateX }] }]}
                resizeMode="contain"
            />
            {/* If you don't have an image, use an emoji instead:
      <Animated.View style={[styles.plane, { transform: [{ translateX }] }]}>
        <Text style={{ fontSize: 28 }}>✈️</Text>
      </Animated.View>
      */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { width: "100%", height: 80, overflow: "hidden", justifyContent: "center" },
    plane: { width: 44, height: 44, position: "absolute", left: 0 },
});
