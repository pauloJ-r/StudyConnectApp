import { Colors } from "@/constants/Colors";
import { Notification } from "@/types/notification";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type ClearNotificationsButtonProps = {
    notifications: Notification[];
    setNotificationsCb: Function;
};

export default function ClearNotificationsButton({ notifications, setNotificationsCb }: ClearNotificationsButtonProps) {
    let isDisabled: boolean = notifications.length === 0;
    return (
        <TouchableOpacity style={[styles.container, isDisabled ? styles.disabledBackground : styles.enabledBackground]}
        onPress={() => setNotificationsCb([])} disabled={isDisabled}>
            <Text style={styles.label}>Limpar</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginBottom: 100,
        padding: 12,
        borderRadius: 16,
    },
    label: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
        color: '#FFF',
    },
    enabledBackground: {
        backgroundColor: Colors.primary_1,
    },
    disabledBackground: {
        backgroundColor: Colors.gray_1,
    }
});