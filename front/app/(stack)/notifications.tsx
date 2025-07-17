import NotificationList from "@/components/notifications/NotificationList";
import { Colors } from "@/constants/Colors";
import { Notification } from "@/types/notification";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function NotificationsPage() {
    const notifications: Notification[] = [
        {
            id: 1,
            content: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum repellat officiis, deleniti exercitationem molestiae, nihil nostrum alias aspernatur ab dolores natus asperiores rerum tenetur? Iste explicabo id praesentium dolorem maiores!',
            isRead: false,
            owner: {
                id: 1,
                name: 'Pedro Santiago',
                email: 'pedro.santiago@example.com',
                course: {name: 'TSI'},
            },
            createdAt: new Date().toString()
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