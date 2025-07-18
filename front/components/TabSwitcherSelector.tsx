import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type TabSwitcherSelectorProps = {
    text: string;
    isActive: boolean;
    onTabPress: () => void;
};

export default function TabSwitcherSelector({ text, isActive, onTabPress }: TabSwitcherSelectorProps) {
    return (
        <TouchableOpacity
            style={isActive && styles.activeTab || styles.inactiveTab}
            onPress={onTabPress}
        >
            <Text style={[styles.text, (isActive && styles.activeText) || styles.inactiveText]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    activeTab: {
        backgroundColor: Colors.primary_1,
        paddingVertical: 12,
        paddingHorizontal: 32,
        width: '50%',
        textAlign: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    inactiveTab: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        textAlign: 'center',
        alignItems: 'center',
        width: '50%',
    },
    text: {
        fontWeight: '500',
        fontSize: 16,
    },
    activeText: {
        color: '#fff',
        fontWeight: '500',
    },
    inactiveText: {
        color: '#444',
        fontWeight: '500',
    }
});