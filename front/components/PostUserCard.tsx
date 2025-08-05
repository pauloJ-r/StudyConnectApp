import { User } from '@/types/user';
import { View, Image, StyleSheet, Text } from 'react-native';

type PostUserCardProps = {
    userData: User;
};

export default function PostUserCard({userData}: PostUserCardProps) {
    return (
        <View style={styles.container}>
            <View style={styles.imageCardContainer}>
                {/* TODO: Substituir imagem de fallback para a foto de um user vazio. */}
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
        width: 48 ,
        height: 48,
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
        fontFamily: 'Poppins-SemiBold',
    },
    userInfoNameCourse: {
        fontSize: 16,
        fontFamily: 'Montserrat-Regular',
        fontWeight: '100',
        color: 'rgba(0, 0, 0, 0.7)'
    }
});