import { Notification } from "@/types/notification";
import { StyleSheet, View } from "react-native";

type NotificationItemProps = {
    notificationData: Notification;
};

export default function NotificationItem({ notificationData }: NotificationItemProps) {
    return (
        <View style={styles.container}>
            
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
});