import AppLogoIcon from '@/assets/icons/app-logo-icon.svg';
import NotificationIcon from '@/assets/icons/notification-icon.svg';
import { Image, StyleSheet, View } from 'react-native';

export default function AppHeaderBar() {
    return (
        <View style={styles.container}>

            <AppLogoIcon width={40} height={40}/>

            <View style={styles.actionsContainer}>

                <NotificationIcon width={30} height={30}/>

                <Image
                    source={{ uri: 'https://i.pravatar.cc/150?img=3' }}
                    style={styles.profileImage}
                />

            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '15%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 32
    },
    actionsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 40,
    },
    profileImage: {
        width: 40,
        height: 40,
        borderRadius: 48,
    }
});