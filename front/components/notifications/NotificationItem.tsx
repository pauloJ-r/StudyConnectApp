import { Notification } from "@/types/notification";
import { StyleSheet, Text, View } from "react-native";
import { convertAgeTimeToSlugText } from "@/utils/time";

type NotificationItemProps = {
    notificationData: Notification;
};

export default function NotificationItem({ notificationData }: NotificationItemProps) {
    return (
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
    }
});