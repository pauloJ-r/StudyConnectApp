import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import AddIcon from '@/assets/icons/add-icon.svg';
import { Colors } from "@/constants/Colors";

type JoinNewStudyGroupButtonProps = {
    onButtonPress?: () => void;
};

function JoinNewStudyGroupButton({onButtonPress}: JoinNewStudyGroupButtonProps) {
    return (
        <TouchableOpacity style={styles.joinNewStudyGroupButton} onPress={onButtonPress}>
            <Text style={styles.joinNewStudyGroupButtonLabel}>Entra no grupo</Text>
        </TouchableOpacity>
    );
}

export default function JoinNewStudyGroupBalloon() {
    return (
        <View style={styles.container}>

            <View style={styles.backgroundText}>
                <Text style={styles.backgroundTextAdd}><AddIcon width={32} height={32}/></Text>
                <Text style={styles.backgroundTextMessage}>Entre em novos grupos de estudo</Text>
            </View>

            <JoinNewStudyGroupButton/>

        </View>
    );
}

const styles = StyleSheet.create({
    // Button.
    joinNewStudyGroupButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: Colors.primary_1,
        borderRadius: 12,
        padding: 12,
    },
    joinNewStudyGroupButtonLabel: {
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    // Balloon.
    container: {
        flexDirection: 'column',
        borderStyle: 'dashed',
        borderWidth: 1,
        borderColor: '#454545',
        borderRadius: 16,
        padding: 32,
    },
    backgroundText: {
        flexDirection: 'column',
    },
    backgroundTextAdd: {
        textAlign: 'center',
    },
    backgroundTextMessage: {
        textAlign: 'center',
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
        color: '#454545'
    }
});