import { Notification } from "@/types/notification";
import { StyleSheet, Text, View } from "react-native";

type NotificationItemProps = {
    notificationData: Notification;
};

function convertNotificationAgeToSlugText(notificationData: Notification): string {
    const notificationCreatedAt: Date = new Date(notificationData.createdAt);
    const now: Date = new Date();

    const diffInMs = now.getTime() - notificationCreatedAt.getTime();
    const diffInSec = Math.floor(diffInMs / 1000);
    const diffInMin = Math.floor(diffInSec / 60);
    const diffInHr = Math.floor(diffInMin / 60);
    const diffInDays = Math.floor(diffInHr / 24);

    if(diffInSec < 60) return 'Agora mesmo';
    if(diffInMin < 60) return `Há ${diffInMin} minuto${diffInMin === 1 ? '' : 's'}`;
    if(diffInHr < 24) return `Há ${diffInHr} hora${diffInHr === 1 ? '' : 's'}`;
    if(diffInDays === 1) return 'Ontem';
    if(diffInDays <= 7) return `Há ${diffInDays} dia${diffInDays === 1 ? '' : 's'}`;

    return notificationCreatedAt.toLocaleDateString('pt-BR');
}

export default function NotificationItem({ notificationData }: NotificationItemProps) {
    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <Text style={styles.notificationAgeText}>{convertNotificationAgeToSlugText(notificationData)}</Text>
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