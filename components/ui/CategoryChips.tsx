import { ScrollView, Pressable, Text } from "react-native";
import { colors } from "../../theme";

interface Props {
    categories: string[];
    selected: string;
    onSelect: (category: string) => void;
}

export default function CategoryChips({ categories, selected, onSelect }: Props) {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
                paddingVertical: 12,
                gap: 8,
            }}
        >
            {categories.map((category) => (
                <Pressable
                    key={category}
                    onPress={() => onSelect(category)}
                    style={{
                        backgroundColor: selected === category ? colors.primary : colors.card,
                        paddingHorizontal: 12,
                        paddingVertical: 6,
                        borderRadius: 16,
                    }}
                >
                    <Text
                        style={{
                            color: selected === category ? colors.white : colors.text,
                        }}
                    >
                        {category}
                    </Text>
                </Pressable>
            ))}
        </ScrollView>
    );
}
