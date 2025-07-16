import NotificationList from "@/components/notifications/NotificationList";
import { Colors } from "@/constants/Colors";
import { Notification } from "@/types/notification";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function NotificationsPage() {
    const notifications: Notification[] = [
        {
            id: 1,
            content: 'Lorem ipsum dolor amet sit...',
            isRead: false,
            owner: {
                id: 1,
                name: 'Pedro Santiago',
                email: 'pedro.santiago@example.com',
                course: {name: 'TSI'},
            },
            createdAt: Date.now().toString()
        }
    ];

    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Notificações'
                }}
            />

            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    <NotificationList notifications={notifications} />
                </View>

            </SafeAreaView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 16,
        flex: 1,
        backgroundColor: Colors.light.background,
    }
});