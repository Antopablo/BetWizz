import React, { useRef, useState, useEffect } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import { colors } from "../../../../theme";
import BetInput from "./components/BetInput";
import PlanePath from "./components/PlanePath";

const { height: SCREEN_H } = Dimensions.get("window");
const P_POWER = 1.3;

function generateCrashPoint() {
    const r = Math.random();

    // 25 tranches entre 1.00 et 2.00
    for (let i = 0; i < 25; i++) {
        const lower = 1 + (i * 0.04); // 1.00, 1.04, 1.08 ...
        const upper = lower + 0.04;
        if (r < 0.50 + i * 0.02) {   // tu peux ajuster les % cumulés
            return +(lower + Math.random() * (upper - lower)).toFixed(2);
        }
    }

    // Plages plus hautes pour le reste
    if (r < 0.70) return +(2 + Math.random() * 0.5).toFixed(2); // 2–2.5x
    if (r < 0.82) return +(2.5 + Math.random() * 0.5).toFixed(2); // 2.5–3x
    if (r < 0.90) return +(3 + Math.random() * 1).toFixed(2); // 3–4x
    if (r < 0.95) return +(4 + Math.random() * 1).toFixed(2); // 4–5x
    if (r < 0.97) return +(5 + Math.random() * 2).toFixed(2); // 5–7x
    if (r < 0.99) return +(7 + Math.random() * 3).toFixed(2); // 7–10x
    return +(10 + Math.random() * 5).toFixed(2); // 10–15x
}

export default function Aviator() {
    const [balance, setBalance] = useState(100);
    const [bet, setBet] = useState(1);
    const [auto, setAuto] = useState(false);

    const [multiplier, setMultiplier] = useState(0); // commence à 0
    const [running, setRunning] = useState(false);
    const [crashed, setCrashed] = useState(false);
    const [crashPoint, setCrashPoint] = useState<number | null>(null);

    const rafRef = useRef<number | null>(null);
    const startRef = useRef<number | null>(null);
    const durationRef = useRef<number>(0);

    useEffect(() => {
        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    function startRound() {
        if (running) return;
        if (bet <= 0 || bet > balance) return;

        setBalance((b) => b - bet);
        setMultiplier(0);
        setCrashed(false);

        const cp = generateCrashPoint();
        setCrashPoint(cp);

        const duration = 1.2 + cp * 0.45;
        durationRef.current = duration;

        setRunning(true);
        startRef.current = performance.now();

        const tick = (now: number) => {
            if (!startRef.current) startRef.current = now;
            const elapsed = (now - startRef.current) / 1000;
            const t = Math.min(1, elapsed / durationRef.current);
            const m = cp * Math.pow(t, P_POWER);
            setMultiplier(m);

            if (t >= 1) {
                handleCrash();
                return;
            }
            rafRef.current = requestAnimationFrame(tick);
        };

        rafRef.current = requestAnimationFrame(tick);
    }

    function handleStop() {
        if (!running || crashed) return;
        const gain = +(bet * multiplier).toFixed(2);
        setBalance((b) => b + gain);
        setRunning(false);
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        setCrashed(false);
        setCrashPoint(null);
        setMultiplier(0);
    }

    function handleCrash() {
        setCrashed(true);
        setRunning(false);
        if (rafRef.current) {
            cancelAnimationFrame(rafRef.current);
            rafRef.current = null;
        }
        setTimeout(() => {
            setCrashPoint(null);
            setMultiplier(0);
            setCrashed(false);
        }, 1500); // laisse le temps de voir l’effet crash
    }

    const canStart = !running && !crashed && bet > 0 && bet <= balance;

    return (
        <View style={styles.container}>
            {/* Header avec solde */}
            <Text style={styles.title}>✈️ Aviator</Text>
            <Text style={styles.balance}>Solde: {balance.toFixed(2)} jetons</Text>

            {/* Zone principale = courbe + avion */}
            <View style={styles.gameArea}>
                <Text style={[styles.multText, crashed && { color: "red" }]}>
                    {crashed ? `💥 CRASH x${(crashPoint ?? 0).toFixed(2)}` : `x${multiplier.toFixed(2)}`}
                </Text>

                <PlanePath
                    multiplier={multiplier}
                    crashed={crashed}
                    crashPoint={crashPoint}
                    planeImage={require("../../../../assets/images/games/plane.png")}
                />
            </View>

            {/* Zone input & boutons en bas */}
            <View style={styles.bottom}>
                <BetInput bet={bet} setBet={setBet} auto={auto} setAuto={setAuto} />

                <View style={styles.row}>
                    {!running ? (
                        <Pressable
                            onPress={startRound}
                            disabled={!canStart}
                            style={[styles.startBtn, !canStart && styles.disabled]}
                        >
                            <Text style={styles.startText}>Start</Text>
                        </Pressable>
                    ) : (
                        <Pressable onPress={handleStop} style={styles.stopBtn}>
                            <Text style={styles.stopText}>STOP</Text>
                        </Pressable>
                    )}

                    <Pressable onPress={() => setBalance(100)} style={styles.smallBtn}>
                        <Text style={styles.smallText}>Reset solde</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.bg },
    title: { fontSize: 26, fontWeight: "800", color: colors.text, textAlign: "center", marginTop: 12 },
    balance: { color: colors.subtext, textAlign: "center", marginBottom: 6 },
    gameArea: { flex: 1, justifyContent: "center", alignItems: "center" },
    multText: { fontSize: 38, fontWeight: "900", color: "#0f0", marginBottom: 8 },
    bottom: { padding: 16, borderTopWidth: 1, borderColor: "#333" },
    row: { flexDirection: "row", justifyContent: "center", marginTop: 12, alignItems: "center" },
    startBtn: {
        backgroundColor: "#00C853",
        paddingVertical: 14,
        paddingHorizontal: 30,
        borderRadius: 14,
        marginRight: 12,
    },
    startText: { color: "#03110a", fontWeight: "800", fontSize: 18 },
    stopBtn: {
        backgroundColor: "#FF1744",
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 14,
        marginRight: 12,
    },
    stopText: { color: "#fff", fontWeight: "900", fontSize: 18 },
    disabled: { opacity: 0.4 },
    smallBtn: { backgroundColor: colors.card, padding: 10, borderRadius: 8 },
    smallText: { color: colors.text },
});
