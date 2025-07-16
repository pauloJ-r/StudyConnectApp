import { Colors } from "@/constants/Colors";
import { Stack } from "expo-router";
import { SafeAreaView, StyleSheet, View } from "react-native";

export default function NotificationsPage() {
    return (
        <>
            <Stack.Screen
                options={{
                    title: 'Notificações'
                }}
            />

            <SafeAreaView style={{ flex: 1 }}>

                <View style={styles.container}>
                    
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