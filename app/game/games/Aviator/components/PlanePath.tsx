// app/game/games/Aviator/PlanePath.tsx
import React from "react";
import { View, Image, StyleSheet, Dimensions } from "react-native";
import Svg, { Path, Circle, G, Text as SvgText } from "react-native-svg";
import { colors } from "../../../../../theme"; // adapte si needed

const { width: SCREEN_W } = Dimensions.get("window");

// paramètres visuels
const SVG_W = Math.min(360, SCREEN_W - 32);
const SVG_H = 220;
const P_SEGMENTS = 120; // nombre de points pour tracer la courbe
const P_POWER = 1.3; // p param (doit correspondre à la logique de croissance)
const PLANE_SIZE = 36;

type Props = {
    multiplier: number;    // multiplicateur courant (commence à 0)
    crashed: boolean;
    crashPoint: number | null; // crashPoint (scale), utilisé pour normaliser la courbe
    planeImage?: any; // require(...) optional
};

export default function PlanePath({ multiplier, crashed, crashPoint, planeImage }: Props) {
    // sécurité : si pas de crashPoint on affiche une courbe standard (scale=10)
    const scale = Math.max(crashPoint ?? 10, 10);

    // génère la chaîne 'd' pour <Path> : M x,y L x,y L...
    const buildPathD = () => {
        let d = "";
        for (let i = 0; i <= P_SEGMENTS; i++) {
            const t = i / P_SEGMENTS; // 0..1
            const x = t * SVG_W;
            // yNormalized = t^p in [0,1], on inverse verticalement (0 en haut)
            const yNorm = Math.pow(t, P_POWER);
            const y = SVG_H - yNorm * SVG_H;
            d += `${i === 0 ? "M" : "L"} ${x.toFixed(2)} ${y.toFixed(2)} `;
        }
        return d;
    };

    const pathD = buildPathD();

    // Calculer la position de l'avion en pixels à partir du multiplicateur
    const getPlanePosition = () => {
        // Si multiplier est nul -> on place à tout début
        if (multiplier <= 0) return { x: 0, y: SVG_H };

        // t = (multiplier / scale)^(1/p)
        const tRaw = Math.pow(Math.min(multiplier / scale, 1), 1 / P_POWER);
        const t = Math.max(0, Math.min(1, tRaw));
        const x = t * SVG_W;
        const y = SVG_H - Math.pow(t, P_POWER) * SVG_H;
        return { x, y };
    };

    const { x: planeX, y: planeY } = getPlanePosition();

    return (
        <View style={styles.wrap}>
            <Svg width={SVG_W} height={SVG_H}>
                {/* fond grille légère */}
                <Path d={`M 0 ${SVG_H} L ${SVG_W} ${SVG_H}`} stroke="#333" strokeWidth={1} />
                {/* courbe */}
                <Path d={pathD} stroke="#4caf50" strokeWidth={3} fill="none" strokeLinecap="round" />
                {/* marqueur crash point (optionnel) */}
                {/* {crashPoint && crashPoint > 0 && (
                    (() => {
                        // position du crash point sur la courbe (tCrash = (crashPoint/scale)^(1/p) but crashPoint===scale so t=1)
                        const tCrash = Math.min(1, Math.pow(Math.min(crashPoint / scale, 1), 1 / P_POWER));
                        const crashX = tCrash * SVG_W;
                        const crashY = SVG_H - Math.pow(tCrash, P_POWER) * SVG_H;
                        return <Circle cx={crashX} cy={crashY} r={3} fill="#FF4D4F" />;
                    })()
                )} */}
                {/* small label near end (optional) */}
            </Svg>

            {/* avion/point positionné en absolu au-dessus du SVG */}
            <View style={{ width: SVG_W, height: SVG_H, position: "absolute", left: 0, top: 0 }}>
                {!crashed ? (
                    planeImage ? (
                        <Image
                            source={planeImage}
                            style={{
                                width: PLANE_SIZE,
                                height: PLANE_SIZE,
                                position: "absolute",
                                left: Math.max(0, planeX - PLANE_SIZE / 2),
                                top: Math.max(0, planeY - PLANE_SIZE / 2),
                                transform: [{ rotate: `${Math.min(35, planeX / SVG_W * 40)}deg` }], // légère rotation
                            }}
                        />
                    ) : (
                        <View
                            style={{
                                position: "absolute",
                                left: Math.max(0, planeX - PLANE_SIZE / 2),
                                top: Math.max(0, planeY - PLANE_SIZE / 2),
                            }}
                        >
                            <View style={styles.emojiWrap}>
                                <Text style={{ fontSize: 26 }}>✈️</Text>
                            </View>
                        </View>
                    )
                ) : (
                    // explosion emoji
                    <View
                        style={{
                            position: "absolute",
                            left: Math.max(0, planeX - PLANE_SIZE),
                            top: Math.max(0, planeY - PLANE_SIZE),
                            width: PLANE_SIZE * 2,
                            height: PLANE_SIZE * 2,
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Text style={{ fontSize: 34 }}>💥</Text>
                    </View>
                )}
            </View>
        </View>
    );
}

import { Text } from "react-native";

const styles = StyleSheet.create({
    wrap: {
        width: SVG_W,
        height: SVG_H,
        alignItems: "center",
        justifyContent: "center",
        marginVertical: 8,
    },
    emojiWrap: {
        width: PLANE_SIZE,
        height: PLANE_SIZE,
        alignItems: "center",
        justifyContent: "center",
    },
});
