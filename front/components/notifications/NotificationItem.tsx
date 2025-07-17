import { Notification } from "@/types/notification";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { convertAgeTimeToSlugText } from "@/utils/time";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";

type NotificationItemProps = {
    notificationData: Notification;
    onDelete: () => void;
    onSwipeStart?: () => void;
    onSwipeEnd?: () => void;
};

export default function NotificationItem({
    notificationData,
    onDelete,
    onSwipeStart,
    onSwipeEnd
}: NotificationItemProps) {
    const renderRightActions = () => (
        <View style={styles.rightAction}>
            <TouchableOpacity onPress={onDelete}>
                <MaterialIcons name="delete" size={28} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <Swipeable
            renderRightActions={renderRightActions}
            onSwipeableOpen={onDelete}
            onSwipeableWillOpen={onSwipeStart}
            onSwipeableWillClose={onSwipeEnd}
        >
            <View style={styles.container}>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <Text style={styles.notificationAgeText}>{convertAgeTimeToSlugText(notificationData.createdAt)}</Text>
                </View>

                <View style={{ flexDirection: 'column', marginTop: 10 }}>
                    <Text style={styles.notificationContentText} numberOfLines={3} lineBreakMode="tail">
                        {notificationData.content}
                    </Text>
                </View>

            </View>
        </Swipeable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 18,
        marginVertical: 16,
        backgroundColor: '#FFF',
        borderRadius: 16,
        flexDirection: 'column',
    },
    notificationAgeText: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular'
    },
    notificationContentText: {
        fontSize: 16,
        fontFamily: 'Poppins-Regular'
    },
    rightAction: {
        backgroundColor: Colors.primary_1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        width: '100%',
        marginVertical: 16,
        borderRadius: 16,
        paddingEnd: 32,
    }
});