import { UserBadge } from "@/types/user";
import { StyleSheet, Text, View } from "react-native";

type BadgeItemProps = {
    badgeData: UserBadge;
};

export default function BadgeItem({badgeData}: BadgeItemProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.badgeInfoText}>
                {badgeData.name}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        marginTop: 15,
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 48,
        borderWidth: 1,
        borderColor: '#AEAEAE'
    },
    badgeInfoText: {
        fontSize: 12,
        fontWeight: '300'
    }
});