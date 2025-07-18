import { FlatList } from "react-native";
import GroupItem from "./GroupItem";
import { IndexableStudyGroup } from "@/types/group";

type GroupListProps = {
    groups?: IndexableStudyGroup[];
};

export default function GroupList({ groups }: GroupListProps) {
    // Garantindo que sempre haja um array, mesmo se groups view vazio para aplicar a margem condicional.
    const safeGroups = groups ?? [];
    return (
        <FlatList
            contentContainerStyle={safeGroups.length > 0 && { marginBottom: 100 }}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={safeGroups}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <GroupItem groupData={item} />
            )}
        />
    );
}