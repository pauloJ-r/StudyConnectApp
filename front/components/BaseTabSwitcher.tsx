import React from "react";
import { StyleSheet, View } from "react-native";

type BaseTabSwitcherProps = {
    children: React.ReactNode;
};

export default function BaseTabSwitcher({ children }: BaseTabSwitcherProps) {
    return (
        <View style={styles.container}>
            <View style={styles.tabs}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 32,
    },
    tabs: {
        flexDirection: 'row',
        backgroundColor: '#F6F6F6',
        padding: 6,
        borderRadius: 12,
        width: '100%',
        justifyContent: 'space-between',
    },
});
