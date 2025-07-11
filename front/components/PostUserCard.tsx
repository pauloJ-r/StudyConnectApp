import { User } from '@/types/user';
import { View, Image, StyleSheet, Text } from 'react-native';

type PostUserCardProps = {
    userData: User;
};

export default function PostUserCard({userData}: PostUserCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.imageCardContainer}>
                <Image
                    source={{ uri: userData.picturePath || 'https://i.pravatar.cc/150?img=3' }}
                    style={styles.userProfileImage}
                />
            </View>
            <View style={styles.userInfoContainer}>
                <Text style={styles.userInfoNameText}>
                    {userData.name}
                </Text>
                <Text style={styles.userInfoNameCourse}>
                    {userData.course}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    imageCardContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    userProfileImage: {
        width: 76,
        height: 76,
        borderRadius: 48,
    },
    userInfoContainer: {
        flexDirection: 'column',
        flex: 2,
        marginStart: 24,
        justifyContent: 'center',
        textAlign: 'left',
    },
    userInfoNameText: {
        fontSize: 18,
        fontWeight: '600',
    },
    userInfoNameCourse: {
        fontSize: 16,
        fontWeight: '100',
        color: 'rgba(0, 0, 0, 0.7)'
    }
});