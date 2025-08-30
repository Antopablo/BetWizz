export type Category = "Cartes" | "Tirage" | "Hasard" | "Réflexe";

export interface Game {
    id: string;
    name: string;
    category: Category;
    isNew?: boolean;
    isTrending?: boolean;
    thumbnail?: any; // require(...) ou URL
    description?: string;
}
