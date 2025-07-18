import { Colors } from "@/constants/Colors";
import { Post } from "@/types/post";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type AnswerPostButtonProps = {
    post: Post;
};

export default function AnswerPostButton({post}: AnswerPostButtonProps) {
    return (
        // TODO: Adicionar ação para curtir post.
        <View style={styles.container}>
            <TouchableOpacity style={styles.answerButton}>
                <Text style={{color: '#FFF', ...styles.answerButton}}>
                    Responder
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    answerButton: {
        paddingVertical: 4,
        paddingHorizontal: 16,
        borderRadius: 8,
        fontFamily: 'Poppins-SemiBold',
        backgroundColor: Colors.primary_1,
    }
});