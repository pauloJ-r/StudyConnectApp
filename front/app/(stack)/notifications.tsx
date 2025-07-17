import NotificationList from "@/components/notifications/NotificationList";
import { Colors } from "@/constants/Colors";
import { Notification } from "@/types/notification";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { useState } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<Notification[]>([]);

    const handleDelete = (id: number) => {
        setNotifications(prev => prev.filter(item => item.id !== id));
    };

    return (
        <>
            <Stack.Screen options={{ title: 'Notificações' }} />
            <SafeAreaView style={{ flex: 1 }}>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <View style={styles.container}>
                        <NotificationList
                            notifications={notifications}
                            onDelete={handleDelete}
                        />
                    </View>
                </GestureHandlerRootView>
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