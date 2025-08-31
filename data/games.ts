import { Game } from "../types";

export const GAMES: Game[] = [
    { id: "hiddentreasure", name: "Hidden Treasure", category: "Hasard", isTrending: true, description: "Choose boxes to found the treasure !", thumbnail: require("../assets/images/games/hiddentreasure.jpg") },
    { id: "luckybet", name: "Luck Bet", category: "Hasard", isTrending: true, description: "4 boxes : 1 treasure", thumbnail: require("../assets/images/games/luckybet.jpg") },
    // { id: "slot", name: "Machine à sous", category: "Hasard", description: "Alignez 3 symboles.", thumbnail: require("../assets/images/games/cashmachine.jpg") },
    // { id: "roulette", name: "Roulette", category: "Hasard", isNew: true, description: "Choisissez un numéro, rouge/noir.", thumbnail: require("../assets/images/games/roulette.jpg") },
    // { id: "blackjack", name: "Blackjack", category: "Cartes", description: "Atteins 21 sans dépasser.", thumbnail: require("../assets/images/games/blackjack.jpg") },
    // { id: "poker", name: "Poker", category: "Cartes", description: "Classement des mains.", thumbnail: require("../assets/images/games/poker.jpg") },
    { id: "aviator", name: "Aviator", category: "Hasard", isTrending: true, description: "Atteint le plus gros multiplicateur.", thumbnail: require("../assets/images/games/aviator.jpg") },
];

export const CATEGORIES = ["Tous", "Cartes", "Hasard"] as const;
